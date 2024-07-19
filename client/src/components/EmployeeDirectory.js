import React, { useState, useEffect } from 'react';
import EmployeeSearch from './EmployeeSearch';
import EmployeeTable from './EmployeeTable';
import EmployeeCreate from './EmployeeCreate';
import EmployeeFilter from './EmployeeFilter';

async function fetchData(employeeType) {
  const query = employeeType
    ? `query {
        getEmployees(type: ${employeeType}) {
          firstName
          lastName
          age
          dateOfJoining
          title
          department
          employeeType
          currentStatus
        }
      }`
    : `query {
        getEmployees {
          firstName
          lastName
          age
          dateOfJoining
          title
          department
          employeeType
          currentStatus
        }
      }`;

  const response = await fetch('http://localhost:3002/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  });

  const json = await response.json();

  // Check if json.data.getEmployees is an array
  if (!Array.isArray(json.data.getEmployees)) {
    console.error('Unexpected data format', json);
    return [];
  }

  return json.data.getEmployees || [];
}

const createEmployeeAPI = async (employee) => {
  const response = await fetch('http://localhost:3002/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
        mutation addEmployee($input: InputEmployee!) {
          addEmployee(employee: $input) {
            firstName,
            lastName,
            age,
            dateOfJoining,
            title,
            department,
            employeeType,
            currentStatus
          }
        }
      `,
      variables: { input: employee }
    }),
  });

  const json = await response.json();
  return json.data.addEmployee;
};

const EmployeeDirectory = () => {
  const [employees, setEmployees] = useState([]);
  const [filter, setFilter] = useState('');

  const handleCreateEmployee = async (employee) => {
    employee = await createEmployeeAPI(employee);
    setEmployees([...employees, employee]);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  useEffect(() => {
    const wrapFunction = async () => {
      const data = await fetchData(filter);
      console.log("Fetching data...", data);
      setEmployees(data);
    };

    wrapFunction();
  }, [filter]);

  return (
    <div className="employee-directory">
      <div className="search-container">
        <EmployeeSearch />
        <EmployeeFilter selectedFilter={filter} onFilterChange={handleFilterChange} />
      </div>
      <div className="table-container">
        <EmployeeTable employeeData={employees} />
      </div>
      <EmployeeCreate handleCreateEmployee={handleCreateEmployee} />
    </div>
  );
};

export default EmployeeDirectory;
