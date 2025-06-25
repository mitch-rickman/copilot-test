import React from 'react';

const FilterButtons = ({ currentFilter, onFilterChange, filters }) => {
  const filterLabels = {
    [filters.ALL]: 'All',
    [filters.ACTIVE]: 'Active',
    [filters.COMPLETED]: 'Completed'
  };

  return (
    <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
      {Object.values(filters).map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={`filter-btn ${
            currentFilter === filter ? 'filter-btn-active' : ''
          }`}
        >
          {filterLabels[filter]}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;
