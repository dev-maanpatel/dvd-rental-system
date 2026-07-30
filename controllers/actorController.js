const Actor = require("../models/actorModel");

// Add Actor
const addActor = async (req, res) => {
    try {

        const { firstName, lastName } = req.body;

        const existingActor = await Actor.findOne({
            firstName: firstName.trim(),
            lastName: lastName.trim()
        });

        if (existingActor) {
            return res.status(400).json({
                success: false,
                message: "Actor already exists"
            });
        }

        const actor = await Actor.create({
            firstName: firstName.trim(),
            lastName: lastName.trim()
        });

        return res.status(201).json({
            success: true,
            message: "Actor added successfully",
            data: actor
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Get All Actors
const getAllActors = async (req, res) => {
    try {

        const actors = await Actor.find();

        return res.status(200).json({
            success: true,
            total: actors.length,
            data: actors
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Get Single Actor
const getSingleActor = async (req, res) => {
    try {

        const actor = await Actor.findById(req.params.id);

        if (!actor) {
            return res.status(404).json({
                success: false,
                message: "Actor not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: actor
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Update Actor
const updateActor = async (req, res) => {
    try {

        const actor = await Actor.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!actor) {
            return res.status(404).json({
                success: false,
                message: "Actor not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Actor updated successfully",
            data: actor
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Delete Actor
const deleteActor = async (req, res) => {
    try {

        const actor = await Actor.findByIdAndDelete(req.params.id);

        if (!actor) {
            return res.status(404).json({
                success: false,
                message: "Actor not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Actor deleted successfully"
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

module.exports = {
    addActor,
    getAllActors,
    getSingleActor,
    updateActor,
    deleteActor
};