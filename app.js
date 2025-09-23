var express = require('express');
var path = require('path');
var indexRouter = require('./routes/index');
var journeyRoutes = require('./routes/journeyRoutes');
var app = express();

// Get connected to MongoDB Server
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/RevelAI_HW', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Could not connect to MongoDB...', err);
});

console.log("MongoDB Successfully Connected!");

app.use(express.json());
app.use('/', indexRouter);
app.use('/api/journeys',journeyRoutes);

module.exports = app;
