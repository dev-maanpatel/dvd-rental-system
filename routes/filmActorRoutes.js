const express = require("express");

const {
    protect,
    authorize
} = require("../middlewares/authMiddleware");

const {
    addFilmActor,
    getAllFilmActors,
    getSingleFilmActor,
    updateFilmActor,
    deleteFilmActor
} = require("../controllers/filmActorController");

const router = express.Router();

router.post("/add-film-actor", protect, authorize("admin"), addFilmActor);

router.get("/get-film-actors", protect, authorize("admin", "staff"), getAllFilmActors);

router.get("/get-film-actor/:id", protect, authorize("admin", "staff"), getSingleFilmActor);

router.put("/update-film-actor/:id", protect, authorize("admin"), updateFilmActor);

router.delete("/delete-film-actor/:id", protect, authorize("admin"), deleteFilmActor);

module.exports = router;