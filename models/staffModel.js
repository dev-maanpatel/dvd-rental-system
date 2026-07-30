const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const staffSchema = new mongoose.Schema(
    {
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

        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        password: {
            type: String,
            required: true
        },

        role: {
            type: String,
            enum: ["admin", "staff"],
            default: "staff"
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
staffSchema.pre("save", async function () {

    if (!this.isModified("password")) {
        return;
    }

    this.password = await bcrypt.hash(this.password, 10);
});
module.exports = mongoose.model("Staff", staffSchema);