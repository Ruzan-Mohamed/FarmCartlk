const mongoose = require('mongoose');

const farmSchema = new mongoose.Schema({
    farmer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },

    farmName: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        trim: true
    },

    location: {
        type: String,
        required: true,
        trim: true
    },

    district: {
        type: String,
        default: 'Nuwara Eliya',
        trim: true
    },

    address: {
        type: String,
        required: true,
        trim: true
    }, 

    farmSize: {
        type: Number,
        default: 1
    },

    farmType: {
        type: String,
        default: 'Vegetables & Fruits',
        trim: true
    },

    contactNumber: {
        type: String,
        required: true,
        trim: true
    },

    image: {
        type: String,
        default: ''
    },

    isActive: {
        type: Boolean,
        default: true
    }
}, 
{
    timestamps: true
});

const Farm = mongoose.model('Farm', farmSchema);

module.exports = Farm;