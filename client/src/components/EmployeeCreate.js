import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function EmployeeCreate({
  handleCreateEmployee = () => { },
  errors = {},
  loading = false,
  mutationError = null
}) {
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
    const form = e.target;

    const employee = {
      employeeId: 0,
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      age: parseInt(form.age.value),
      dateOfJoining: form.dateOfJoining.value,
      title: form.title.value,
      department: form.department.value,
      employeeType: form.employeeType.value,
      currentStatus: true,
    };

    await handleCreateEmployee(employee);

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
                required
              />
              {errors.firstName && <p className="error">{errors.firstName}</p>}
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
                required
              />
              {errors.lastName && <p className="error">{errors.lastName}</p>}
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
                min="20"
                max="70"
                required
              />
              {ageError && <p className="error">{ageError}</p>}
              {errors.age && <p className="error">{errors.age}</p>}
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
                required
              />
              {errors.dateOfJoining && <p className="error">{errors.dateOfJoining}</p>}
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
            <button type="submit" disabled={loading} className="submitButton">
              {loading ? 'Creating...' : 'Create Employee'}
            </button>
            {mutationError && <p className="error">An error occurred: {mutationError.message}</p>}
          </form>
        </div>
        <button onClick={() => closeModal()} className="closeButton">Close</button>
      </Modal>
    </div>
  );
}

// Define the prop types for the component to ensure the data type of the props passed to the component is correct.
EmployeeCreate.propTypes = {
  handleCreateEmployee: PropTypes.func,
  errors: PropTypes.object,
  loading: PropTypes.bool,
  mutationError: PropTypes.object
};

export default React.memo(EmployeeCreate);
