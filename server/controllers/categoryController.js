const Category = require("../models/categories");

const getCategories = async (req, res) => {
    try {
        const categories = await Category.find({ isActive: true }).sort({ name: 1 });
        return res.status(200).json({
            success: true,
            count: categories.length,
            categories
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Failed to fetch categories", error: error.message });
    }
};

const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category || !category.isActive) {
            return res.status(404).json({ success: false, message: "Category not found" });
        }
        return res.status(200).json({ success: true, category });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Failed to fetch category", error: error.message });
    }
};

const createCategory = async (req, res) => {
    try {
        const { name, description, image, slug } = req.body;
        if (!name) {
            return res.status(400).json({ success: false, message: "Category name is required" });
        }

        const categorySlug = slug || name.toLowerCase().replace(/[^a-z0-9]/g, '-');

        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            return res.status(400).json({ success: false, message: "Category already exists" });
        }

        const category = await Category.create({
            name,
            slug: categorySlug,
            description: description || "",
            image: image || ""
        });

        return res.status(201).json({
            success: true,
            message: "Category created successfully",
            category
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Failed to create category", error: error.message });
    }
};

const updateCategory = async (req, res) => {
    try {
        const { name, description, image, isActive } = req.body;
        const category = await Category.findById(req.params.id);

        if (!category) {
            return res.status(404).json({ success: false, message: "Category not found" });
        }

        if (name) category.name = name;
        if (description !== undefined) category.description = description;
        if (image !== undefined) category.image = image;
        if (isActive !== undefined) category.isActive = isActive;

        await category.save();

        return res.status(200).json({ success: true, message: "Category updated successfully", category });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Failed to update category", error: error.message });
    }
};

const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ success: false, message: "Category not found" });
        }
        category.isActive = false;
        await category.save();
        return res.status(200).json({ success: true, message: "Category deleted successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Failed to delete category", error: error.message });
    }
};

module.exports = {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
};
