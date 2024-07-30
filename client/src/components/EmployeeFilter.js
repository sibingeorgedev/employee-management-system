import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Form } from 'react-bootstrap';

const EmployeeFilter = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const selectedFilter = searchParams.get("employeeType") || "";

  const handleChange = (event) => {
    const filterValue = event.target.value;
    navigate(`?employeeType=${filterValue}`);
  };

  return (
    <div className="employee-filter">
      <Form.Group controlId="filterSelect">
        <Form.Label>Filter by Employee Type</Form.Label>
        <Form.Control
          as="select"
          value={selectedFilter}
          onChange={handleChange}
        >
          <option value="">All Employees</option>
          <option value="FullTime">Full Time</option>
          <option value="PartTime">Part Time</option>
          <option value="Contract">Contract</option>
          <option value="Seasonal">Seasonal</option>
          <option value="UpComingRetirement">UpComing Retirement</option>
        </Form.Control>
      </Form.Group>
    </div>
  );
};

export default EmployeeFilter;
