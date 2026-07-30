const Inventory = require("../models/inventoryModel");
const Film = require("../models/filmModel");
const Store = require("../models/storeModel");

// Add Inventory
const addInventory = async (req, res) => {
    try {

        const { filmId, storeId } = req.body;

        const film = await Film.findById(filmId);

        if (!film) {
            return res.status(404).json({
                success: false,
                message: "Film not found"
            });
        }

        const store = await Store.findById(storeId);

        if (!store) {
            return res.status(404).json({
                success: false,
                message: "Store not found"
            });
        }

        const inventory = await Inventory.create({
            filmId,
            storeId
        });

        return res.status(201).json({
            success: true,
            message: "Inventory added successfully",
            data: inventory
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Get All Inventories
const getAllInventories = async (req, res) => {
    try {

        const inventories = await Inventory.find()
            .populate("filmId")
            .populate({
                path: "storeId",
                populate: [
                    {
                        path: "managerStaffId",
                        select: "-password"
                    },
                    {
                        path: "addressId"
                    }
                ]
            });

        return res.status(200).json({
            success: true,
            total: inventories.length,
            data: inventories
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Get Single Inventory
const getSingleInventory = async (req, res) => {
    try {

        const inventory = await Inventory.findById(req.params.id)
            .populate("filmId")
            .populate({
                path: "storeId",
                populate: [
                    {
                        path: "managerStaffId",
                        select: "-password"
                    },
                    {
                        path: "addressId"
                    }
                ]
            });

        if (!inventory) {
            return res.status(404).json({
                success: false,
                message: "Inventory not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: inventory
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Update Inventory
const updateInventory = async (req, res) => {
    try {

        const { filmId, storeId } = req.body;

        if (filmId) {

            const film = await Film.findById(filmId);

            if (!film) {
                return res.status(404).json({
                    success: false,
                    message: "Film not found"
                });
            }

        }

        if (storeId) {

            const store = await Store.findById(storeId);

            if (!store) {
                return res.status(404).json({
                    success: false,
                    message: "Store not found"
                });
            }

        }

        const inventory = await Inventory.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        )
            .populate("filmId")
            .populate({
                path: "storeId",
                populate: [
                    {
                        path: "managerStaffId",
                        select: "-password"
                    },
                    {
                        path: "addressId"
                    }
                ]
            });

        if (!inventory) {
            return res.status(404).json({
                success: false,
                message: "Inventory not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Inventory updated successfully",
            data: inventory
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Delete Inventory
const deleteInventory = async (req, res) => {
    try {

        const inventory = await Inventory.findByIdAndDelete(req.params.id);

        if (!inventory) {
            return res.status(404).json({
                success: false,
                message: "Inventory not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Inventory deleted successfully"
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

module.exports = {
    addInventory,
    getAllInventories,
    getSingleInventory,
    updateInventory,
    deleteInventory
};