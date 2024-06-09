import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_EMPLOYEES = gql`
  query GetEmployees {
    employees {
      id
      firstName
      lastName
      age
      dateOfJoining
      title
      department
      employeeType
      currentStatus
    }
  }
`;

const EmployeeTable = () => {
  const { loading, error, data } = useQuery(GET_EMPLOYEES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <table>
      <thead>
        <tr>
          <th>FirstName</th>
          <th>LastName</th>
          <th>Age</th>
          <th>Date Of Joining</th>
          <th>Title</th>
          <th>Department</th>
          <th>Employee Type</th>
          <th>Current Status</th>
        </tr>
      </thead>
      <tbody>
        {data.employees.map(({ id, firstName, lastName, age, dateOfJoining, title, department, employeeType, currentStatus }) => (
          <tr key={id}>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{age}</td>
            <td>{dateOfJoining}</td>
            <td>{title}</td>
            <td>{department}</td>
            <td>{employeeType}</td>
            <td>{currentStatus ? 'Working' : 'Retired'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EmployeeTable;
