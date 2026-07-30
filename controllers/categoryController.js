const Category = require("../models/categoryModel");

// Add Category
const addCategory = async (req, res) => {
    try {

        const { categoryName } = req.body;

        const existingCategory = await Category.findOne({
            categoryName: categoryName.trim()
        });

        if (existingCategory) {
            return res.status(400).json({
                success: false,
                message: "Category already exists"
            });
        }

        const category = await Category.create({
            categoryName: categoryName.trim()
        });

        return res.status(201).json({
            success: true,
            message: "Category added successfully",
            data: category
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Get All Categories
const getAllCategories = async (req, res) => {
    try {

        const categories = await Category.find();

        return res.status(200).json({
            success: true,
            total: categories.length,
            data: categories
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Get Single Category
const getSingleCategory = async (req, res) => {
    try {

        const category = await Category.findById(req.params.id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: category
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Update Category
const updateCategory = async (req, res) => {
    try {

        const category = await Category.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Category updated successfully",
            data: category
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Delete Category
const deleteCategory = async (req, res) => {
    try {

        const category = await Category.findByIdAndDelete(req.params.id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Category deleted successfully"
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

module.exports = {
    addCategory,
    getAllCategories,
    getSingleCategory,
    updateCategory,
    deleteCategory
};