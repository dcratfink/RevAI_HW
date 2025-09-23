var express = require('express');
var router = express.Router();

const journeyModel = require('../models/Journey');
const patientModel = require('../models/Patient');

// GET API - Returns status of a given run
router.get('/', async (req, res) => {
    try {
        console.log("GET /api/journeys/run");
        const journeys = await journeyModel.findById(req.body._id);
        res.json(journeys);
        console.log(journeys);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
    finally {
        console.log('done with journey run')
    }
});

// POST API - Create a journey new definition
router.post('/', async (req, res) => {
    const journey = new journeyModel({
        patientId:  req.body.patientId,
        name: req.body.name,
        startNodeId: req.body.startNodeId,
        journeyNodes: [],
    });
    try {
        console.log("POST /api/journeys: saving new journey definition");
        const newJourney = await journey.save();
        res.status(201).json(newJourney);
        console.log("201 Created new journey with _id: ", newJourney.id);
    } catch (err) {
        res.status(400).json({ message: err.message });
        console.log("Error creating a new journey",err.message)
    }
});

// POST API - Trigger a new run for given patient
router.post('/', async (req, res) => {
    const patient = new patientModel({
        patientId: req.body.patientId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        middleName: req.body.middleName,
        dateOfBirth: req.body.dateOfBirth,
        age: req.body.age,
        language: req.body.language,
        diseaseSite: req.body.diseaseSite
    });
    try {
        console.log("POST /api/journeys: launching a new journey for patient.");
        const newJourneyRun = await journey.save();
        res.status(202).json(newJourney);
        console.log("202 new journey run started. ");
    } catch (err) {
        res.status(400).json({ message: err.message });
        console.log("Error creating a new journey",err.message)
    }
});

module.exports = router;


/*
{
 {
    "patientId": 123456,
	"name": "Send SMS SimOrder Approval Request",
    "startNodeId": 1,
    "journeyNodes": [
         {
           "journeyNodeId": 1,
           "message": "Send an SMS reminder to attending physicial Dr. Apple Test to approve  sim order",
           "nextNodeId": 2,
           "nodeType": "MESSAGE"
         },
         {
            "journeyNodeId": 2,
            "nodeType": "DELAY",
            "durationSeconds": 3.0,
            "nextNodeId": 3
         },
         {
            "journeyNodeId": 3,
            "nodeType": "CONDITIONAL",
            "condition": {
                // e.g., 'patient.age', 'patient.condition'
                "field": "medicalConditionSite",
                // e.g., '>', '=', '!='
                "operator": "=",
                // value to compare against
                "value": "prostate"
            },
            // Which node to go to if the condition is true or false
            "on_true_next_node_id": 4,
            "on_false_next_node_id": 5
         },
         {
           "journeyNodeId": 4,
           "message": "Request sent to Dr. Apple Test for sim order approval on prostate patient",
           "nextNodeId": null,
           "nodeType": "MESSAGE"
         },
         {
           "journeyNodeId": 5,
           "message": "Dr. Apple Test doesn't support prostate patients.",
           "nextNodeId": 2,
           "nodeType": "MESSAGE"
         }
    ]
}
 */