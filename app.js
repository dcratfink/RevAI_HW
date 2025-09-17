var express = require('express');
var path = require('path');
const mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);




// Connect to MongoDB
console.log("connected to MongoDB...");

mongoose.connect('mongodb://localhost:27017/RevelAI_HW', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Could not connect to MongoDB...', err);
});


// Define your Mongoose Schema and Model
// node_type  = ActionNode | DelayNode | ConditionalNod
const journeySchema = new mongoose.Schema({
    id: String,
    patient_id: String,
    name: String,
    start_node_id: String,
    node_type: String,
});

const journeyModel = mongoose.model('journey', journeySchema);


// GET endpoint that return all patient journeys
app.get('/api/journeys', (req, res) => {
    const users = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
    res.status(200).json(users);
});

// GET endpoint that returns a journey by id (run status)
app.get('/api/journey/:id', async (req, res) => {
    try {
        const journeyId = req.params.id;
        const journey = await Journey.findById(journeyId);

        if (!journey) {
            console.log('No journey found with id ' + journeyId);
            return res.status(404).send({ message: 'Journey not found' });
        }
        console.log("successfully returned journey...");
        console.log(journey);
        res.status(200).send(journey);

    } catch (error) {
        res.status(500).send({ message: 'Server error' });
    }
});

// POST endpoint to create a new patient journey
app.post('/api/journey', (req, res) => {
    try {
        const {id, patient_id, name, start_node_id, node_type} = req.body;

        console.log(id,patient_id, name, start_node_id, node_type);

        if (id === undefined || patient_id === undefined || patient_id == undefined || patient_id == undefined ) {
            console.log("Missing required fields: id, patient_id, name, start_node_id or node_type ");
            return res.status(400).send('Missing required fields: id, name, start_node_id or node_type');
        }

        const journey = {
            id: id,
            patient_id: patient_id,
            name: name,
            start_node_id: start_node_id,
            node_type: node_type
        };
        const newDocument = new journeyModel(journey);
        newDocument.save();
        console.log("journey successfully inserted");
        res.status(201).json(newDocument);
        console.log("inserted journey...");
    } catch (err) {
        console.log("Error inserting journey...", err);
        res.status(400).json({ message: 'Error inserting journey: ' + err });
    }

});


module.exports = app;
