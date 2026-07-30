const express = require("express");

const {
    protect,
    authorize
} = require("../middlewares/authMiddleware");

const {
    addStore,
    getAllStores,
    getSingleStore,
    updateStore,
    deleteStore
} = require("../controllers/storeController");

const router = express.Router();

router.post(
    "/add-store",
    protect,
    authorize("admin"),
    addStore
);

router.get(
    "/get-stores",
    protect,
    authorize("admin", "staff"),
    getAllStores
);

router.get(
    "/get-store/:id",
    protect,
    authorize("admin", "staff"),
    getSingleStore
);

router.put(
    "/update-store/:id",
    protect,
    authorize("admin"),
    updateStore
);

router.delete(
    "/delete-store/:id",
    protect,
    authorize("admin"),
    deleteStore
);

module.exports = router;