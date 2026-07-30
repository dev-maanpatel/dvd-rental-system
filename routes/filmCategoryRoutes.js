const express = require("express");

const {
    protect,
    authorize
} = require("../middlewares/authMiddleware");

const {
    addFilmCategory,
    getAllFilmCategories,
    getSingleFilmCategory,
    updateFilmCategory,
    deleteFilmCategory
} = require("../controllers/filmCategoryController");

const router = express.Router();

router.post("/add-film-category", protect, authorize("admin"), addFilmCategory);

router.get("/get-film-categories", protect, authorize("admin", "staff"), getAllFilmCategories);

router.get("/get-film-category/:id", protect, authorize("admin", "staff"), getSingleFilmCategory);

router.put("/update-film-category/:id", protect, authorize("admin"), updateFilmCategory);

router.delete("/delete-film-category/:id", protect, authorize("admin"), deleteFilmCategory);

module.exports = router;