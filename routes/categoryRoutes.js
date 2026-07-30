const express = require("express");

const {
    protect,
    authorize
} = require("../middlewares/authMiddleware");

const {
    addCategory,
    getAllCategories,
    getSingleCategory,
    updateCategory,
    deleteCategory
} = require("../controllers/categoryController");

const router = express.Router();

// Add Category
router.post("/add-category", protect, authorize("admin"), addCategory);

// Get All Categories
router.get("/get-categories", getAllCategories);

// Get Single Category
router.get("/get-category/:id",getSingleCategory);

// Update Category
router.put("/update-category/:id", protect, authorize("admin"), updateCategory);

// Delete Category
router.delete("/delete-category/:id", protect, authorize("admin"), deleteCategory);

module.exports = router;