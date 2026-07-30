const mongoose = require("mongoose");

const filmActorSchema = new mongoose.Schema(
    {
        filmId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Film",
            required: true
        },

        actorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Actor",
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("FilmActor", filmActorSchema);