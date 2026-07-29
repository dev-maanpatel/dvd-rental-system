const mongoose = require("mongoose");

const citySchema = new mongoose.Schema(
    {
        cityName: {
            type: String,
            required: true,
            trim: true
        },
        countryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Country",
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("City", citySchema);