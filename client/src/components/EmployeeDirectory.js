import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import EmployeeSearch from './EmployeeSearch';
import EmployeeTable from './EmployeeTable';
import EmployeeFilter from './EmployeeFilter';
import EmployeeCreate from './EmployeeCreate';
import PropTypes from 'prop-types';
import { fetchEmployees, createEmployeeAPI, deleteEmployeeAPI } from '../api/employeeAPI';

const EmployeeDirectory = ({ employees }) => {
  const [employeeData, setEmployeeData] = useState(employees);
  const [searchParams] = useSearchParams();
  const filter = searchParams.get("employeeType") || "";

  const handleCreateEmployee = async (employee) => {
    employee = await createEmployeeAPI(employee);
    setEmployeeData([...employeeData, employee]);
  };

  const handleDeleteEmployee = async (employeeId) => {
    const success = await deleteEmployeeAPI(employeeId);
    if (success) {
      setEmployeeData(employeeData.filter(employee => employee.employeeId !== employeeId));
    }
  };

  useEffect(() => {
    const wrapFunction = async () => {
      const data = await fetchEmployees(filter);
      console.log("Fetching data...", data);
      setEmployeeData(data);
    };

    wrapFunction();
  }, [filter]);

  return (
    <div className="employee-directory">
      <div className="search-container">
        <EmployeeCreate handleCreateEmployee={handleCreateEmployee} />
        <div className="search-and-filter">
          <EmployeeSearch />
          <EmployeeFilter />
        </div>
      </div>
      <div className="table-container">
        <EmployeeTable employeeData={employeeData} onDelete={handleDeleteEmployee} />
      </div>
    </div>
  );
};

EmployeeDirectory.propTypes = {
  employees: PropTypes.array.isRequired,
  handleCreateEmployee: PropTypes.func.isRequired,
};

export default EmployeeDirectory;
