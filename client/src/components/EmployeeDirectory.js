import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import EmployeeSearch from './EmployeeSearch';
import EmployeeTable from './EmployeeTable';
import EmployeeFilter from './EmployeeFilter';
import EmployeeCreate from './EmployeeCreate';
import PropTypes from 'prop-types';
import DialogModal from '../common/Dialog-Modal';
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
      setEmployeeData(typeof(employeeData) !== 'object' ? employeeData.filter(employee => employee.employeeId !== employeeId): []);
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
    <div className="employee-directory">
      <div className="search-container">
        <EmployeeCreate handleCreateEmployee={handleCreateEmployee} />
        <div className="search-and-filter">
          <EmployeeSearch />
          <EmployeeFilter />
        </div>
      </div>
      <div className="table-container">
        <EmployeeTable employeeData={employeeData} onDelete={handleDeleteEmployee} />
      </div>
      <DialogModal isOpen={isModalOpen} onClose={closeModal} message={errorMessage} />
    </div>
  );
};

EmployeeDirectory.propTypes = {
  employees: PropTypes.array.isRequired,
  handleCreateEmployee: PropTypes.func.isRequired,
};

export default EmployeeDirectory;
