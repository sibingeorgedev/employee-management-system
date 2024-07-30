import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import EmployeeSearch from './EmployeeSearch';
import EmployeeTable from './EmployeeTable';
import EmployeeFilter from './EmployeeFilter';
import EmployeeCreate from './EmployeeCreate';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';
import { fetchEmployees, createEmployeeAPI, deleteEmployeeAPI, fetchEmployeeById, fetchUpcomingRetirementEmployees } from '../api/employeeAPI';

const EmployeeDirectory = ({ employees }) => {
  const [employeeData, setEmployeeData] = useState(employees);
  const [searchParams] = useSearchParams();
  const filter = searchParams.get("employeeType") || "";
  const [errorMessage, setErrorMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); 

  const handleCreateEmployee = async (employee) => {
    employee = await createEmployeeAPI(employee);
    setEmployeeData([...employeeData, employee]);
  };

  const handleDeleteEmployee = async (employeeId) => {
    const employeeData = await fetchEmployeeById(employeeId);
    if (employeeData.currentStatus) {
      setErrorMessage("CAN’T DELETE EMPLOYEE – STATUS ACTIVE");
      setIsModalOpen(true);
      return;
    }
    const success = await deleteEmployeeAPI(employeeId);
    if (success) {
      setEmployeeData(employeeData.filter(emp => emp.employeeId !== employeeId));
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setErrorMessage('');
  };

  useEffect(() => {
    const wrapFunction = async () => {
      let data = [];
      if (filter === "UpComingRetirement") {
        data = await fetchUpcomingRetirementEmployees();
      } else {
        data = await fetchEmployees(filter);
      }
      console.log("Fetching data...", data);
      setEmployeeData(data);
    };

    wrapFunction();
  }, [filter]);

  return (
    <div className="container mt-4">
      <div className="row mb-3">
        <div className="col-md-12 mb-3">
          <EmployeeCreate handleCreateEmployee={handleCreateEmployee} />
        </div>
        <div className="col-md-12 mb-3">
          <div className="d-flex justify-content-between">
            {/* <EmployeeSearch /> */}
            <EmployeeFilter />
          </div>
        </div>
      </div>
      <div className="table-responsive">
        <EmployeeTable employeeData={employeeData} onDelete={handleDeleteEmployee} />
      </div>
      <Modal show={isModalOpen} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>{errorMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

EmployeeDirectory.propTypes = {
  employees: PropTypes.array.isRequired,
  handleCreateEmployee: PropTypes.func.isRequired,
};

export default EmployeeDirectory;
