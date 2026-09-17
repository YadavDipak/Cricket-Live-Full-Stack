// const express = require("express");

// const {
//     getLiveMatches
// } = require("../services/cricketService");

// const router = express.Router();

// router.get("/live", async (req, res) => {
//     try {
//         const data = await getLiveMatches();

//         const { apikey, ...safeResponse } = data;

//         res.json(safeResponse);
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message
//         });
//     }
// });

// module.exports = router;

const express = require("express");

const {
    getLiveMatches
} = require("../services/cricketService");

const router = express.Router();

router.get("/live", async (req, res) => {
    try {
        const data = await getLiveMatches();

        // Remove API key before sending response to frontend
        const { apikey, ...safeResponse } = data;

        res.json(safeResponse);
    } catch (error) {
        console.error("Route Error:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;