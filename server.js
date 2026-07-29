require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        // Connect MongoDB
        await connectDB();

        // Start Server
        app.listen(PORT, () => {
            console.log(`🚀 Server Running on http://localhost:${PORT}`);
        });

    } catch (error) {
        console.log("❌ Server Error");
        console.log(error.message);
    }
};

startServer();