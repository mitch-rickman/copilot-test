import { useState, useEffect } from 'react';
import { Plus, Check, Filter } from 'lucide-react';
import TodoItem from './components/TodoItem';
import TodoInput from './components/TodoInput';
import FilterButtons from './components/FilterButtons';
import Stats from './components/Stats';
import { triggerConfetti } from './utils/confetti';

const FILTERS = {
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed'
};

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState(FILTERS.ALL);

  // Load todos from localStorage on mount
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text) => {
    if (text.trim()) {
      const newTodo = {
        id: Date.now(),
        text: text.trim(),
        completed: false,
        createdAt: new Date().toISOString()
      };
      setTodos([newTodo, ...todos]);
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        const updatedTodo = { ...todo, completed: !todo.completed };
        // Trigger confetti when marking a todo as complete (not when unchecking)
        if (!todo.completed && updatedTodo.completed) {
          triggerConfetti();
        }
        return updatedTodo;
      }
      return todo;
    }));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = (id, newText) => {
    if (newText.trim()) {
      setTodos(todos.map(todo =>
        todo.id === id ? { ...todo, text: newText.trim() } : todo
      ));
    }
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const toggleAll = () => {
    const allCompleted = todos.every(todo => todo.completed);
    setTodos(todos.map(todo => ({ ...todo, completed: !allCompleted })));
  };

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case FILTERS.ACTIVE:
        return !todo.completed;
      case FILTERS.COMPLETED:
        return todo.completed;
      default:
        return true;
    }
  });

  const activeCount = todos.filter(todo => !todo.completed).length;
  const completedCount = todos.filter(todo => todo.completed).length;

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
            Todo MVC
          </h1>
          <p className="text-gray-600 text-lg">
            Stay organized and get things done
          </p>
        </div>

        {/* Main Todo Container */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden animate-slide-in">
          {/* Todo Input */}
          <div className="p-6 border-b border-gray-100">
            <TodoInput onAddTodo={addTodo} />
            
            {todos.length > 0 && (
              <button
                onClick={toggleAll}
                className="mt-4 flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200"
              >
                <Check className="w-4 h-4" />
                {todos.every(todo => todo.completed) ? 'Mark all as active' : 'Mark all as complete'}
              </button>
            )}
          </div>

          {/* Todo List */}
          {todos.length > 0 && (
            <>
              <div className="divide-y divide-gray-100">
                {filteredTodos.map((todo, index) => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={toggleTodo}
                    onDelete={deleteTodo}
                    onEdit={editTodo}
                    animationDelay={index * 50}
                  />
                ))}
              </div>

              {/* Footer */}
              <div className="p-6 bg-gray-50 border-t border-gray-100">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <Stats 
                    activeCount={activeCount}
                    completedCount={completedCount}
                    totalCount={todos.length}
                  />
                  
                  <FilterButtons
                    currentFilter={filter}
                    onFilterChange={setFilter}
                    filters={FILTERS}
                  />
                  
                  {completedCount > 0 && (
                    <button
                      onClick={clearCompleted}
                      className="px-4 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-200"
                    >
                      Clear completed ({completedCount})
                    </button>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Empty State */}
          {todos.length === 0 && (
            <div className="p-12 text-center text-gray-500 animate-bounce-in">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <Plus className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium mb-2">No todos yet</h3>
              <p className="text-sm">Add your first todo above to get started!</p>
            </div>
          )}

          {/* No filtered results */}
          {todos.length > 0 && filteredTodos.length === 0 && (
            <div className="p-12 text-center text-gray-500 animate-fade-in">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <Filter className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium mb-2">No {filter} todos</h3>
              <p className="text-sm">Try a different filter or add some todos!</p>
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div className="text-center mt-8 text-sm text-gray-500 animate-fade-in">
          <p>Built with React & Tailwind CSS</p>
          <p className="mt-1">Double-click to edit • Click to mark complete</p>
        </div>
      </div>
    </div>
  );
}

export default App;
