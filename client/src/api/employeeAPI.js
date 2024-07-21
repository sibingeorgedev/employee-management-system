export async function createEmployeeAPI(employee) {
    const response = await fetch('http://localhost:3002/graphql', {
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

export async function fetchEmployees(employeeType) {
    const query = employeeType
        ? `query {
          getEmployees(type: ${employeeType}) {
            employeeId
            firstName
            lastName
            age
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
            dateOfJoining
            title
            department
            employeeType
            currentStatus
          }
        }`;

    const response = await fetch('http://localhost:3002/graphql', {
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
};

export async function deleteEmployeeAPI(employeeId) {
    const response = await fetch('http://localhost:3002/graphql', {
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
};
