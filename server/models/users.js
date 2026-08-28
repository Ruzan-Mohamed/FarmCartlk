const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true
    },

    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8
    },

    role: {
        type: String,
        enum: ["buyer","farmer","admin"],
        default: "buyer"
    },

    phone: {
        type: String,
        trim: true
    },

    profileImage: {
        type: String,
        default: ""
    },

    address: {
        type: String,
        trim: true
    },

    isActive: {
        type: Boolean,
        default: true
    }
},
    {
        timestamps: true
    }
);

const User = mongoose.model("User", userSchema);

module.exports = User;