import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const EmployeeDetails = () => {
  const { employeeId } = useParams();
  const [employee, setEmployee] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    department: '',
    currentStatus: true
  });

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
      setFormData({
        title: data.getEmployeeById.title,
        department: data.getEmployeeById.department,
        currentStatus: data.getEmployeeById.currentStatus
      });
    };

    fetchEmployee();
  }, [employeeId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:3002/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          mutation updateEmployee($employeeId: Int!, $title: Title, $department: Department, $currentStatus: Boolean) {
            updateEmployee(employeeId: $employeeId, title: $title, department: $department, currentStatus: $currentStatus) {
              employeeId
              firstName
              lastName
              title
              department
              currentStatus
            }
          }
        `,
        variables: {
          employeeId: parseInt(employeeId),
          ...formData,
          currentStatus: formData.currentStatus === 'true'
        },
      }),
    });

    const { data } = await response.json();
    setEmployee(data.updateEmployee);
    setEditMode(false);
  };

  const handleCancel = () => {
    setEditMode(false);
    setFormData({
      title: employee.title,
      department: employee.department,
      currentStatus: employee.currentStatus
    });
  };

  if (!employee) return <div>Loading...</div>;

  return (
    <div className="employee-details">
      <h1>Employee Details</h1>
      {editMode ? (
        <form onSubmit={handleSubmit}>
          <p>
            <strong>First Name:</strong> {employee.firstName}
          </p>
          <p>
            <strong>Last Name:</strong> {employee.lastName}
          </p>
          <p>
            <strong>Age:</strong> {employee.age}
          </p>
          <p>
            <strong>Date of Joining:</strong> {new Date(employee.dateOfJoining).toLocaleDateString()}
          </p>
          <p>
            <strong>Title:</strong>
            <select
              name="title"
              value={formData.title}
              onChange={handleInputChange}
            >
              <option value="Employee">Employee</option>
              <option value="Manager">Manager</option>
              <option value="Director">Director</option>
              <option value="VP">VP</option>
            </select>
          </p>
          <p>
            <strong>Department:</strong>
            <select
              name="department"
              value={formData.department}
              onChange={handleInputChange}
            >
              <option value="IT">IT</option>
              <option value="Marketing">Marketing</option>
              <option value="HR">HR</option>
              <option value="Engineering">Engineering</option>
            </select>
          </p>
          <p>
            <strong>Current Status:</strong>
            <select
              name="currentStatus"
              value={formData.currentStatus}
              onChange={handleInputChange}
            >
              <option value="true">Working</option>
              <option value="false">Retired</option>
            </select>
          </p>
          <div className="button-group">
            <button type="submit" className="submitButton">Update</button>
            <button type="button" className="cancelButton" onClick={handleCancel}>Cancel</button>
          </div>
        </form>
      ) : (
        <>
          <p><strong>First Name:</strong> {employee.firstName}</p>
          <p><strong>Last Name:</strong> {employee.lastName}</p>
          <p><strong>Age:</strong> {employee.age}</p>
          <p><strong>Date of Joining:</strong> {new Date(employee.dateOfJoining).toLocaleDateString()}</p>
          <p><strong>Title:</strong> {employee.title}</p>
          <p><strong>Department:</strong> {employee.department}</p>
          <p><strong>Current Status:</strong> {employee.currentStatus ? 'Working' : 'Retired'}</p>
          <button onClick={() => setEditMode(true)} className="submitButton">Edit</button>
        </>
      )}
    </div>
  );
};

export default EmployeeDetails;
