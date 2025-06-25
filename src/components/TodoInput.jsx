import React, { useState } from 'react';
import { Plus } from 'lucide-react';

const TodoInput = ({ onAddTodo }) => {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    if (error) {
      setError(''); // Clear error when user starts typing
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
    if (inputValue.trim() && inputValue.trim().length >= 3) {
      console.log("add todo");
      onAddTodo(inputValue.trim());
      setInputValue('');
      setError('');
    }
  };

  const handleButtonClick = (e) => {
    if (!inputValue.trim()) {
      console.log("todo empty");
      setError('Please enter a todo item');
      e.preventDefault();
    } else if (inputValue.trim().length < 3) {
      console.log("todo too short");
      setError('Todo must be at least 3 characters long');
      e.preventDefault();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="What needs to be done? (min 3 characters)"
        className="todo-input pr-12"
        autoFocus
      />
      <button
        type="submit"
        className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-blue-500 transition-colors duration-200 focus:outline-none focus:text-blue-500"
        onClick={handleButtonClick}
      >
        <Plus className="w-5 h-5" />
      </button>
      {error && (
        <div className="mt-2 text-sm text-red-500">
          {error}
        </div>
      )}
    </form>
  );
};

export default TodoInput;
