const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, unique: true },
    phone: { type: Number }
});

module.exports = mongoose.model("emp_details", employeeSchema);