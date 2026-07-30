const express = require("express");

const {
    protect,
    authorize
} = require("../middlewares/authMiddleware");

const {
    addFilm,
    getAllFilms,
    getSingleFilm,
    updateFilm,
    deleteFilm
} = require("../controllers/filmController");

const router = express.Router();

router.post("/add-film", protect, authorize("admin"), addFilm);

router.get("/get-films", protect, authorize("admin", "staff"), getAllFilms);

router.get("/get-film/:id", protect, authorize("admin", "staff"), getSingleFilm);

router.put("/update-film/:id", protect, authorize("admin"), updateFilm);

router.delete("/delete-film/:id", protect, authorize("admin"), deleteFilm);

module.exports = router;