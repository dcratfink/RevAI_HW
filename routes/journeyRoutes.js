var express = require('express');
var router = express.Router();

const journeyModel = require('../models/Journey');

// GET API - retrieves all patient journeys
router.get('/', async (req, res) => {
    try {
        console.log("GET /api/journeys");
        const journeys = await journeyModel.find();
        res.json(journeys);
        console.log(journeys);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
    finally {
        console.log('done with journeys')
    }
});

module.exports = router;