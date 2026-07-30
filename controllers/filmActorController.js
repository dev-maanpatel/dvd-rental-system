const FilmActor = require("../models/filmActorModel");
const Film = require("../models/filmModel");
const Actor = require("../models/actorModel");

// Add Film Actor
const addFilmActor = async (req, res) => {
    try {

        const { filmId, actorId } = req.body;

        const film = await Film.findById(filmId);

        if (!film) {
            return res.status(404).json({
                success: false,
                message: "Film not found"
            });
        }

        const actor = await Actor.findById(actorId);

        if (!actor) {
            return res.status(404).json({
                success: false,
                message: "Actor not found"
            });
        }

        const existing = await FilmActor.findOne({
            filmId,
            actorId
        });

        if (existing) {
            return res.status(400).json({
                success: false,
                message: "Film Actor already exists"
            });
        }

        const filmActor = await FilmActor.create({
            filmId,
            actorId
        });

        return res.status(201).json({
            success: true,
            message: "Film Actor added successfully",
            data: filmActor
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Get All Film Actors
const getAllFilmActors = async (req, res) => {
    try {

        const filmActors = await FilmActor.find()
            .populate("filmId")
            .populate("actorId");

        return res.status(200).json({
            success: true,
            total: filmActors.length,
            data: filmActors
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Get Single Film Actor
const getSingleFilmActor = async (req, res) => {
    try {

        const filmActor = await FilmActor.findById(req.params.id)
            .populate("filmId")
            .populate("actorId");

        if (!filmActor) {
            return res.status(404).json({
                success: false,
                message: "Film Actor not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: filmActor
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Update Film Actor
const updateFilmActor = async (req, res) => {
    try {

        const filmActor = await FilmActor.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!filmActor) {
            return res.status(404).json({
                success: false,
                message: "Film Actor not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Film Actor updated successfully",
            data: filmActor
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Delete Film Actor
const deleteFilmActor = async (req, res) => {
    try {

        const filmActor = await FilmActor.findByIdAndDelete(req.params.id);

        if (!filmActor) {
            return res.status(404).json({
                success: false,
                message: "Film Actor not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Film Actor deleted successfully"
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

module.exports = {
    addFilmActor,
    getAllFilmActors,
    getSingleFilmActor,
    updateFilmActor,
    deleteFilmActor
};