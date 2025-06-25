import React, { useState, useRef, useEffect } from 'react';
import { Check, X, Edit3 } from 'lucide-react';

const TodoItem = ({ todo, onToggle, onDelete, onEdit, animationDelay = 0 }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.text);
  const editInputRef = useRef(null);

  useEffect(() => {
    if (isEditing && editInputRef.current) {
      editInputRef.current.focus();
      editInputRef.current.select();
    }
  }, [isEditing]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditValue(todo.text);
  };

  const handleSave = () => {
    if (editValue.trim()) {
      onEdit(todo.id, editValue);
      setIsEditing(false);
    } else {
      setEditValue(todo.text);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditValue(todo.text);
    setIsEditing(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <div 
      className="todo-item animate-slide-in"
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      {/* Checkbox */}
      <button
        onClick={() => onToggle(todo.id)}
        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
          todo.completed
            ? 'bg-green-500 border-green-500 text-white'
            : 'border-gray-300 hover:border-green-400'
        }`}
      >
        {todo.completed && <Check className="w-4 h-4" />}
      </button>

      {/* Todo Text */}
      <div className="flex-1 min-w-0">
        {isEditing ? (
          <input
            ref={editInputRef}
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyPress}
            className="w-full px-2 py-1 text-lg border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        ) : (
          <span
            className={`text-lg cursor-pointer select-none transition-all duration-200 ${
              todo.completed
                ? 'text-gray-500 line-through'
                : 'text-gray-800 hover:text-blue-600'
            }`}
            onDoubleClick={handleEdit}
          >
            {todo.text}
          </span>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        {!isEditing && (
          <>
            <button
              onClick={handleEdit}
              className="p-2 text-gray-400 hover:text-blue-500 transition-colors duration-200 focus:outline-none focus:text-blue-500"
              title="Edit todo"
            >
              <Edit3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-200 focus:outline-none focus:text-red-500"
              title="Delete todo"
            >
              <X className="w-4 h-4" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TodoItem;
