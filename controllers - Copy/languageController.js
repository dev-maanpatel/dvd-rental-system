const Language = require("../models/languageModel");

// Add Language
const addLanguage = async (req, res) => {
    try {

        const { languageName } = req.body;

        const existingLanguage = await Language.findOne({
            languageName
        });

        if (existingLanguage) {
            return res.status(400).json({
                success: false,
                message: "Language already exists"
            });
        }

        const language = await Language.create({
            languageName
        });

        return res.status(201).json({
            success: true,
            message: "Language added successfully",
            data: language
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Get All Languages
const getAllLanguages = async (req, res) => {
    try {

        const languages = await Language.find();

        return res.status(200).json({
            success: true,
            total: languages.length,
            data: languages
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Get Single Language
const getSingleLanguage = async (req, res) => {
    try {

        const language = await Language.findById(req.params.id);

        if (!language) {
            return res.status(404).json({
                success: false,
                message: "Language not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: language
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Update Language
const updateLanguage = async (req, res) => {
    try {

        const language = await Language.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!language) {
            return res.status(404).json({
                success: false,
                message: "Language not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Language updated successfully",
            data: language
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Delete Language
const deleteLanguage = async (req, res) => {
    try {

        const language = await Language.findByIdAndDelete(req.params.id);

        if (!language) {
            return res.status(404).json({
                success: false,
                message: "Language not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Language deleted successfully"
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

module.exports = {
    addLanguage,
    getAllLanguages,
    getSingleLanguage,
    updateLanguage,
    deleteLanguage
};