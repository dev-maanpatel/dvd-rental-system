const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema(
    {
        managerStaffId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Staff",
            required: true
        },

        addressId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Address",
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Store", storeSchema);