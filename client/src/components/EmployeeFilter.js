import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const EmployeeFilter = ({  }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const selectedFilter = searchParams.get("employeeType") || "";

  const handleChange = (event) => {
    const filterValue = event.target.value;
    navigate(`?employeeType=${filterValue}`);
  };

  return (
    <div className="employee-filter">
      <select value={selectedFilter} onChange={handleChange} className="filter-dropdown">
        <option value="">All Employees</option>
        <option value="FullTime">Full Time</option>
        <option value="PartTime">Part Time</option>
        <option value="Contract">Contract</option>
        <option value="Seasonal">Seasonal</option>
        <option value="UpComingRetirement">UpComing Retirement</option>
      </select>
    </div>
  );
};

export default EmployeeFilter;
