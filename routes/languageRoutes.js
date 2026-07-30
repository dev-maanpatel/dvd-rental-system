const express = require("express");
const {
    protect, authorize 
} = require ('../middlewares/authMiddleware');
const {
    addLanguage,
    getAllLanguages,
    getSingleLanguage,
    updateLanguage,
    deleteLanguage
} = require("../controllers/languageController");

const router = express.Router();

// Add Language
router.post("/add-language",  protect, authorize('admin'),addLanguage);

// Get All Languages
router.get("/get-languages", getAllLanguages);

// Get Single Language
router.get("/get-language/:id", getSingleLanguage);

// Update Language
router.put("/update-language/:id",  protect, authorize('admin'),updateLanguage);

// Delete Language
router.delete("/delete-language/:id",  protect, authorize('admin')
,deleteLanguage);

module.exports = router;