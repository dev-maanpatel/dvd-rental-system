const express = require("express");
const {
    protect, authorize 
} = require ('../middlewares/authMiddleware');
const {
    addCity,
    getAllCities,
    getSingleCity,
    updateCity,
    deleteCity
} = require("../controllers/cityController");

const router = express.Router();

router.post("/add-city", protect, authorize('admin'), addCity);

router.get("/get-cities", protect, authorize("admin" ,"staff"), getAllCities);

router.get("/get-city/:id", protect, authorize("admin" ,"staff"), getSingleCity);

router.put("/update-city/:id", protect, authorize('admin') ,updateCity);

router.delete("/delete-city/:id",  protect, authorize('admin'),deleteCity);

module.exports = router;