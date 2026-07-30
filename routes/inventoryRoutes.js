const express = require("express");

const {
    protect,
    authorize
} = require("../middlewares/authMiddleware");

const {
    addInventory,
    getAllInventories,
    getSingleInventory,
    updateInventory,
    deleteInventory
} = require("../controllers/inventoryController");

const router = express.Router();

router.post(
    "/add-inventory",
    protect,
    authorize("admin"),
    addInventory
);

router.get(
    "/get-inventories",
    protect,
    authorize("admin", "staff"),
    getAllInventories
);

router.get(
    "/get-inventory/:id",
    protect,
    authorize("admin", "staff"),
    getSingleInventory
);

router.put(
    "/update-inventory/:id",
    protect,
    authorize("admin"),
    updateInventory
);

router.delete(
    "/delete-inventory/:id",
    protect,
    authorize("admin"),
    deleteInventory
);

module.exports = router;