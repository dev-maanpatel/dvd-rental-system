const Customer = require("../models/customerModel");
const Store = require("../models/storeModel");
const Address = require("../models/addressModel");

// Add Customer
const addCustomer = async (req, res) => {
    try {

        const {
            storeId,
            firstName,
            lastName,
            email,
            addressId,
            active
        } = req.body;

        const store = await Store.findById(storeId);

        if (!store) {
            return res.status(404).json({
                success: false,
                message: "Store not found"
            });
        }

        const address = await Address.findById(addressId);

        if (!address) {
            return res.status(404).json({
                success: false,
                message: "Address not found"
            });
        }

        const emailExists = await Customer.findOne({ email });

        if (emailExists) {
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            });
        }

        const customer = await Customer.create({
            storeId,
            firstName,
            lastName,
            email,
            addressId,
            active
        });

        return res.status(201).json({
            success: true,
            message: "Customer added successfully",
            data: customer
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Get All Customers
const getAllCustomers = async (req, res) => {
    try {

        const customers = await Customer.find()
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
            })
            .populate("addressId");

        return res.status(200).json({
            success: true,
            total: customers.length,
            data: customers
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Get Single Customer
const getSingleCustomer = async (req, res) => {
    try {

        const customer = await Customer.findById(req.params.id)
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
            })
            .populate("addressId");

        if (!customer) {
            return res.status(404).json({
                success: false,
                message: "Customer not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: customer
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Update Customer
const updateCustomer = async (req, res) => {
    try {

        const { storeId, addressId, email } = req.body;

        if (storeId) {
            const store = await Store.findById(storeId);

            if (!store) {
                return res.status(404).json({
                    success: false,
                    message: "Store not found"
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

        if (email) {
            const existingEmail = await Customer.findOne({
                email,
                _id: { $ne: req.params.id }
            });

            if (existingEmail) {
                return res.status(400).json({
                    success: false,
                    message: "Email already exists"
                });
            }
        }

        const customer = await Customer.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        )
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
            })
            .populate("addressId");

        if (!customer) {
            return res.status(404).json({
                success: false,
                message: "Customer not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Customer updated successfully",
            data: customer
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Delete Customer
const deleteCustomer = async (req, res) => {
    try {

        const customer = await Customer.findByIdAndDelete(req.params.id);

        if (!customer) {
            return res.status(404).json({
                success: false,
                message: "Customer not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Customer deleted successfully"
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

module.exports = {
    addCustomer,
    getAllCustomers,
    getSingleCustomer,
    updateCustomer,
    deleteCustomer
};