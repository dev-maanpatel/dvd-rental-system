const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
    {
        storeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Store",
            required: true
        },

        firstName: {
            type: String,
            required: true,
            trim: true
        },

        lastName: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        addressId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Address",
            required: true
        },

        active: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Customer", customerSchema);