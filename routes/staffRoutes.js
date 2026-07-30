const express = require("express");

const {
    protect,
    authorize
} = require("../middlewares/authMiddleware");

const {
    addStaff,
    getAllStaffs,
    getSingleStaff,
    updateStaff,
    deleteStaff
} = require("../controllers/staffController");

const router = express.Router();

router.post(
    "/add-staff",
    protect,
    authorize("admin"),
    addStaff
);

router.get(
    "/get-staffs",
    protect,
    authorize("admin", "staff"),
    getAllStaffs
);

router.get(
    "/get-staff/:id",
    protect,
    authorize("admin", "staff"),
    getSingleStaff
);

router.put(
    "/update-staff/:id",
    protect,
    authorize("admin"),
    updateStaff
);

router.delete(
    "/delete-staff/:id",
    protect,
    authorize("admin"),
    deleteStaff
);

module.exports = router;