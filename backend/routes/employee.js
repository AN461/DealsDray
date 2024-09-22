
const express = require('express');
const router = express.Router();
const Employee=require('../models/employee');
const auth = require('../middleware/auth');

// Create Employee
router.post('/',auth,async (req, res) => {
    const { name, email, mobile, designation, gender, courses, image } = req.body;
    console.log(req.body);
    const newEmployee = new Employee({ name, email, mobile, designation, gender, courses, image });
    await newEmployee.save();
    res.status(201).json({ message: 'Employee created successfully' });
});

// Get All Employees
router.get('/', async (req, res) => {
    const employees = await Employee.find();
    res.json(employees);
});

module.exports = router;
