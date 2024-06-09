import React from 'react';

const EmployeeCreate = React.memo((props) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formState = {
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      age: parseInt(form.age.value),
      dateOfJoining: form.dateOfJoining.value,
      title: form.title.value,
      department: form.department.value,
      employeeType: form.employeeType.value
    };

    await props.handleCreateEmployee(formState);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          placeholder="First Name"
        />
        {props.errors.firstName && <p>{props.errors.firstName}</p>}
      </div>
      <div>
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          placeholder="Last Name"
        />
        {props.errors.lastName && <p>{props.errors.lastName}</p>}
      </div>
      <div>
        <label htmlFor="age">Age:</label>
        <input
          type="number"
          id="age"
          name="age"
          placeholder="Age"
        />
        {props.errors.age && <p>{props.errors.age}</p>}
      </div>
      <div>
        <label htmlFor="dateOfJoining">Date of Joining:</label>
        <input
          type="date"
          id="dateOfJoining"
          name="dateOfJoining"
        />
        {props.errors.dateOfJoining && <p>{props.errors.dateOfJoining}</p>}
      </div>
      <div>
        <label htmlFor="title">Title:</label>
        <select id="title" name="title">
          <option value="Employee">Employee</option>
          <option value="Manager">Manager</option>
          <option value="Director">Director</option>
          <option value="VP">VP</option>
        </select>
      </div>
      <div>
        <label htmlFor="department">Department:</label>
        <select id="department" name="department">
          <option value="IT">IT</option>
          <option value="Marketing">Marketing</option>
          <option value="HR">HR</option>
          <option value="Engineering">Engineering</option>
        </select>
      </div>
      <div>
        <label htmlFor="employeeType">Employee Type:</label>
        <select id="employeeType" name="employeeType">
          <option value="FullTime">FullTime</option>
          <option value="PartTime">PartTime</option>
          <option value="Contract">Contract</option>
          <option value="Seasonal">Seasonal</option>
        </select>
      </div>
      <button type="submit" disabled={props.loading}>
        {props.loading ? 'Creating...' : 'Create Employee'}
      </button>
      {props.mutationError && <p>An error occurred: {props.mutationError.message}</p>}
    </form>
  );
});

export default EmployeeCreate;