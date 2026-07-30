const mongoose = require("mongoose");

const filmSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        releaseYear: {
            type: Number,
            required: true
        },

        languageId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Language",
            required: true
        },

        rating: {
            type: String,
            enum: ["G", "PG", "PG-13", "R", "NC-17"],
            default: "G"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Film", filmSchema);