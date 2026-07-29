const express = require("express");
const cors = require("cors");

// Import Routes
const countryRoutes = require("./routes/countryRoutes");
const cityRoutes = require("./routes/cityRoutes");
const addressRoutes = require("./routes/addressRoutes");
const languageRoutes = require("./routes/languageRoutes");

const app = express();

// ========================
// Middlewares
// ========================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ========================
// Home Route
// ========================
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to DVD Rental System API"
    });
});

// ========================
// API Routes
// ========================
app.use("/api", countryRoutes);
app.use("/api", cityRoutes);
app.use("/api", addressRoutes);
app.use("/api", languageRoutes);

// ========================
// 404 Route
// ========================
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route Not Found"
    });
});

module.exports = app;