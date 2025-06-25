import React, { useState } from 'react';
import { Plus } from 'lucide-react';

const TodoInput = ({ onAddTodo }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onAddTodo(inputValue);
      setInputValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="What needs to be done?"
        className="todo-input pr-12"
        autoFocus
      />
      <button
        type="submit"
        className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-blue-500 transition-colors duration-200 focus:outline-none focus:text-blue-500"
        disabled={!inputValue.trim()}
      >
        <Plus className="w-5 h-5" />
      </button>
    </form>
  );
};

export default TodoInput;
