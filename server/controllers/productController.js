const Product = require("../models/products.js");

const createProduct = async (req, res) => {
    try {
        const { category, name, description, price, quantity, unit } = req.body;

        if(!category || !name || price === undefined || quantity === undefined || !unit) {
            return res.status(400).json({
                success: false,
                message: "Category, name, price, quantity and unit are required",
            });
        }

        const product = await Product.create({
            farmer: req.user.id, 
            category,
            name,
            description,
            price,
            quantity,
            unit
        });

        return res.status(201).json({
            sucess: true,
            message: "Product created sucessfully",
            product,
        });
    }
    catch (error) {
        console.error("Create product error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to create product",
            error: error.message,
        });
    }
};

module.exports = { createProduct };