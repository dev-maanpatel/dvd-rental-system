const express = require("express");
const cors = require("cors");

const countryRoutes = require("./routes/countryRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", countryRoutes);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "DVD Rental API Running Successfully"
    });
});

module.exports = app;