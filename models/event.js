const mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');
const validate = require('mongoose-validator');



// Define the database model
const EventSchema = new mongoose.Schema({
  eventname: {
    type: String
    
  },
  eventdesc: {
    type: String
    },
  time: {
    type: String
   },
  date: {
    type: String
    }
});

// Use the unique validator plugin
EventSchema.plugin(unique, { message: 'That {PATH} is already taken.' });

const Event = module.exports = mongoose.model('event', EventSchema);
