const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    farmer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }, 

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },

    name: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        trim: true
    },

    price: {
        type: Number,
        required: true
    },

    quantity: {
        type: Number,
        required: true
    },

    unit: {
        type: String,
        required: true,
        trim: true,
        default: 'kg'
    },

    images: [{
        type: String
    }],

    image: {
        type: String,
        default: ''
    },

    location: {
        type: String,
        default: 'Sri Lanka'
    },

    isOrganic: {
        type: Boolean,
        default: false
    },

    harvestDate: {
        type: String,
        default: 'Fresh Harvest'
    },

  

    isAvailable: {
        type: Boolean,
        default: true
    },

    isActive: {
        type: Boolean,
        default: true
    }
}, 
{
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
