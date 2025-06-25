import React, { useState } from 'react';
import { Plus } from 'lucide-react';

const TodoInput = ({ onAddTodo }) => {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedValue = inputValue.trim();
    
    if (!trimmedValue) {
      setError('Please enter a todo item');
      return;
    }
    
    if (trimmedValue.length < 3) {
      setError('Todo must be at least 3 characters long');
      return;
    }
    
    // Clear error and submit
    setError('');
    onAddTodo(trimmedValue);
    setInputValue('');
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    
    // Clear error when input becomes valid
    if (error && newValue.trim().length >= 3) {
      setError('');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="What needs to be done?"
          className={`todo-input pr-12 ${error ? 'border-red-400 focus:border-red-500 focus:ring-red-200' : ''}`}
          autoFocus
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-blue-500 transition-colors duration-200 focus:outline-none focus:text-blue-500"
          disabled={!inputValue.trim() || inputValue.trim().length < 3}
        >
          <Plus className="w-5 h-5" />
        </button>
      </form>
      {error && (
        <p className="mt-2 text-sm text-red-600 animate-fade-in">
          {error}
        </p>
      )}
    </div>
  );
};

export default TodoInput;
