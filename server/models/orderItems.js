const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },

    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },

    quantity: {
        type: Number,
        required: true,
        min: 1
    },

    unitPrice: {
        type: Number,
        required: true,
        min: 0
    },

    totalPrice: {
        type: Number,
        required: true,
        min: 0
    }
});

const OrderItem = mongoose.model('OrderItem', categorySchema);

module.exports = OrderItem;