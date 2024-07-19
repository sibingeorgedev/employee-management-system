import mongoose from 'mongoose';
import AutoIncrementFactory from 'mongoose-sequence'; // Import the default export

const AutoIncrement = AutoIncrementFactory(mongoose); 
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

EmployeeSchema.plugin(AutoIncrement, { inc_field: 'employeeId' });

export const Employee = mongoose.model('Employee', EmployeeSchema);