const mongoose = require('mongoose');

// Ye schema define karta hai ki ek User DB me kya kya values rakhega
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // unique matab ek email se 2 account nahi banenge
    password: { type: String, required: true },
    
    // Future me hum yaha user ka saved cart aur wishlist attach kar sakte hain!
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
