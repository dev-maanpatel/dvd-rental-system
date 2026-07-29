const mongoose = require("mongoose");

const languageSchema = new mongoose.Schema(
    {
        languageName: {
            type: String,
            required: true,
            trim: true,
            unique: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Language", languageSchema);