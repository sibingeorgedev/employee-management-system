import React from 'react';
import { Link } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';

const EmployeeTable = React.memo(({ employeeData, onDelete }) => {
  if (!Array.isArray(employeeData)) {
    return <p>No employee data available</p>;
  }

  return (
    <div className="employee-table-container">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Date of Joining</th>
            <th>Title</th>
            <th>Department</th>
            <th>Employee Type</th>
            <th>Current Status</th>
            <th>Employee Details</th>
            <th>Delete Employee</th>
          </tr>
        </thead>
        <tbody>
          {employeeData.filter(employee => employee != null).map(({ id, employeeId, firstName, lastName, age, dateOfJoining, title, department, employeeType, currentStatus }) => (
            <tr key={employeeId}>
              <td>{firstName}</td>
              <td>{lastName}</td>
              <td>{age}</td>
              <td>{new Date(dateOfJoining).toLocaleDateString()}</td>
              <td>{title}</td>
              <td>{department}</td>
              <td>{employeeType}</td>
              <td>{currentStatus ? 'Working' : 'Retired'}</td>
              <td>
                <Link to={`/employee/${employeeId}`} className="btn btn-info">View Details</Link>
              </td>
              <td>
                <Button variant="danger" onClick={() => onDelete(employeeId)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
});

export default EmployeeTable;
