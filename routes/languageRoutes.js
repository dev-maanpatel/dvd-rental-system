const express = require("express");

const {
    addLanguage,
    getAllLanguages,
    getSingleLanguage,
    updateLanguage,
    deleteLanguage
} = require("../controllers/languageController");

const router = express.Router();

// Add Language
router.post("/add-language", addLanguage);

// Get All Languages
router.get("/get-languages", getAllLanguages);

// Get Single Language
router.get("/get-language/:id", getSingleLanguage);

// Update Language
router.put("/update-language/:id", updateLanguage);

// Delete Language
router.delete("/delete-language/:id", deleteLanguage);

module.exports = router;