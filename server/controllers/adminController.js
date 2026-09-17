const User = require("../models/users");
const Product = require("../models/products");
const Category = require("../models/categories");
const Order = require("../models/orders");
const Farm = require("../models/farms");

const getAdminStats = async (res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalFarmers = await User.countDocuments({ role: "farmer" });
        const totalBuyers = await User.countDocuments({ role: "buyer" });
        const totalProducts = await Product.countDocuments({ isActive: true });
        const totalCategories = await Category.countDocuments({ isActive: true });
        const totalOrders = await Order.countDocuments();

        const orders = await Order.find();
        const totalRevenue = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);

        const recentOrders = await Order.find()
            .populate("buyer", "name email")
            .sort({ createdAt: -1 })
            .limit(5);

        const recentFarmers = await Farm.find()
            .populate("farmer", "name email phone")
            .sort({ createdAt: -1 })
            .limit(5);

        return res.status(200).json({
            success: true,
            stats: {
                totalUsers,
                totalFarmers,
                totalBuyers,
                totalProducts,
                totalCategories,
                totalOrders,
                totalRevenue
            },
            recentOrders,
            recentFarmers
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Failed to fetch admin stats", error: error.message });
    }
};

const getUsers = async (req, res) => {
    try {
        const { role, search } = req.query;
        let query = {};
        if (role) query.role = role;
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } }
            ];
        }

        const users = await User.find(query).select("-password").sort({ createdAt: -1 });
        return res.status(200).json({ success: true, count: users.length, users });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Failed to fetch users", error: error.message });
    }
};

const toggleUserStatus = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        if (user._id.toString() === req.user._id.toString()) {
            return res.status(400).json({ success: false, message: "You cannot deactivate your own admin account" });
        }

        user.isActive = !user.isActive;
        await user.save();

        return res.status(200).json({
            success: true,
            message: `User account ${user.isActive ? "activated" : "deactivated"} successfully`,
            user: { id: user._id, name: user.name, email: user.email, role: user.role, isActive: user.isActive }
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Failed to toggle user status", error: error.message });
    }
};

module.exports = {
    getAdminStats,
    getUsers,
    toggleUserStatus
};
