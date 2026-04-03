const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Local MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB successfully connected! (Database created instantly)'))
  .catch((err) => console.log('❌ MongoDB connection error:', err));

// Middleware
// cors() allows the React frontend on localhost:5173 to speak to this server on localhost:5000
app.use(cors()); 
app.use(express.json());

// Basic Home Route (To verify server is running)
app.get('/', (req, res) => {
    res.send("Hello Pooja! Your Beautify Backend Server is running successfully.");
});

// A basic API endpoint
app.get('/api/status', (req, res) => {
    res.json({ 
        success: true, 
        message: "Your backend is perfectly connected and ready to send data!" 
    });
});

// 👉 1. SIGNUP API (Naya Account Banane Ke Liye)
app.post('/api/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ success: false, message: "This email is already registered!" });

        // Password encryption
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Save new user
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        res.json({ success: true, message: "Your account was created successfully!" });
    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ success: false, message: "A server error occurred during signup." });
    }
});

// 👉 2. LOGIN API (Log In Karne Ke Liye)
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ success: false, message: "Incorrect email. Account not found." });

        // Check password matching
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ success: false, message: "Incorrect password." });

        res.json({ success: true, message: `Welcome back, ${user.name}!`, user: { name: user.name, email: user.email } });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ success: false, message: "A server error occurred during login." });
    }
});

// 👉 3. DEKHNE KE LIYE API (Test karne ke liye ki data ka udhar kaisa dikhta hai)
app.get('/api/users', async (req, res) => {
    try {
        const allUsers = await User.find({});
        res.json(allUsers);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users" });
    }
});

// Start the server listening for requests
app.listen(PORT, () => {
    console.log(`> Backend Server is blazing fast and running on http://localhost:${PORT}`);
});
