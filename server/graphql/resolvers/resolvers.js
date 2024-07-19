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
        getEmployeeById: async (_, { employeeId }) => {
            const employee = await Employee.findOne({ employeeId });
            return employee;
        },
    },
    Mutation: {
        addEmployee: async (_, { employee }) => {
            Employee.create(employee);
            return employee;
        },
        updateEmployee: async (_, { employeeId, title, department, currentStatus }) => {
            const updateFields = {};
            if (title) updateFields.title = title;
            if (department) updateFields.department = department;
            if (currentStatus !== undefined) updateFields.currentStatus = currentStatus;

            const updatedEmployee = await Employee.findOneAndUpdate(
                { employeeId },
                { $set: updateFields },
                { new: true }
            );
            return updatedEmployee;
        },
        deleteEmployee: async (_, { employeeId }) => {
            const result = await Employee.deleteOne({ employeeId });
            return result.deletedCount > 0;
        },
    },
    Date: GQLDate
};