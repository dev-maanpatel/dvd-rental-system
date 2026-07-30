const Rental = require("../models/rentalModel");
const Inventory = require("../models/inventoryModel");
const Customer = require("../models/customerModel");
const Staff = require("../models/staffModel");

// Add Rental
const addRental = async (req, res) => {
    try {

        const {
            rentalDate,
            inventoryId,
            customerId,
            returnDate,
            staffId
        } = req.body;

        const inventory = await Inventory.findById(inventoryId);

        if (!inventory) {
            return res.status(404).json({
                success: false,
                message: "Inventory not found"
            });
        }

        const customer = await Customer.findById(customerId);

        if (!customer) {
            return res.status(404).json({
                success: false,
                message: "Customer not found"
            });
        }

        const staff = await Staff.findById(staffId);

        if (!staff) {
            return res.status(404).json({
                success: false,
                message: "Staff not found"
            });
        }

        const rental = await Rental.create({
            rentalDate,
            inventoryId,
            customerId,
            returnDate,
            staffId
        });

        return res.status(201).json({
            success: true,
            message: "Rental added successfully",
            data: rental
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Get All Rentals
const getAllRentals = async (req, res) => {
    try {

        const rentals = await Rental.find()
            .populate({
                path: "inventoryId",
                populate: [
                    {
                        path: "filmId"
                    },
                    {
                        path: "storeId"
                    }
                ]
            })
            .populate("customerId")
            .populate("staffId", "-password");

        return res.status(200).json({
            success: true,
            total: rentals.length,
            data: rentals
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Get Single Rental
const getSingleRental = async (req, res) => {
    try {

        const rental = await Rental.findById(req.params.id)
            .populate({
                path: "inventoryId",
                populate: [
                    {
                        path: "filmId"
                    },
                    {
                        path: "storeId"
                    }
                ]
            })
            .populate("customerId")
            .populate("staffId", "-password");

        if (!rental) {
            return res.status(404).json({
                success: false,
                message: "Rental not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: rental
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Update Rental
const updateRental = async (req, res) => {
    try {

        const rental = await Rental.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        )
            .populate({
                path: "inventoryId",
                populate: [
                    {
                        path: "filmId"
                    },
                    {
                        path: "storeId"
                    }
                ]
            })
            .populate("customerId")
            .populate("staffId", "-password");

        if (!rental) {
            return res.status(404).json({
                success: false,
                message: "Rental not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Rental updated successfully",
            data: rental
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Delete Rental
const deleteRental = async (req, res) => {
    try {

        const rental = await Rental.findByIdAndDelete(req.params.id);

        if (!rental) {
            return res.status(404).json({
                success: false,
                message: "Rental not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Rental deleted successfully"
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

module.exports = {
    addRental,
    getAllRentals,
    getSingleRental,
    updateRental,
    deleteRental
};