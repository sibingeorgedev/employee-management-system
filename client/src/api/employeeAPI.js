const API_URL = 'http://localhost:3002/graphql';

export async function fetchEmployees(employeeType) {
  const query = employeeType
    ? `query {
        getEmployees(type: ${employeeType}) {
          employeeId
          firstName
          lastName
          age
          dateOfBirth
          dateOfJoining
          title
          department
          employeeType
          currentStatus
        }
      }`
    : `query {
        getEmployees {
          employeeId
          firstName
          lastName
          age
          dateOfBirth
          dateOfJoining
          title
          department
          employeeType
          currentStatus
        }
      }`;

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  });

  const json = await response.json();

  if (!Array.isArray(json.data.getEmployees)) {
    console.error('Unexpected data format', json);
    return [];
  }

  return json.data.getEmployees || [];
}

export const fetchEmployeeById = async (employeeId) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `query {
        getEmployeeById(employeeId: ${employeeId}) {
          firstName
          lastName
          age
          dateOfBirth
          dateOfJoining
          title
          department
          employeeType
          currentStatus
          retirementDate
          timeUntilRetirement {
            years
            months
            days
          }
        }
      }`,
    }),
  });
  const json = await response.json();
  return json.data.getEmployeeById;
};

export async function fetchUpcomingRetirementEmployees() {
  const query =
    `query {
        getUpcomingRetirementEmployees {
          employeeId
          firstName
          lastName
          age
          dateOfBirth
          dateOfJoining
          title
          department
          employeeType
          currentStatus
        }
      }`;

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  });

  const json = await response.json();

  if (!Array.isArray(json.data.getUpcomingRetirementEmployees)) {
    console.error('Unexpected data format', json);
    return [];
  }

  return json.data.getUpcomingRetirementEmployees || [];
}

export async function createEmployeeAPI(employee) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
        mutation addEmployee($input: InputEmployee!) {
          addEmployee(employee: $input) {
            employeeId,
            firstName,
            lastName,
            age,
            dateOfBirth,
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
}

export const updateEmployee = async (employeeId, formData) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
        mutation updateEmployee($employeeId: Int!, $title: Title, $department: Department, $currentStatus: Boolean) {
          updateEmployee(employeeId: $employeeId, title: $title, department: $department, currentStatus: $currentStatus) {
            employeeId
            firstName
            lastName
            title
            department
            currentStatus
          }
        }
      `,
      variables: {
        employeeId: parseInt(employeeId),
        ...formData,
        currentStatus: formData.currentStatus === 'true',
      },
    }),
  });
  const json = await response.json();
  return json.data.updateEmployee;
};

export async function deleteEmployeeAPI(employeeId) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
        mutation {
          deleteEmployee(employeeId: ${employeeId})
        }
      `,
    }),
  });

  const json = await response.json();
  return json.data.deleteEmployee;
}
