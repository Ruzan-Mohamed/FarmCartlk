const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    farmer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
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

    address: {
        type: String,
        required: true,
        trim: true
    }, 

    farmSize: {
        type: Number,
        required: true
    },

    farmType: {
        type: String,
        required: true,
        trim: true
    },

    contactNumber: {
        type: String,
        required: true,
        trim: true
    },

    isActive: {
        type: Boolean,
        default: true
    }
}, 
{
    timestamps: true
});

const Farm = mongoose.model('Farm', categorySchema);

module.exports = Farm;