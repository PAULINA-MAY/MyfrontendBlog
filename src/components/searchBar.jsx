import React from 'react';

const SearchBar = ({ searchTerm, onSearchChange }) => {
  const handleInputChange = (e) => {
    onSearchChange(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Buscar..."
      value={searchTerm}
      onChange={handleInputChange}
      className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
    />
  );
};

export default SearchBar;
