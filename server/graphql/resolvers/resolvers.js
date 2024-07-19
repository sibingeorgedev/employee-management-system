import { } from "../../models/db.js";
import { Employee } from "../../models/schema.js";
import { GQLDate } from "./sacalars.js";


export const resolvers = {
    Query: {
        getEmployees: async (_, { type }) => {
            const filter = type ? { employeeType: type } : {};
            const employees = await Employee.find(filter);
            return employees;
        },
    },
    Mutation: {
        addEmployee: async (_, { employee }) => {
            Employee.create(employee);
            return employee;
        },
    },
    Date: GQLDate
};