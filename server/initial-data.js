import { } from "./models/db.js";
import { Employee } from "./models/schema.js";

(async () => {

    const employees = [
        {
            "firstName": "John",
            "lastName": "Doe",
            "age": 30,
            "dateOfJoining": "2021-06-15T00:00:00.000Z",
            "title": "Software Engineer",
            "department": "Engineering",
            "employeeType": "Full-Time",
            "currentStatus": true
        },
        {
            "firstName": "Jane",
            "lastName": "Smith",
            "age": 28,
            "dateOfJoining": "2022-03-10T00:00:00.000Z",
            "title": "Project Manager",
            "department": "Management",
            "employeeType": "Part-Time",
            "currentStatus": true
        },
        {
            "firstName": "Emily",
            "lastName": "Jones",
            "age": 35,
            "dateOfJoining": "2019-11-05T00:00:00.000Z",
            "title": "HR Specialist",
            "department": "Human Resources",
            "employeeType": "Full-Time",
            "currentStatus": false
        }
    ];
    await Employee.create(employees);

    process.exit();
})();
