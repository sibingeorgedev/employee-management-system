import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchEmployeeById, updateEmployee } from '../api/employeeAPI';

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
    const getEmployee = async () => {
      try {
        const employeeData = await fetchEmployeeById(employeeId);
        setEmployee(employeeData);
        setFormData({
          title: employeeData.title,
          department: employeeData.department,
          currentStatus: employeeData.currentStatus
        });
      } catch (error) {
        console.error('Error fetching employee:', error);
      }
    };

    getEmployee();
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
    try {
      const updatedEmployee = await updateEmployee(employeeId, formData);
      setEmployee(updatedEmployee);
      setEditMode(false);
    } catch (error) {
      console.error('Error updating employee:', error);
    }
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
