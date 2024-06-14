import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function EmployeeCreate(props) {

  const initialFormState = {
    firstName: '',
    lastName: '',
    age: '',
    dateOfJoining: '',
    title: 'Employee',
    department: 'IT',
    employeeType: 'FullTime'
  };

  const [formState, setFormState] = useState(initialFormState);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const resetForm = () => {
    setFormState(initialFormState);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const employee = {
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      age: parseInt(form.age.value),
      dateOfJoining: form.dateOfJoining.value,
      title: form.title.value,
      department: form.department.value,
      employeeType: form.employeeType.value,
      currentStatus: true,
    };

    await props.handleCreateEmployee(employee);

    setIsModalOpen(false);
    resetForm();
  };

  return (
    <div>
      <button className="createButton" onClick={() => setIsModalOpen(true)}>Create Employee</button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => closeModal()}
        contentLabel="Create Employee"
        className="modal"
        overlayClassName="overlay"
      >
        <h2 className="modalTitle">Create Employee</h2>
        <div className="modalContent">
          <form onSubmit={handleSubmit} className="form">
            <div className="formGroup">
              <label htmlFor="firstName" className="label">First Name:</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="First Name"
                value={formState.firstName}
                onChange={handleChange}
                className="input"
              />
              {props.errors.firstName && <p className="error">{props.errors.firstName}</p>}
            </div>
            <div className="formGroup">
              <label htmlFor="lastName" className="label">Last Name:</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Last Name"
                value={formState.lastName}
                onChange={handleChange}
                className="input"
              />
              {props.errors.lastName && <p className="error">{props.errors.lastName}</p>}
            </div>
            <div className="formGroup">
              <label htmlFor="age" className="label">Age:</label>
              <input
                type="number"
                id="age"
                name="age"
                placeholder="Age"
                value={formState.age}
                onChange={handleChange}
                className="input"
              />
              {props.errors.age && <p className="error">{props.errors.age}</p>}
            </div>
            <div className="formGroup">
              <label htmlFor="dateOfJoining" className="label">Date of Joining:</label>
              <input
                type="date"
                id="dateOfJoining"
                name="dateOfJoining"
                value={formState.dateOfJoining}
                onChange={handleChange}
                className="input"
              />
              {props.errors.dateOfJoining && <p className="error">{props.errors.dateOfJoining}</p>}
            </div>
            <div className="formGroup">
              <label htmlFor="title" className="label">Title:</label>
              <select id="title" name="title" value={formState.title} onChange={handleChange} className="select">
                <option value="Employee">Employee</option>
                <option value="Manager">Manager</option>
                <option value="Director">Director</option>
                <option value="VP">VP</option>
              </select>
            </div>
            <div className="formGroup">
              <label htmlFor="department" className="label">Department:</label>
              <select id="department" name="department" value={formState.department} onChange={handleChange} className="select">
                <option value="IT">IT</option>
                <option value="Marketing">Marketing</option>
                <option value="HR">HR</option>
                <option value="Engineering">Engineering</option>
              </select>
            </div>
            <div className="formGroup">
              <label htmlFor="employeeType" className="label">Employee Type:</label>
              <select id="employeeType" name="employeeType" value={formState.employeeType} onChange={handleChange} className="select">
                <option value="FullTime">FullTime</option>
                <option value="PartTime">PartTime</option>
                <option value="Contract">Contract</option>
                <option value="Seasonal">Seasonal</option>
              </select>
            </div>
            <button type="submit" disabled={props.loading} className="submitButton">
              {props.loading ? 'Creating...' : 'Create Employee'}
            </button>
            {props.mutationError && <p className="error">An error occurred: {props.mutationError.message}</p>}
          </form>
        </div>
        <button onClick={() => closeModal()} className="closeButton">Close</button>
      </Modal>
    </div>
  );
}

EmployeeCreate.propTypes = {
  handleCreateEmployee: PropTypes.func.isRequired,
  errors: PropTypes.object,
  loading: PropTypes.bool,
  mutationError: PropTypes.object
};

EmployeeCreate.defaultProps = {
  errors: {},
  loading: false,
  mutationError: null
};

export default React.memo(EmployeeCreate);
