import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import EmployeeSearch from './EmployeeSearch';
import EmployeeTable from './EmployeeTable';
import EmployeeCreate from './EmployeeCreate';
import EmployeeFilter from './EmployeeFilter';

async function fetchData(employeeType) {
  const query = employeeType
    ? `query {
        getEmployees(type: ${employeeType}) {
          employeeId
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
          employeeId
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
            employeeId,
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

const deleteEmployeeAPI = async (employeeId) => {
  const response = await fetch('http://localhost:3002/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
        mutation {
          deleteEmployee(employeeId: ${employeeId})
        }
      `,
    }),
  });

  const json = await response.json();
  return json.data.deleteEmployee;
};

const EmployeeDirectory = () => {
  const [employees, setEmployees] = useState([]);
  const [searchParams] = useSearchParams();
  const filter = searchParams.get("employeeType") || "";

  const handleCreateEmployee = async (employee) => {
    employee = await createEmployeeAPI(employee);
    setEmployees([...employees, employee]);
  };

  const handleFilterChange = (newFilter) => {
    // filter state is now managed by searchParams
  };

  const handleDeleteEmployee = async (employeeId) => {
    const success = await deleteEmployeeAPI(employeeId);
    if (success) {
      setEmployees(employees.filter(employee => employee.employeeId !== employeeId));
    }
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
        <EmployeeCreate handleCreateEmployee={handleCreateEmployee} />
        <div className="search-and-filter">
          <EmployeeSearch />
          <EmployeeFilter onFilterChange={handleFilterChange} />
        </div>
      </div>
      <div className="table-container">
        <EmployeeTable employeeData={employees} onDelete={handleDeleteEmployee} />
      </div>
    </div>
  );
};

export default EmployeeDirectory;
