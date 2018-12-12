const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// List of columns for Event schema

//firstName LastName Email phone

let Event = new Schema({
    eventDescription: {
        type: String,
        required: true
        //  validate: [validators.notEmpty, 'Event description is empty']


    },
    eventTime: {
        type: String,
        required: true
        // validate: [validators.notEmpty, 'Time is empty']



    },
    eventDate: {
        type: String,
        required: true
        // validate: [validators.notEmpty, 'Date is empty']

    },
    numPeople: {
        type: Number,
        required: true
        // validate: [validators.notEmpty, 'Member count is empty']

    }
}, {
        collection: 'events'
    });

module.exports = mongoose.model('Event', Event);