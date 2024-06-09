import React from 'react';

  const EmployeeTable = React.memo((employeeData) => {
  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error :(</p>;

  if (employeeData) {
    return (
      <table className='employee-table'>
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
          </tr>
        </thead>
        <tbody>
          {employeeData.employeeData.map(({ id, firstName, lastName, age, dateOfJoining, title, department, employeeType, currentStatus }) => (
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
  } ;
});

export default EmployeeTable;
