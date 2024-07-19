import React from 'react';
import { Route, Routes } from 'react-router-dom';
import EmployeeDirectory from './components/EmployeeDirectory';
import EmployeeCreate from './components/EmployeeCreate';
import NavBar from "./components/NavBar";

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<EmployeeDirectory />} />
        <Route path="/create" element={<EmployeeCreate />} />
      </Routes>
    </div>
  );
}

export default App;