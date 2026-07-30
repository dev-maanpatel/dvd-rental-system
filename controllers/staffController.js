const Staff = require("../models/staffModel");
const Address = require("../models/addressModel");
const bcrypt = require("bcryptjs");

// Add Staff
const addStaff = async (req, res) => {
    try {

        const {
            firstName,
            lastName,
            email,
            username,
            password,
            role,
            addressId
        } = req.body;

        const address = await Address.findById(addressId);

        if (!address) {
            return res.status(404).json({
                success: false,
                message: "Address not found"
            });
        }

        const emailExists = await Staff.findOne({ email });

        if (emailExists) {
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            });
        }

        const usernameExists = await Staff.findOne({ username });

        if (usernameExists) {
            return res.status(400).json({
                success: false,
                message: "Username already exists"
            });
        }

        const staff = await Staff.create({
            firstName,
            lastName,
            email,
            username,
            password,
            role,
            addressId
        });

        return res.status(201).json({
            success: true,
            message: "Staff added successfully",
            data: staff
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Get All Staff
const getAllStaffs = async (req, res) => {
    try {

        const staffs = await Staff.find()
            .populate("addressId")
            .select("-password");

        return res.status(200).json({
            success: true,
            total: staffs.length,
            data: staffs
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Get Single Staff
const getSingleStaff = async (req, res) => {
    try {

        const staff = await Staff.findById(req.params.id)
            .populate("addressId")
            .select("-password");

        if (!staff) {
            return res.status(404).json({
                success: false,
                message: "Staff not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: staff
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Update Staff
const updateStaff = async (req, res) => {
    try {

        const data = { ...req.body };

        if (data.addressId) {

            const address = await Address.findById(data.addressId);

            if (!address) {
                return res.status(404).json({
                    success: false,
                    message: "Address not found"
                });
            }

        }

        if (data.password) {
            data.password = await bcrypt.hash(data.password, 10);
        }

        const staff = await Staff.findByIdAndUpdate(
            req.params.id,
            data,
            {
                new: true,
                runValidators: true
            }
        ).select("-password");

        if (!staff) {
            return res.status(404).json({
                success: false,
                message: "Staff not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Staff updated successfully",
            data: staff
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Delete Staff
const deleteStaff = async (req, res) => {
    try {

        const staff = await Staff.findByIdAndDelete(req.params.id);

        if (!staff) {
            return res.status(404).json({
                success: false,
                message: "Staff not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Staff deleted successfully"
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

module.exports = {
    addStaff,
    getAllStaffs,
    getSingleStaff,
    updateStaff,
    deleteStaff
};