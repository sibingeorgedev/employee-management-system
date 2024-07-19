import React from 'react';

const EmployeeFilter = ({ selectedFilter, onFilterChange }) => {
  const handleChange = (event) => {
    onFilterChange(event.target.value);
  };

  return (
    <div className="employee-filter">
      <select value={selectedFilter} onChange={handleChange} className="filter-dropdown">
        <option value="">All Employees</option>
        <option value="FullTime">Full Time</option>
        <option value="PartTime">Part Time</option>
        <option value="Contract">Contract</option>
        <option value="Seasonal">Seasonal</option>
      </select>
    </div>
  );
};

export default EmployeeFilter;
