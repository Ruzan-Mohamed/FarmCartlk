const Product = require("../models/products.js");
const Category = require("../models/categories.js");
const Farm = require("../models/farms.js");

const getProducts = async (req, res) => {
    try {
        const { category, search, minPrice, maxPrice, organic, sort, page = 1, limit = 20 } = req.query;

        let query = { isActive: true };

        if (category) {
            query.category = category;
        }

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } },
                { location: { $regex: search, $options: "i" } }
            ];
        }

        if (minPrice !== undefined || maxPrice !== undefined) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        if (organic === 'true') {
            query.isOrganic = true;
        }

        let sortOption = { createdAt: -1 };
        if (sort === "price-low") sortOption = { price: 1 };
        if (sort === "price-high") sortOption = { price: -1 };
        if (sort === "name") sortOption = { name: 1 };

        const skip = (Number(page) - 1) * Number(limit);

        const products = await Product.find(query)
            .populate("farmer", "name email phone profileImage")
            .populate("category", "name slug")
            .sort(sortOption)
            .skip(skip)
            .limit(Number(limit));

        const total = await Product.countDocuments(query);

        return res.status(200).json({
            success: true,
            count: products.length,
            total,
            page: Number(page),
            pages: Math.ceil(total / Number(limit)),
            products
        });
    } catch (error) {
        console.error("Get products error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch products",
            error: error.message
        });
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
            .populate("farmer", "name email phone profileImage")
            .populate("category", "name slug description");

        if (!product || !product.isActive) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        const farm = await Farm.findOne({ farmer: product.farmer._id });

        return res.status(200).json({
            success: true,
            product,
            farm
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch product details",
            error: error.message
        });
    }
};

const getFarmerProducts = async (req, res) => {
    try {
        const farmerId = req.params.farmerId || req.user._id;
        const products = await Product.find({ farmer: farmerId, isActive: true })
            .populate("category", "name")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: products.length,
            products
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch farmer products",
            error: error.message
        });
    }
};

const createProduct = async (req, res) => {
    try {
        const { category, name, description, price, quantity, unit, image, images, location, isOrganic, harvestDate } = req.body;

        if (!category || !name || price === undefined || quantity === undefined) {
            return res.status(400).json({
                success: false,
                message: "Category, name, price, and quantity are required",
            });
        }

        const farmerUser = req.user;
        const farmerFarm = await Farm.findOne({ farmer: farmerUser._id });

        const product = await Product.create({
            farmer: farmerUser._id, 
            category,
            name,
            description: description || "",
            price: Number(price),
            quantity: Number(quantity),
            unit: unit || "kg",
            image: image || (images && images.length ? images[0] : ""),
            images: images || (image ? [image] : []),
            location: location || (farmerFarm ? farmerFarm.location : "Nuwara Eliya"),
            isOrganic: Boolean(isOrganic),
            harvestDate: harvestDate || "Fresh Harvest",
            isAvailable: Number(quantity) > 0
        });

        const populatedProduct = await Product.findById(product._id)
            .populate("category", "name")
            .populate("farmer", "name");

        return res.status(201).json({
            success: true,
            message: "Product created successfully",
            product: populatedProduct,
        });
    } catch (error) {
        console.error("Create product error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to create product",
            error: error.message,
        });
    }
};

const updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        if (product.farmer.toString() !== req.user._id.toString() && req.user.role !== "admin") {
            return res.status(403).json({ success: false, message: "Unauthorized to update this product" });
        }

        const { category, name, description, price, quantity, unit, image, images, location, isOrganic, isAvailable } = req.body;

        if (name !== undefined) product.name = name;
        if (category !== undefined) product.category = category;
        if (description !== undefined) product.description = description;
        if (price !== undefined) product.price = Number(price);
        if (quantity !== undefined) {
            product.quantity = Number(quantity);
            product.isAvailable = Number(quantity) > 0;
        }
        if (unit !== undefined) product.unit = unit;
        if (image !== undefined) product.image = image;
        if (images !== undefined) product.images = images;
        if (location !== undefined) product.location = location;
        if (isOrganic !== undefined) product.isOrganic = Boolean(isOrganic);
        if (isAvailable !== undefined) product.isAvailable = Boolean(isAvailable);

        await product.save();

        const updatedProduct = await Product.findById(product._id)
            .populate("category", "name")
            .populate("farmer", "name");

        return res.status(200).json({
            success: true,
            message: "Product updated successfully",
            product: updatedProduct
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Failed to update product", error: error.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        if (product.farmer.toString() !== req.user._id.toString() && req.user.role !== "admin") {
            return res.status(403).json({ success: false, message: "Unauthorized to delete this product" });
        }

        product.isActive = false;
        await product.save();

        return res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Failed to delete product", error: error.message });
    }
};

module.exports = {
    getProducts,
    getProductById,
    getFarmerProducts,
    createProduct,
    updateProduct,
    deleteProduct
};