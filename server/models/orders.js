const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    totalAmount: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Pending'
    },

    deliveryAddress: {
        type: String,
        required: true,
        trim: true
    },

    paymentStatus: {
        type: String,
        enum: ['Pending', 'Paid'],
        default: 'Pending'
    },

    orderDate: {
        type: Date,
        default: Date.now
    }
},
{
    timestamps: true
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;