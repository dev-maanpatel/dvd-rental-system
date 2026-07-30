const express = require("express");
const {
    protect, authorize 
} = require ('../middlewares/authMiddleware');

const {
    addCountry,
    getAllCountries,
    getSingleCountry,
    updateCountry,
    deleteCountry
} = require("../controllers/countryController");

const router = express.Router();

// Add Country
router.post("/add-country", protect, authorize('admin'), addCountry);

// Get All Countries
router.get("/get-countries", getAllCountries);

// Get Single Country
router.get("/get-country/:id", getSingleCountry);

// Update Country
router.put("/update-country/:id", protect, authorize('admin'), updateCountry);

// Delete Country
router.delete("/delete-country/:id",  protect, authorize('admin'),deleteCountry);

module.exports = router;