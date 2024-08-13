import { } from "../../models/db.js";
import { Employee } from "../../models/schema.js";
import { GQLDate } from "./sacalars.js";
import { calculateRetirementDate, calculateDateDifference } from '../../utils/dateUtils.js';

const RETIREMENT_AGE = 65;

const calculateRetirementDetails = (employee) => {
    const today = new Date();
    const retirementDate = calculateRetirementDate(employee.dateOfBirth, employee.dateOfJoining, RETIREMENT_AGE);
    const timeUntilRetirement = calculateDa.
    teDifference(today, retirementDate);
    return { retirementDate, timeUntilRetirement };
};

export const resolvers = {
    Query: {
        getEmployees: async (_, { type }) => {
            const filter = type ? { employeeType: type } : {};
            const employees = await Employee.find(filter);
            return employees;
        },
        getEmployeeById: async (_, { employeeId }) => {
            const employee = await Employee.findOne({ employeeId });
            const { retirementDate, timeUntilRetirement } = calculateRetirementDetails(employee);
            return {
                ...employee.toObject(),
                retirementDate,
                timeUntilRetirement
            };
        },
        getUpcomingRetirementEmployees: async () => {
            const sixMonthsLater = new Date();
            sixMonthsLater.setMonth(sixMonthsLater.getMonth() + 6);

            const employees = await Employee.find();
            const upcomingRetirementEmployees = employees.filter(employee => {
                const retirementDate = calculateRetirementDate(employee.dateOfBirth, employee.dateOfJoining, RETIREMENT_AGE);
                // return retirementDate <= sixMonthsLater;
                return retirementDate >= today && retirementDate <= sixMonthsLater;
            });

            return upcomingRetirementEmployees.map(employee => {
                const { retirementDate, timeUntilRetirement } = calculateRetirementDetails(employee);
                return {
                    ...employee.toObject(),
                    retirementDate,
                    timeUntilRetirement
                };
            });
        }
    },
    Mutation: {
        addEmployee: async (_, { employee }) => {
            const createdEmployee = Employee.create(employee);
            return createdEmployee;
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

            const { retirementDate, timeUntilRetirement } = calculateRetirementDetails(updatedEmployee);
            return {
                ...updatedEmployee.toObject(),
                retirementDate,
                timeUntilRetirement
            };
        },
        deleteEmployee: async (_, { employeeId }) => {
            const result = await Employee.deleteOne({ employeeId });
            return result.deletedCount > 0;
        },
    },
    Date: GQLDate
};
