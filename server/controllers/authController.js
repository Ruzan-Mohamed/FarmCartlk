const User = require("../models/users.js");
const Farm = require("../models/farms.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
    const { name, email, password, role, phone, profileImage, farmName, location, district, address, farmSize, farmType } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "Name, email and password are required" });
    }

    if (password.length < 8) {
        return res.status(400).json({ message: "Password must be at least 8 characters" });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const userRole = role === "farmer" ? "farmer" : role === "admin" ? "admin" : "buyer";
        const isAdmin = userRole === "admin";

        const newUser = new User({
            name, 
            email,
            password: hashedPassword,
            role: userRole,
            phone: phone || "",
            profileImage: profileImage || "",
            isAdmin
        });

        await newUser.save();

        if (userRole === "farmer") {
            const newFarm = new Farm({
                farmer: newUser._id,
                farmName: farmName || `${name}'s Fresh Farm`,
                location: location || "Nuwara Eliya",
                district: district || "Nuwara Eliya",
                address: address || "Farm Address, Sri Lanka",
                farmSize: farmSize ? Number(farmSize) : 2,
                farmType: farmType || "Fresh Vegetables & Fruits",
                contactNumber: phone || "0771234567",
                description: `Fresh organic Sri Lankan produce grown with passion by ${name}.`
            });
            await newFarm.save();
        }

        const token = jwt.sign(
            { userId: newUser._id, role: newUser.role },
            process.env.JWT_SECRET || "farmcart_secret_key_2026",
            { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
        );

        return res.status(201).json({
            message: "User registered successfully",
            token,
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
                phone: newUser.phone,
                profileImage: newUser.profileImage,
                isAdmin: newUser.isAdmin
            }
        });

    } catch (error) {
        console.error("Register error:", error);
        return res.status(500).json({ message: "Server error during registration", error: error.message });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password are required"
        });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        if (!user.isActive) {
            return res.status(403).json({
                message: "Account is inactive"
            });
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            {
                userId: user._id,
                role: user.role
            },
            process.env.JWT_SECRET || "farmcart_secret_key_2026",
            {
                expiresIn: process.env.JWT_EXPIRES_IN || "7d"
            }
        );

        let farm = null;
        if (user.role === "farmer") {
            farm = await Farm.findOne({ farmer: user._id });
        }

        return res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                phone: user.phone,
                profileImage: user.profileImage,
                isAdmin: user.isAdmin,
                farm
            }
        });

    } catch (error) {
        console.error("Login error:", error);

        return res.status(500).json({
            message: "Server error during login",
            error: error.message
        });
    }
};

const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        let farm = null;
        if (user.role === "farmer") {
            farm = await Farm.findOne({ farmer: user._id });
        }

        return res.status(200).json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                phone: user.phone,
                profileImage: user.profileImage,
                isAdmin: user.isAdmin,
                isActive: user.isActive,
                farm
            }
        });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

const updateProfile = async (req, res) => {
    try {
        const { name, phone, profileImage, farmName, location, district, address, farmSize, description } = req.body;
        const user = await User.findById(req.user._id);
        if (!user) return res.status(404).json({ message: "User not found" });

        if (name) user.name = name;
        if (phone) user.phone = phone;
        if (profileImage !== undefined) user.profileImage = profileImage;

        await user.save();

        let farm = null;
        if (user.role === "farmer") {
            farm = await Farm.findOne({ farmer: user._id });
            if (farm) {
                if (farmName) farm.farmName = farmName;
                if (location) farm.location = location;
                if (district) farm.district = district;
                if (address) farm.address = address;
                if (farmSize) farm.farmSize = Number(farmSize);
                if (description) farm.description = description;
                await farm.save();
            }
        }

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                phone: user.phone,
                profileImage: user.profileImage,
                isAdmin: user.isAdmin,
                farm
            }
        });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = { register, login, getMe, updateProfile };