const express = require("express");
const cors = require("cors");
require("dotenv").config();

const cricketRoutes = require("./routes/cricketRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Cricket Live API Backend is running"
    });
});

app.use("/api/cricket", cricketRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});