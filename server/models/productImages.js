const mongoose = require('mongoose');

const productImageSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },

    imageUrl: {
        type: String,
        required: true,
        trim: true
    },  

    isPrimary: {
        type: Boolean,
        default: false
    },

    displayOrder: {
        type: Number,
        default: 0
    },

    isActive: {
        type: Boolean,
        default: true
    }
}, 
{
    timestamps: true
});

const ProductImage = mongoose.model('ProductImage', productImageSchema);

module.exports = ProductImage;