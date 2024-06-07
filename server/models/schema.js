import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
    first_name: String,
    last_name: String,
    email: String,
    phone: String,
    hire_date: Date,
    job_id: String,
    salary: Number,
    commission_pct: Number,
});

export const Employee = mongoose.model('Employee', EmployeeSchema);