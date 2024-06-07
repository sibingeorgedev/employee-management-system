import React from 'react';
import EmployeeItem from './EmployeeItem';

const EmployeeTable = ({ employees }) => {
  return (
    <div className="employee-table">
      {employees.map(employee => (
        <EmployeeItem key={employee.id} employee={employee} />
      ))}
    </div>
  );
};

export default EmployeeTable;
