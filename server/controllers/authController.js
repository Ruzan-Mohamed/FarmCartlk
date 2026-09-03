const User = require("../models/users.js");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
    const {name, email, password, profileImage } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "Name, email and password are required" });
    }

    if (password.length < 8) {
        return res.status(400).json({ message: "Password must be at least 8 characters"});
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name, 
            email,
            password: hashedPassword,
            role: "buyer",
            profileImage
        });

        await newUser.save();
        return res.status(201).json({ message: "User registered successfully" });

    }
    catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
};

module.exports = { register };