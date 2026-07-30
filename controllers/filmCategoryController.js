const FilmCategory = require("../models/filmCategoryModel");
const Film = require("../models/filmModel");
const Category = require("../models/categoryModel");

// Add Film Category
const addFilmCategory = async (req, res) => {
    try {

        const { filmId, categoryId } = req.body;

        const film = await Film.findById(filmId);

        if (!film) {
            return res.status(404).json({
                success: false,
                message: "Film not found"
            });
        }

        const category = await Category.findById(categoryId);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }

        const existing = await FilmCategory.findOne({
            filmId,
            categoryId
        });

        if (existing) {
            return res.status(400).json({
                success: false,
                message: "Film Category already exists"
            });
        }

        const filmCategory = await FilmCategory.create({
            filmId,
            categoryId
        });

        return res.status(201).json({
            success: true,
            message: "Film Category added successfully",
            data: filmCategory
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Get All Film Categories
const getAllFilmCategories = async (req, res) => {
    try {

        const filmCategories = await FilmCategory.find()
            .populate("filmId")
            .populate("categoryId");

        return res.status(200).json({
            success: true,
            total: filmCategories.length,
            data: filmCategories
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Get Single Film Category
const getSingleFilmCategory = async (req, res) => {
    try {

        const filmCategory = await FilmCategory.findById(req.params.id)
            .populate("filmId")
            .populate("categoryId");

        if (!filmCategory) {
            return res.status(404).json({
                success: false,
                message: "Film Category not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: filmCategory
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Update Film Category
const updateFilmCategory = async (req, res) => {
    try {

        const filmCategory = await FilmCategory.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!filmCategory) {
            return res.status(404).json({
                success: false,
                message: "Film Category not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Film Category updated successfully",
            data: filmCategory
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Delete Film Category
const deleteFilmCategory = async (req, res) => {
    try {

        const filmCategory = await FilmCategory.findByIdAndDelete(req.params.id);

        if (!filmCategory) {
            return res.status(404).json({
                success: false,
                message: "Film Category not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Film Category deleted successfully"
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

module.exports = {
    addFilmCategory,
    getAllFilmCategories,
    getSingleFilmCategory,
    updateFilmCategory,
    deleteFilmCategory
};