import React from 'react';
import EmployeeSearch from './EmployeeSearch';
import EmployeeTable from './EmployeeTable';
import EmployeeCreate from './EmployeeCreate';
import { useState, useEffect } from 'react';

async function fetchData() {

  const data = await fetch('http://localhost:3002/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `query {
        getEmployees {
          firstName
          lastName
          age
          dateOfJoining
          title
          department
          employeeType
          currentStatus
        }
      }` }),
  })

  const json = await data.json()
  return json.data.getEmployees

}

// async function createEmployeeAPI(employee) {
//   const data = await fetch('http://localhost:3001/graphql', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({
//       query: `mutation AddEmployee($input: InputEmployee!) {
//   addEmployee(employee: $input) {
//     firstName
//     lastName
//     age
//     dateOfJoining
//     title
//     department
//     employeeType
//     currentStatus
//   }
// }`,
//       variables: { input: employee }
//     }),

//   })

//   const json = await data.json()
//   return json.data.addEmployee

// }


// const createEmployeeAPI = async (employee) => {
//   const response = await fetch('http://localhost:3002/graphql', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({
//       query: `
//           mutation addEmployee(
//             $firstName: String!
//             $lastName: String!
//             $age: Int!
//             $dateOfJoining: Date!
//             $title: String!
//             $department: String!
//             $employeeType: String!
//             $currentStatus: Boolean!
//           ) {
//             addEmployee(
//               firstName: $firstName
//               lastName: $lastName
//               age: $age
//               dateOfJoining: $dateOfJoining
//               title: $title
//               department: $department
//               employeeType: $employeeType
//               currentStatus: $currentStatus
//             ) {
//               id
//               firstName
//               lastName
//               age
//               dateOfJoining
//               title
//               department
//               employeeType
//               currentStatus
//             }
//           }
//         `,
//       variables: employee,
//     }),
//   });
//   const json = await response.json();
//   return json.data.addEmployee;
// };


const createEmployeeAPI = async (employee) => {
  const response = await fetch('http://localhost:3002/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
        mutation addEmployee($input: InputEmployee!) {
          addEmployee(employee: $input) {
            firstName,
            lastName,
            age,
            dateOfJoining,
            title,
            department,
            employeeType,
            currentStatus
          }
        }
      `,
      variables: { input: employee }
    }),
  });

  const json = await response.json();
  return json.data.addEmployee;
};


const EmployeeDirectory = () => {

  const [employees, setEmployees] = useState([])

  const handleCreateEmployee = async (employee) => {
    employee = await createEmployeeAPI(employee)
    setEmployees([...employees, employee])
  }

  useEffect(() => {

    const wrap_function = async () => {
      const data = await fetchData()
      console.log("Fetching data...", data)
      setEmployees(data)
    }

    wrap_function()
  }, [])


  return (
    <div className="employee-directory">
      <div className="search-container">
        <EmployeeSearch />
      </div>
      <div className="table-container">
        <EmployeeTable employeeData={employees} />
      </div>
      <EmployeeCreate handleCreateEmployee={handleCreateEmployee} />
    </div>
  );
};

export default EmployeeDirectory;
