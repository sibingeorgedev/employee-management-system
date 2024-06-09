import React, { useState } from 'react';

const EmployeeSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="search-input">
      <input
        className="search-input-field"
        type="text"
        placeholder="Search employees"
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
  );
};

export default EmployeeSearch;
