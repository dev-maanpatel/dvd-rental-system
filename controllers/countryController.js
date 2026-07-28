const Country = require("../models/countryModel");

// Add Country
const addCountry = async (req, res) => {
    try {
        const { countryName } = req.body;

        const existingCountry = await Country.findOne({
            countryName: countryName.trim()
        });

        if (existingCountry) {
            return res.status(400).json({
                success: false,
                message: "Country already exists"
            });
        }

        const country = await Country.create({
            countryName: countryName.trim()
        });

        return res.status(201).json({
            success: true,
            message: "Country added successfully",
            data: country
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get All Countries
const getAllCountries = async (req, res) => {
    try {
        const countries = await Country.find();

        return res.status(200).json({
            success: true,
            total: countries.length,
            data: countries
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get Single Country
const getSingleCountry = async (req, res) => {
    try {
        const country = await Country.findById(req.params.id);

        if (!country) {
            return res.status(404).json({
                success: false,
                message: "Country not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: country
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Update Country
const updateCountry = async (req, res) => {
    try {
        const country = await Country.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!country) {
            return res.status(404).json({
                success: false,
                message: "Country not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Country updated successfully",
            data: country
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Delete Country
const deleteCountry = async (req, res) => {
    try {
        const country = await Country.findByIdAndDelete(req.params.id);

        if (!country) {
            return res.status(404).json({
                success: false,
                message: "Country not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Country deleted successfully"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    addCountry,
    getAllCountries,
    getSingleCountry,
    updateCountry,
    deleteCountry
};