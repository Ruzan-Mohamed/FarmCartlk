const jwt = require("jsonwebtoken");
const User = require("../models/users.js");

const farmerOnly = (req, res, next) => {
    if (req.user.role !== "farmer") {
        return res.status(403).json({
            message: "Access denied. Farmers only."
        });
    }

    next();
};

const adminOnly = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({
            message: "Access denied. Admins only."
        });
    }

    next();
};

module.exports = { farmerOnly, adminOnly };
