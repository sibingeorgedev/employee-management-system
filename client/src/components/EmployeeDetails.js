import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const EmployeeDetails = () => {
  const { employeeId } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      const response = await fetch('http://localhost:3002/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `query {
            getEmployeeById(employeeId: ${employeeId}) {
              firstName
              lastName
              age
              dateOfJoining
              title
              department
              employeeType
              currentStatus
            }
          }`,
        }),
      });

      const { data } = await response.json();
      setEmployee(data.getEmployeeById);
    };

    fetchEmployee();
  }, [employeeId]);

  if (!employee) return <div>Loading...</div>;

  return (
    <div className="employee-details">
      <h1>Employee Details</h1>
      <p><strong>First Name:</strong> {employee.firstName}</p>
      <p><strong>Last Name:</strong> {employee.lastName}</p>
      <p><strong>Age:</strong> {employee.age}</p>
      <p><strong>Date of Joining:</strong> {employee.dateOfJoining}</p>
      <p><strong>Title:</strong> {employee.title}</p>
      <p><strong>Department:</strong> {employee.department}</p>
      <p><strong>Employee Type:</strong> {employee.employeeType}</p>
      <p><strong>Current Status:</strong> {employee.currentStatus ? 'Working' : 'Retired'}</p>
    </div>
  );
};

export default EmployeeDetails;
