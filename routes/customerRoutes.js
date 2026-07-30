const express = require("express");

const {
    protect,
    authorize
} = require("../middlewares/authMiddleware");

const {
    addCustomer,
    getAllCustomers,
    getSingleCustomer,
    updateCustomer,
    deleteCustomer
} = require("../controllers/customerController");

const router = express.Router();

router.post(
    "/add-customer",
    protect,
    authorize("admin"),
    addCustomer
);

router.get(
    "/get-customers",
    protect,
    authorize("admin", "staff"),
    getAllCustomers
);

router.get(
    "/get-customer/:id",
    protect,
    authorize("admin", "staff"),
    getSingleCustomer
);

router.put(
    "/update-customer/:id",
    protect,
    authorize("admin"),
    updateCustomer
);

router.delete(
    "/delete-customer/:id",
    protect,
    authorize("admin"),
    deleteCustomer
);

module.exports = router;