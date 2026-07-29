const Address = require("../models/addressModel");
const City = require("../models/cityModel");

// Add Address
const addAddress = async (req, res) => {
    try {

        const {
            address,
            address2,
            district,
            cityId,
            postalCode,
            phone
        } = req.body;

        const city = await City.findById(cityId);

        if (!city) {
            return res.status(404).json({
                success: false,
                message: "City not found"
            });
        }

        const newAddress = await Address.create({
            address,
            address2,
            district,
            cityId,
            postalCode,
            phone
        });

        return res.status(201).json({
            success: true,
            message: "Address added successfully",
            data: newAddress
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Get All Address
const getAllAddresses = async (req, res) => {
    try {

        const addresses = await Address.find()
            .populate("cityId", "cityName");

        return res.status(200).json({
            success: true,
            total: addresses.length,
            data: addresses
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Get Single Address
const getSingleAddress = async (req, res) => {
    try {

        const address = await Address.findById(req.params.id)
            .populate("cityId", "cityName");

        if (!address) {
            return res.status(404).json({
                success: false,
                message: "Address not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: address
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Update Address
const updateAddress = async (req, res) => {
    try {

        const {
            address,
            address2,
            district,
            cityId,
            postalCode,
            phone
        } = req.body;

        const city = await City.findById(cityId);

        if (!city) {
            return res.status(404).json({
                success: false,
                message: "City not found"
            });
        }

        const updatedAddress = await Address.findByIdAndUpdate(
            req.params.id,
            {
                address,
                address2,
                district,
                cityId,
                postalCode,
                phone
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedAddress) {
            return res.status(404).json({
                success: false,
                message: "Address not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Address updated successfully",
            data: updatedAddress
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Delete Address
const deleteAddress = async (req, res) => {
    try {

        const deletedAddress = await Address.findByIdAndDelete(req.params.id);

        if (!deletedAddress) {
            return res.status(404).json({
                success: false,
                message: "Address not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Address deleted successfully"
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

module.exports = {
    addAddress,
    getAllAddresses,
    getSingleAddress,
    updateAddress,
    deleteAddress
};