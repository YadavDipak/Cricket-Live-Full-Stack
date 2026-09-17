const axios = require("axios");

let cachedData = null;
let lastFetchTime = 0;

const CACHE_DURATION =
    Number(process.env.CACHE_DURATION_MINUTES || 15) * 60 * 1000;

const getLiveMatches = async () => {
    try {
        const now = Date.now();

        if (
            cachedData &&
            now - lastFetchTime < CACHE_DURATION
        ) {
            console.log("Returning cached cricket data");

            return cachedData;
        }

        console.log("Fetching fresh data from CricketData...");

        const response = await axios.get(
            process.env.CRICKET_API_URL,
            {
                params: {
                    apikey: process.env.CRICKET_API_KEY,
                    offset: 0
                }
            }
        );

        cachedData = response.data;
        lastFetchTime = now;

        return cachedData;

    } catch (error) {
        console.error(
            "Cricket API Error:",
            error.response?.data || error.message
        );

        if (cachedData) {
            console.log("Returning old cached data");
            return cachedData;
        }

        throw new Error("Unable to fetch live cricket data");
    }
};

module.exports = {
    getLiveMatches
};