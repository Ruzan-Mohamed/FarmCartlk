const mongoose = require("mongoose");

// Order item schema
const orderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    farmer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    unit: {
      type: String,
      default: "kg",
    },

    image: {
      type: String,
      default: "",
    },
  },
  {
    _id: false,
  }
);

// Order schema
const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
    },

    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: {
      type: [orderItemSchema],
      required: true,

      validate: {
        validator: function (items) {
          return items && items.length > 0;
        },

        message:
          "Order must contain at least one item",
      },
    },

    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    status: {
      type: String,

      enum: [
        "Pending",
        "Confirmed",
        "Processing",
        "Ready",
        "Completed",
        "Cancelled",
      ],

      default: "Pending",
    },

    paymentMethod: {
      type: String,

      enum: [
        "Cash on Delivery",
        "Direct Farm Pay",
      ],

      default: "Cash on Delivery",
    },

    paymentStatus: {
      type: String,

      enum: [
        "Pending",
        "Paid",
      ],

      default: "Pending",
    },

    orderDate: {
      type: Date,
      default: Date.now,
    },
  },

  {
    timestamps: true,
  }
);

const Order = mongoose.model(
  "Order",
  orderSchema
);

module.exports = Order;