const Farm = require("../models/farms");
const User = require("../models/users");
const Product = require("../models/products");

const getFarms = async (req, res) => {
    try {
        const farms = await Farm.find({ isActive: true }).populate("farmer", "name email phone profileImage");
        return res.status(200).json({ success: true, count: farms.length, farms });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Failed to fetch farms", error: error.message });
    }
};

const getFarmById = async (req, res) => {
    try {
        const farm = await Farm.findById(req.params.id).populate("farmer", "name email phone profileImage");
        if (!farm || !farm.isActive) {
            return res.status(404).json({ success: false, message: "Farm not found" });
        }
        const products = await Product.find({ farmer: farm.farmer._id, isActive: true }).populate("category", "name");
        return res.status(200).json({ success: true, farm, products });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Failed to fetch farm details", error: error.message });
    }
};

const getFarmByFarmerId = async (req, res) => {
    try {
        const farm = await Farm.findOne({ farmer: req.params.farmerId, isActive: true }).populate("farmer", "name email phone profileImage");
        if (!farm) {
            return res.status(404).json({ success: false, message: "Farm profile not found" });
        }
        const products = await Product.find({ farmer: farm.farmer._id, isActive: true }).populate("category", "name");
        return res.status(200).json({ success: true, farm, products });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Failed to fetch farm", error: error.message });
    }
};

const updateFarm = async (req, res) => {
    try {
        const { farmName, location, district, address, farmSize, farmType, contactNumber, description, image } = req.body;
        let farm = await Farm.findOne({ farmer: req.user._id });
        if (!farm) {
            farm = new Farm({ farmer: req.user._id, farmName: farmName || `${req.user.name}'s Farm`, location: location || "Nuwara Eliya", address: address || "Farm Address", contactNumber: contactNumber || req.user.phone || "0771234567" });
        }

        if (farmName) farm.farmName = farmName;
        if (location) farm.location = location;
        if (district) farm.district = district;
        if (address) farm.address = address;
        if (farmSize) farm.farmSize = Number(farmSize);
        if (farmType) farm.farmType = farmType;
        if (contactNumber) farm.contactNumber = contactNumber;
        if (description !== undefined) farm.description = description;
        if (image !== undefined) farm.image = image;

        await farm.save();
        return res.status(200).json({ success: true, message: "Farm profile updated successfully", farm });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Failed to update farm profile", error: error.message });
    }
};

module.exports = {
    getFarms,
    getFarmById,
    getFarmByFarmerId,
    updateFarm
};
