const Store = require("../models/storeModel");
const Staff = require("../models/staffModel");
const Address = require("../models/addressModel");

// Add Store
const addStore = async (req, res) => {
    try {

        const { managerStaffId, addressId } = req.body;

        const staff = await Staff.findById(managerStaffId);

        if (!staff) {
            return res.status(404).json({
                success: false,
                message: "Staff not found"
            });
        }

        const address = await Address.findById(addressId);

        if (!address) {
            return res.status(404).json({
                success: false,
                message: "Address not found"
            });
        }

        const store = await Store.create({
            managerStaffId,
            addressId
        });

        return res.status(201).json({
            success: true,
            message: "Store added successfully",
            data: store
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Get All Stores
const getAllStores = async (req, res) => {
    try {

        const stores = await Store.find()
            .populate("managerStaffId", "-password")
            .populate("addressId");

        return res.status(200).json({
            success: true,
            total: stores.length,
            data: stores
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Get Single Store
const getSingleStore = async (req, res) => {
    try {

        const store = await Store.findById(req.params.id)
            .populate("managerStaffId", "-password")
            .populate("addressId");

        if (!store) {
            return res.status(404).json({
                success: false,
                message: "Store not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: store
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Update Store
const updateStore = async (req, res) => {
    try {

        const { managerStaffId, addressId } = req.body;

        if (managerStaffId) {

            const staff = await Staff.findById(managerStaffId);

            if (!staff) {
                return res.status(404).json({
                    success: false,
                    message: "Staff not found"
                });
            }

        }

        if (addressId) {

            const address = await Address.findById(addressId);

            if (!address) {
                return res.status(404).json({
                    success: false,
                    message: "Address not found"
                });
            }

        }

        const store = await Store.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        )
            .populate("managerStaffId", "-password")
            .populate("addressId");

        if (!store) {
            return res.status(404).json({
                success: false,
                message: "Store not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Store updated successfully",
            data: store
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Delete Store
const deleteStore = async (req, res) => {
    try {

        const store = await Store.findByIdAndDelete(req.params.id);

        if (!store) {
            return res.status(404).json({
                success: false,
                message: "Store not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Store deleted successfully"
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

module.exports = {
    addStore,
    getAllStores,
    getSingleStore,
    updateStore,
    deleteStore
};