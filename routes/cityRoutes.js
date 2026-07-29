const express = require("express");

const {
    addCity,
    getAllCities,
    getSingleCity,
    updateCity,
    deleteCity
} = require("../controllers/cityController");

const router = express.Router();

router.post("/add-city", addCity);

router.get("/get-cities", getAllCities);

router.get("/get-city/:id", getSingleCity);

router.put("/update-city/:id", updateCity);

router.delete("/delete-city/:id", deleteCity);

module.exports = router;