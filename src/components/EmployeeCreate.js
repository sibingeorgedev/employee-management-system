import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const CREATE_EMPLOYEE = gql`
  mutation CreateEmployee(
    $firstName: String!,
    $lastName: String!,
    $age: Int!,
    $dateOfJoining: String!,
    $title: String!,
    $department: String!,
    $employeeType: String!
  ) {
    createEmployee(
      firstName: $firstName,
      lastName: $lastName,
      age: $age,
      dateOfJoining: $dateOfJoining,
      title: $title,
      department: $department,
      employeeType: $employeeType
    ) {
      id
      firstName
      lastName
    }
  }
`;

const EmployeeCreate = () => {
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    age: '',
    dateOfJoining: '',
    title: 'Employee',
    department: 'IT',
    employeeType: 'FullTime'
  });
  
  const [errors, setErrors] = useState({});
  
  const [createEmployee] = useMutation(CREATE_EMPLOYEE, {
    onCompleted: () => {
      // Reset form state and errors after successful creation
      setFormState({
        firstName: '',
        lastName: '',
        age: '',
        dateOfJoining: '',
        title: 'Employee',
        department: 'IT',
        employeeType: 'FullTime'
      });
      setErrors({});
    },
    onError: (error) => {
      // Handle GraphQL errors here
      console.error(error);
    }
  });

  const validateForm = () => {
    let formErrors = {};
    if (!formState.firstName) formErrors.firstName = 'First Name is required';
    if (!formState.lastName) formErrors.lastName = 'Last Name is required';
    if (!formState.age || formState.age < 20 || formState.age > 70) {
      formErrors.age = 'Age must be between 20 and 70';
    }
    if (!formState.dateOfJoining) formErrors.dateOfJoining = 'Date of Joining is required';
    return formErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      createEmployee({ variables: { ...formState, age: parseInt(formState.age) } });
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formState.firstName}
          onChange={handleChange}
        />
        {errors.firstName && <p>{errors.firstName}</p>}
      </div>
      <div>
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formState.lastName}
          onChange={handleChange}
        />
        {errors.lastName && <p>{errors.lastName}</p>}
      </div>
      <div>
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formState.age}
          onChange={handleChange}
        />
        {errors.age && <p>{errors.age}</p>}
      </div>
      <div>
        <input
          type="date"
          name="dateOfJoining"
          value={formState.dateOfJoining}
          onChange={handleChange}
        />
        {errors.dateOfJoining && <p>{errors.dateOfJoining}</p>}
      </div>
      <div>
        <select name="title" value={formState.title} onChange={handleChange}>
          <option value="Employee">Employee</option>
          <option value="Manager">Manager</option>
          <option value="Director">Director</option>
          <option value="VP">VP</option>
        </select>
      </div>
      <div>
        <select name="department" value={formState.department} onChange={handleChange}>
          <option value="IT">IT</option>
          <option value="Marketing">Marketing</option>
          <option value="HR">HR</option>
          <option value="Engineering">Engineering</option>
        </select>
      </div>
      <div>
        <select name="employeeType" value={formState.employeeType} onChange={handleChange}>
          <option value="FullTime">FullTime</option>
          <option value="PartTime">PartTime</option>
          <option value="Contract">Contract</option>
          <option value="Seasonal">Seasonal</option>
        </select>
      </div>
      <button type="submit">Create Employee</button>
    </form>
  );
};

export default EmployeeCreate;
