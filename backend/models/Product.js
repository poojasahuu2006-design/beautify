const mongoose = require('mongoose');

// Ye schema define karta hai ki ek Product Database me kaisa dikhega
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    brand: { type: String, required: true, default: "Boutique" },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, default: "" }
}, { timestamps: true }); // timestamps true rakhne se kab item add/update hua, auto save hoga

module.exports = mongoose.model('Product', productSchema);
