const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
    {
        address: {
            type: String,
            required: true,
            trim: true
        },
        address2: {
            type: String,
            default: ""
        },
        district: {
            type: String,
            required: true,
            trim: true
        },
        cityId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "City",
            required: true
        },
        postalCode: {
            type: String,
            required: true,
            trim: true
        },
        phone: {
            type: String,
            required: true,
            trim: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Address", addressSchema);