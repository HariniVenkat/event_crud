import axios from 'axios';
 
 class EventService {
 
 deleteEvent(id) {
 axios.get('http://localhost:4000/events/deleteEvent/' + id)
 .then(() => {
 console.log('Event Deleted !!!')
 })
 .catch((error) => {
 console.log(error)
 })
 }
 }
 
 export default EventService;