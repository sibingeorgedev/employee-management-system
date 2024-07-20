import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import EmployeeDirectory from './components/EmployeeDirectory';
import EmployeeCreate from './components/EmployeeCreate';
import NavBar from "./components/NavBar";
import EmployeeDetails from './components/EmployeeDetails';

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate replace to="/employee" />} />
        <Route path="/employee">
          <Route index element={<EmployeeDirectory />} />
        </Route>
        <Route path="/create" element={<EmployeeCreate />} />
        <Route path="/employee/:employeeId" element={<EmployeeDetails />} />
      </Routes>
    </div>
  );
}

export default App;