const City = require("../models/cityModel");
const Country = require("../models/countryModel");

// Add City
const addCity = async (req, res) => {
    try {
        const { cityName, countryId } = req.body;

        const country = await Country.findById(countryId);

        if (!country) {
            return res.status(404).json({
                success: false,
                message: "Country not found"
            });
        }

        const existingCity = await City.findOne({
            cityName,
            countryId
        });

        if (existingCity) {
            return res.status(400).json({
                success: false,
                message: "City already exists in this country"
            });
        }

        const city = await City.create({
            cityName,
            countryId
        });

        return res.status(201).json({
            success: true,
            message: "City added successfully",
            data: city
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get All Cities
const getAllCities = async (req, res) => {
    try {

        const cities = await City.find().populate(
            "countryId",
            "countryName"
        );

        return res.status(200).json({
            success: true,
            total: cities.length,
            data: cities
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get Single City
const getSingleCity = async (req, res) => {
    try {

        const city = await City.findById(req.params.id).populate(
            "countryId",
            "countryName"
        );

        if (!city) {
            return res.status(404).json({
                success: false,
                message: "City not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: city
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Update City
const updateCity = async (req, res) => {
    try {

        const { cityName, countryId } = req.body;

        const country = await Country.findById(countryId);

        if (!country) {
            return res.status(404).json({
                success: false,
                message: "Country not found"
            });
        }

        const city = await City.findByIdAndUpdate(
            req.params.id,
            {
                cityName,
                countryId
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!city) {
            return res.status(404).json({
                success: false,
                message: "City not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "City updated successfully",
            data: city
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Delete City
const deleteCity = async (req, res) => {
    try {

        const city = await City.findByIdAndDelete(req.params.id);

        if (!city) {
            return res.status(404).json({
                success: false,
                message: "City not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "City deleted successfully"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    addCity,
    getAllCities,
    getSingleCity,
    updateCity,
    deleteCity
};