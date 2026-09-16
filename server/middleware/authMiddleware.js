const jwt = require("jsonwebtoken");
const User = require("../models/users.js");

const protect = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Not authorized, no token"
            });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify( token, process.env.JWT_SECRET );

        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(401).json({
                message: "User not found"
            });
        }

        if (!user.isActive) {
            return res.status(403).json({
                message: "Account is inactive"
            });
        }

        req.user = user;

        next();

    } catch (error) {
        console.error("Authentication error:", error);

        return res.status(401).json({
            message: "Not authorized, invalid token"
        });
    }
};

module.exports = { protect };