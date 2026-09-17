const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    slug: {
        type: String,
        trim: true
    },

    description: {
        type: String,
        default: '',
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

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;