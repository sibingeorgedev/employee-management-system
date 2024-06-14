
import { } from "../../models/db.js";
import { Employee } from "../../models/schema.js";
import { GQLDate } from "./sacalars.js";


export const resolvers = {
    Query: {
        getEmployees: async () =>{
            const employees = await Employee.find({});
            return employees;
        } 
    },
    Mutation: {
        addEmployee: async (_, {employee}) => {
        //   try {
        //     const newEmployee = new Employee(args);
        //     return await newEmployee.save();
        //   } catch (error) {
        //     console.error('Error adding employee:', error);
        //     throw new Error('Error adding employee');
        //   }

             Employee.create(employee);
             return employee;
        },
      },
    Date: GQLDate
};