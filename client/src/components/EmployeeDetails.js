import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchEmployeeById, updateEmployee } from '../api/employeeAPI';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';

const EmployeeDetails = () => {
  const { employeeId } = useParams();
  const navigate = useNavigate();
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
    <Container className="mt-4">
      <h1>Employee Details</h1>
      {editMode ? (
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Row} controlId="formTitle" className="mb-2">
            <Form.Label column sm={4}>Title</Form.Label>
            <Col sm={8}>
              <Form.Control
                as="select"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
              >
                <option value="Employee">Employee</option>
                <option value="Manager">Manager</option>
                <option value="Director">Director</option>
                <option value="VP">VP</option>
              </Form.Control>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formDepartment" className="mb-2">
            <Form.Label column sm={4}>Department</Form.Label>
            <Col sm={8}>
              <Form.Control
                as="select"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
              >
                <option value="IT">IT</option>
                <option value="Marketing">Marketing</option>
                <option value="HR">HR</option>
                <option value="Engineering">Engineering</option>
              </Form.Control>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formCurrentStatus" className="mb-2">
            <Form.Label column sm={4}>Current Status</Form.Label>
            <Col sm={8}>
              <Form.Control
                as="select"
                name="currentStatus"
                value={formData.currentStatus}
                onChange={handleInputChange}
              >
                <option value="true">Working</option>
                <option value="false">Retired</option>
              </Form.Control>
            </Col>
          </Form.Group>

          <div className="d-flex justify-content-end mt-md-2">
            <Button type="submit" variant="primary" className="me-2">Update</Button>
            <Button type="button" variant="secondary" onClick={handleCancel}>Cancel</Button>
          </div>
        </Form>
      ) : (
        <>
          <div className="mb-4">
            <p><strong>First Name:</strong> {employee.firstName}</p>
            <p><strong>Last Name:</strong> {employee.lastName}</p>
            <p><strong>Age:</strong> {employee.age}</p>
            <p><strong>Date of Birth:</strong> {new Date(employee.dateOfBirth).toLocaleDateString()}</p>
            <p><strong>Date of Joining:</strong> {new Date(employee.dateOfJoining).toLocaleDateString()}</p>
            <p><strong>Title:</strong> {employee.title}</p>
            <p><strong>Department:</strong> {employee.department}</p>
            <p><strong>Current Status:</strong> {employee.currentStatus ? 'Working' : 'Retired'}</p>
            <Button onClick={() => setEditMode(true)} variant="primary">Edit</Button>
          </div>
          <h2>Retirement Details</h2>
          <div>
            <p><strong>Retirement Date:</strong> {new Date(employee.retirementDate).toLocaleDateString()}</p>
            <p><strong>Time Until Retirement:</strong> {employee.timeUntilRetirement.years} years, {employee.timeUntilRetirement.months} months, {employee.timeUntilRetirement.days} days</p>
          </div>
        </>
      )}
      <Button
        variant="secondary"
        onClick={() => navigate('/')}
        className="mt-lg-2"
      >
        Back to Employee Table
      </Button>
    </Container>
  );
};

export default EmployeeDetails;
