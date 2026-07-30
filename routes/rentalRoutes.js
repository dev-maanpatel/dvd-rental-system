const express = require("express");

const {
    protect,
    authorize
} = require("../middlewares/authMiddleware");

const {
    addRental,
    getAllRentals,
    getSingleRental,
    updateRental,
    deleteRental
} = require("../controllers/rentalController");

const router = express.Router();

// Add Rental
router.post(
    "/add-rental",
    protect,
    authorize("admin"),
    addRental
);

// Get All Rentals
router.get(
    "/get-rentals",
    protect,
    authorize("admin", "staff"),
    getAllRentals
);

// Get Single Rental
router.get(
    "/get-rental/:id",
    protect,
    authorize("admin", "staff"),
    getSingleRental
);

// Update Rental
router.put(
    "/update-rental/:id",
    protect,
    authorize("admin"),
    updateRental
);

// Delete Rental
router.delete(
    "/delete-rental/:id",
    protect,
    authorize("admin"),
    deleteRental
);

module.exports = router;