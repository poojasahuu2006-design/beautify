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

// Connect to MongoDB Atlas
let mongoUri = process.env.MONGO_URI || "mongodb+srv://poojasahuu2006_db_user:rpZBqIXLiIfqJSG3@cluster0.kpjsxdz.mongodb.net/beautifyDB?retryWrites=true&w=majority";
mongoUri = mongoUri.trim().replace(/^["']|["']$/g, '').trim();

mongoose.connect(mongoUri)
  .then(() => console.log('✅ MongoDB successfully connected to Beautify Database!'))
  .catch((err) => console.error('❌ MongoDB connection error:', err.message));

// Permissive and flexible CORS configuration
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://beautifybrand.netlify.app',
    'https://beautify-brand.netlify.app'
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (
            allowedOrigins.indexOf(origin) !== -1 ||
            origin.endsWith('.onrender.com') ||
            origin.endsWith('.netlify.app') ||
            origin.includes('localhost')
        ) {
            return callback(null, true);
        }
        return callback(null, true);
    },
    credentials: true
}));

app.use(express.json());

// Health Check for Render
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'ok',
        service: 'Beautify Full-Stack Backend API',
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    });
});

// Basic Home Route
app.get('/', (req, res) => {
    res.json({
        status: "success",
        name: "Beautify Backend API",
        health: "/health",
        message: "Your Beautify Backend Server is running successfully."
    });
});

// Status API
app.get('/api/status', (req, res) => {
    res.json({ 
        success: true, 
        message: "Your backend is perfectly connected and ready to send data!" 
    });
});

// 1. SIGNUP API
app.post('/api/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "Name, email, and password are required!" });
        }

        const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
        if (existingUser) return res.status(400).json({ success: false, message: "This email is already registered!" });

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = new User({ 
            name: name.trim(), 
            email: email.toLowerCase().trim(), 
            password: hashedPassword 
        });
        await newUser.save();

        res.status(201).json({ success: true, message: "Your account was created successfully!" });
    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ success: false, message: "A server error occurred during signup." });
    }
});

// 2. LOGIN API
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password are required!" });
        }

        const user = await User.findOne({ email: email.toLowerCase().trim() });
        if (!user) return res.status(404).json({ success: false, message: "Incorrect email. Account not found." });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ success: false, message: "Incorrect password." });

        res.json({ 
            success: true, 
            message: `Welcome back, ${user.name}!`, 
            user: { name: user.name, email: user.email } 
        });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ success: false, message: "A server error occurred during login." });
    }
});

// 3. GET USERS API
app.get('/api/users', async (req, res) => {
    try {
        const allUsers = await User.find({}, '-password');
        res.json(allUsers);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users" });
    }
});

// Start server on 0.0.0.0
app.listen(PORT, '0.0.0.0', () => {
    console.log(`> Backend Server is running on port ${PORT}`);
});
