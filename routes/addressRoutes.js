const express = require("express");
const {
    protect, authorize 
} = require ('../middlewares/authMiddleware');

const {
    addAddress,
    getAllAddresses,
    getSingleAddress,
    updateAddress,
    deleteAddress
} = require("../controllers/addressController");

const router = express.Router();

router.post("/add-address", protect, authorize('admin') , addAddress);

router.get("/get-addresses", getAllAddresses);

router.get("/get-address/:id", getSingleAddress);

router.put("/update-address/:id", protect, authorize('admin'), updateAddress);

router.delete("/delete-address/:id", protect, authorize('admin'), deleteAddress);

module.exports = router;