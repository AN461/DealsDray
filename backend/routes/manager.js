const mongoose = require('mongoose');
const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const Manager=require('../models/manager')



// Register
router.post('/register', async (req, res) => {
    const { username, password, email } = req.body;
    try {
        // Check if user already exists by username or email
        const existingUser = await Manager.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password before saving it to the database
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new Manager({ username, password: hashedPassword, email });
        
        // Save the new user to the database
        await newUser.save();
        
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error); // Log the error for debugging purposes
        res.status(500).json({ message: 'Server error' });
    }
});


// Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await Manager.findOne({ username });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        res.json({ message: 'Login successful', userId: user._id });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
