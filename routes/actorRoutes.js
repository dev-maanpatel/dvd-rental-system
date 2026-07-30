const express = require("express");

const {
    protect,
    authorize
} = require("../middlewares/authMiddleware");

const {
    addActor,
    getAllActors,
    getSingleActor,
    updateActor,
    deleteActor
} = require("../controllers/actorController");

const router = express.Router();

router.post("/add-actor", protect, authorize("admin"), addActor);

router.get("/get-actors", protect, authorize("admin" ,"staff"), getAllActors);

router.get("/get-actor/:id", protect, authorize("admin" ,"staff"), getSingleActor);

router.put("/update-actor/:id", protect, authorize("admin"), updateActor);

router.delete("/delete-actor/:id", protect, authorize("admin"), deleteActor);

module.exports = router;