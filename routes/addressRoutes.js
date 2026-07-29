const express = require("express");

const {
    addAddress,
    getAllAddresses,
    getSingleAddress,
    updateAddress,
    deleteAddress
} = require("../controllers/addressController");

const router = express.Router();

router.post("/add-address", addAddress);

router.get("/get-addresses", getAllAddresses);

router.get("/get-address/:id", getSingleAddress);

router.put("/update-address/:id", updateAddress);

router.delete("/delete-address/:id", deleteAddress);

module.exports = router;