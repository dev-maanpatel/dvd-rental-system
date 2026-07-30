const mongoose = require("mongoose");

const rentalSchema = new mongoose.Schema(
    {
        rentalDate: {
            type: Date,
            required: true
        },

        inventoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Inventory",
            required: true
        },

        customerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Customer",
            required: true
        },

        returnDate: {
            type: Date,
            required: true
        },

        staffId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Staff",
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Rental", rentalSchema);