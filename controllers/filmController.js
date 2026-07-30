const Film = require("../models/filmModel");
const Language = require("../models/languageModel");

// Add Film
const addFilm = async (req, res) => {
    try {

        const { title, releaseYear, languageId, rating } = req.body;

        const language = await Language.findById(languageId);

        if (!language) {
            return res.status(404).json({
                success: false,
                message: "Language not found"
            });
        }

        const existingFilm = await Film.findOne({
            title: title.trim()
        });

        if (existingFilm) {
            return res.status(400).json({
                success: false,
                message: "Film already exists"
            });
        }

        const film = await Film.create({
            title: title.trim(),
            releaseYear,
            languageId,
            rating
        });

        return res.status(201).json({
            success: true,
            message: "Film added successfully",
            data: film
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Get All Films
const getAllFilms = async (req, res) => {
    try {

        const films = await Film.find().populate("languageId");

        return res.status(200).json({
            success: true,
            total: films.length,
            data: films
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Get Single Film
const getSingleFilm = async (req, res) => {
    try {

        const film = await Film.findById(req.params.id).populate("languageId");

        if (!film) {
            return res.status(404).json({
                success: false,
                message: "Film not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: film
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Update Film
const updateFilm = async (req, res) => {
    try {

        const film = await Film.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!film) {
            return res.status(404).json({
                success: false,
                message: "Film not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Film updated successfully",
            data: film
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Delete Film
const deleteFilm = async (req, res) => {
    try {

        const film = await Film.findByIdAndDelete(req.params.id);

        if (!film) {
            return res.status(404).json({
                success: false,
                message: "Film not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Film deleted successfully"
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

module.exports = {
    addFilm,
    getAllFilms,
    getSingleFilm,
    updateFilm,
    deleteFilm
};