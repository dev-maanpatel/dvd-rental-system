const express = require("express");

const {
    addCountry,
    getAllCountries,
    getSingleCountry,
    updateCountry,
    deleteCountry
} = require("../controllers/countryController");

const router = express.Router();

// Add Country
router.post("/add-country", addCountry);

// Get All Countries
router.get("/get-countries", getAllCountries);

// Get Single Country
router.get("/get-country/:id", getSingleCountry);

// Update Country
router.put("/update-country/:id", updateCountry);

// Delete Country
router.delete("/delete-country/:id", deleteCountry);

module.exports = router;