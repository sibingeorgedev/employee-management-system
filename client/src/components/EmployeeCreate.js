import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { createEmployeeAPI } from '../api/employeeAPI';

function EmployeeCreate({
  handleCreateEmployee = null,
  errors = {},
  loading = false,
  mutationError = null
}) {
  const initialFormState = {
    firstName: '',
    lastName: '',
    age: '',
    dateOfBirth: '',
    dateOfJoining: '',
    title: 'Employee',
    department: 'IT',
    employeeType: 'FullTime'
  };

  const [formState, setFormState] = useState(initialFormState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ageError, setAgeError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'age') {
      const age = parseInt(value);
      if (age < 20 || age > 70) {
        setAgeError('Age must be between 20 and 70.');
      } else {
        setAgeError('');
      }
    }

    setFormState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const resetForm = () => {
    setFormState(initialFormState);
    setAgeError('');
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const employee = {
      employeeId: 0,
      firstName: formState.firstName,
      lastName: formState.lastName,
      age: parseInt(formState.age),
      dateOfBirth: formState.dateOfBirth,
      dateOfJoining: formState.dateOfJoining,
      title: formState.title,
      department: formState.department,
      employeeType: formState.employeeType,
      currentStatus: true,
    };

    try {
      if (handleCreateEmployee) {
        await handleCreateEmployee(employee);
      } else {
        const newEmployee = await createEmployeeAPI(employee);
        console.log("Employee created successfully", newEmployee);
      }
    } catch (error) {
      console.error("Error creating employee", error);
    }

    setIsModalOpen(false);
    resetForm();
  };

  return (
    <div>
      <Button variant="primary" onClick={() => setIsModalOpen(true)}>Create Employee</Button>

      <Modal
        show={isModalOpen}
        onHide={closeModal}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formState.firstName}
                onChange={handleChange}
                isInvalid={!!errors.firstName}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.firstName}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formState.lastName}
                onChange={handleChange}
                isInvalid={!!errors.lastName}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.lastName}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formAge">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                name="age"
                placeholder="Age"
                value={formState.age}
                onChange={handleChange}
                isInvalid={!!ageError}
                min="20"
                max="70"
                required
              />
              <Form.Control.Feedback type="invalid">
                {ageError || errors.age}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDateOfBirth">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                name="dateOfBirth"
                value={formState.dateOfBirth}
                onChange={handleChange}
                isInvalid={!!errors.dateOfBirth}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.dateOfBirth}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDateOfJoining">
              <Form.Label>Date of Joining</Form.Label>
              <Form.Control
                type="date"
                name="dateOfJoining"
                value={formState.dateOfJoining}
                onChange={handleChange}
                isInvalid={!!errors.dateOfJoining}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.dateOfJoining}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                as="select"
                name="title"
                value={formState.title}
                onChange={handleChange}
              >
                <option value="Employee">Employee</option>
                <option value="Manager">Manager</option>
                <option value="Director">Director</option>
                <option value="VP">VP</option>
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDepartment">
              <Form.Label>Department</Form.Label>
              <Form.Control
                as="select"
                name="department"
                value={formState.department}
                onChange={handleChange}
              >
                <option value="IT">IT</option>
                <option value="Marketing">Marketing</option>
                <option value="HR">HR</option>
                <option value="Engineering">Engineering</option>
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmployeeType">
              <Form.Label>Employee Type</Form.Label>
              <Form.Control
                as="select"
                name="employeeType"
                value={formState.employeeType}
                onChange={handleChange}
              >
                <option value="FullTime">FullTime</option>
                <option value="PartTime">PartTime</option>
                <option value="Contract">Contract</option>
                <option value="Seasonal">Seasonal</option>
              </Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? 'Creating...' : 'Create Employee'}
            </Button>
            {mutationError && <p className="text-danger mt-2">An error occurred: {mutationError.message}</p>}
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

EmployeeCreate.propTypes = {
  handleCreateEmployee: PropTypes.func,
  errors: PropTypes.object,
  loading: PropTypes.bool,
  mutationError: PropTypes.object
};

export default React.memo(EmployeeCreate);
