require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");
const Country = require("./models/countryModel");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();

        // Create one sample document if collection is empty
        const count = await Country.countDocuments();

        if (count === 0) {
            await Country.create({
                countryName: "India"
            });

            console.log("✅ Sample Country Inserted");
        }

        app.listen(PORT, () => {
            console.log(`🚀 Server Running on http://localhost:${PORT}`);
        });

    } catch (error) {
        console.log(error);
    }
};

startServer();