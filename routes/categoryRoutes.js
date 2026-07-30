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
router.get("/get-categories",protect, authorize("admin" ,"staff"), getAllCategories);

// Get Single Category
router.get("/get-category/:id", protect, authorize("admin" ,"staff"),getSingleCategory);

// Update Category
router.put("/update-category/:id", protect, authorize("admin"), updateCategory);

// Delete Category
router.delete("/delete-category/:id", protect, authorize("admin"), deleteCategory);

module.exports = router;