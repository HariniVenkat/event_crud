import React, { Component } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
// To use routing functionalities
import { Link } from 'react-router-dom';
import '../index.css';
import EventService from './Services';

var divStyle = {
    margin: '8% 8%',
};

class ListEvent extends Component {

    constructor(props) {
        super(props);
        this.eventService = new EventService();
        this.state = {
            events: []
        }
        this.deleteEvent = this.deleteEvent.bind(this);
    }

    componentDidMount = () => {
        this.getEventList();
    }

    // To get all the events
    getEventList() {
        axios.get('http://localhost:4000/events')
            .then((response) => {
                console.log(response);
                this.setState({
                    events: response.data
                });
            })
            .catch((error) => {
                console.log(error);
            })
    }

    // To delete any events
    deleteEvent(empid) {
        this.eventService.deleteEvent(empid);
        this.getEventList();
    }

    render() {
        const { events } = this.state;
        return (
            <div style={divStyle}>
                <Table responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Description</th>
                            <th>Time</th>
                            <th>Date</th>
                            <th>Num of people</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            events && events.map((event, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{i}</td>
                                        <td>{event.eventDescription}</td>
                                        <td>{event.eventTime}</td>
                                        <td>{event.eventDate}</td>
                                        <td>{event.numPeople}</td>
                                        <td>
                                            <Link to={"editevent/" + event._id} className="btn btn-primary">Edit</Link>
                                        </td>
                                        <td>
                                            <Button onClick={() => this.deleteEvent(event._id)} bsStyle="danger" >Delete</Button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default ListEvent;