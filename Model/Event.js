const mongoose = require('mongoose');
 const Schema = mongoose.Schema;
 
 // List of columns for Event schema

//firstName LastName Email phone

 let Event = new Schema({
 eventDescription: {
 type: String
 },
 eventTime: {
 type: String
 },
 eventDate: {
 type: String
 },
 numPeople: {
 type: Number
 }
 },{
 collection: 'events'
 });
 
 module.exports = mongoose.model('Event', Event);