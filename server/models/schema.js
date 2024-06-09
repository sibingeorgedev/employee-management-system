import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
    firstName: String,
    lastName: String,
    age: Number,
    dateOfJoining: Date,
    title: String,
    department: String,
    employeeType: String,
    currentStatus: { type: Boolean, default: true }
});

export const Employee = mongoose.model('Employee', EmployeeSchema);