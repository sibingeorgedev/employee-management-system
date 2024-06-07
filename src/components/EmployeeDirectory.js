import React from 'react';
import EmployeeSearch from './EmployeeSearch';
import EmployeeTable from './EmployeeTable';
import EmployeeCreate from './EmployeeCreate';

const EmployeeDirectory = () => {
  return (
    <div className="employee-directory">
      <EmployeeSearch />
      <EmployeeTable />
      <EmployeeCreate />
    </div>
  );
};

export default EmployeeDirectory;
