const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    designation: { type: String, required: true },
    gender: { type: String, required: true },
    courses: { type: [String], required: true },
    // image: { type: String }, // Store path or URL of the image
    createdAt: { type: Date, default: Date.now },
});

const Employee = mongoose.model('Employee', EmployeeSchema);
module.exports=Employee