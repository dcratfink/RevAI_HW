var express = require('express');
var router = express.Router();

const Action = require('../models/Action');
const Conditional = require('../models/Conditional');
const Delay = require('../models/Delay');
const Journey = require('../models/Journey');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


// Get all Journeys
router.get('/', async (req, res) => {
    try {
        const journey = await Journey.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new user
router.post('/', async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });
    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
