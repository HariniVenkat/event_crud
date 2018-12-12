// Importing important packages
const express = require('express');

// Using express and routes
const app = express();
const eventRoute = express.Router();

// event module which is required and imported
let eventModel = require('../Model/Event');

// To Get List Of event
eventRoute.route('/').get(function (req, res) {
    eventModel.find(function (err, event) {
        if (err) {
            console.log(err);
        }
        else {
            res.json(event);
        }
    });
});

// To Add New event
eventRoute.route('/addEvent').post(function (req, res) {
    let event = new eventModel(req.body);
    event.save()
        .then(game => {
            res.status(200).json({ 'event': 'event Added Successfully' });
        })
        .catch(err => {
            res.status(400).send("Something Went Wrong");
        });
});

// To Get event Details By event ID
eventRoute.route('/editEvent/:id').get(function (req, res) {
    let id = req.params.id;
    eventModel.findById(id, function (err, event) {
        res.json(event);
    });
});

// To Update The event Details
eventRoute.route('/updateEvent/:id').post(function (req, res) {
    eventModel.findById(req.params.id, function (err, event) {
        if (!event)
            return next(new Error('Unable To Find event With This Id'));
        else {
            event.eventDescription = req.body.eventDescription;
            event.eventTime = req.body.eventTime;
            event.eventDate = req.body.eventDate;
            event.numPeople = req.body.numPeople;

            event.save().then(emp => {
                res.json('event Updated Successfully');
            })
                .catch(err => {
                    res.status(400).send("Unable To Update event");
                });
        }
    });
});

// To Delete The event
eventRoute.route('/deleteEvent/:id').get(function (req, res) {
    eventModel.findByIdAndRemove({ _id: req.params.id }, function (err, event) {
        if (err) res.json(err);
        else res.json('event Deleted Successfully');
    });
});

module.exports = eventRoute;