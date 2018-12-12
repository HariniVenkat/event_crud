//this is old edit events...

import React, { Component } from 'react';
import axios from 'axios';

const customStyle = {
    width: '300px',
    margin: '0 auto'
}

class EditEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eventDescription: '',
            eventTime: '',
            eventDate: '',
            numPeople: ''
        }
    }

    componentDidMount = () => {
        this.getEventById();
    }

    //changes till this done...

    // To get event based on ID
    getEventById() {
        axios.get('http://localhost:4000/events/editEvent/' + this.props.match.params.id)
            .then((response) => {
                this.setState({
                    eventDescription: response.data.eventDescription,
                    eventTime: response.data.eventTime,
                    eventDate: response.data.eventDate,
                    numPeople: response.data.numPeople
                });
            })
            .catch((error) => {
                console.log(error);
            })
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    // To update the record on submit
    handleSubmit = (event) => {
        event.preventDefault();
        const { eventDescription, eventTime, eventDate, numPeople } = this.state;
        axios.post('http://localhost:4000/events/updateEvent/' + this.props.match.params.id, {
            eventDescription: eventDescription,
            eventTime: eventTime,
            eventDate: eventDate,
            numPeople: numPeople,
        })
            .then((response) => {
                console.log(response);
                this.props.history.push('/');
            })
            .catch((error) => {
                console.log(error);
            });

    }

    render() {
        return (
            <div className="container">
                <form style={customStyle} onSubmit={this.handleSubmit}>
                    <label>
                    Event Description
<input
                            name="eventDescription"
                            type="text"
                            value={this.state.eventDescription}
                            onChange={this.handleChange}
                            className="form-control"
                        />
                    </label>
                    <br />
                    <label>
                    Event Time
<input
                            name="eventTime"
                            type="text"
                            value={this.state.eventTime}
                            onChange={this.handleChange}
                            className="form-control"
                        />
                    </label>
                    <br />
                    <label>
                    Event Date
<input
                            name="eventDate"
                            type="text"
                            value={this.state.eventDate}
                            onChange={this.handleChange}
                            className="form-control"
                        />
                    </label>
                    <br />
                    <label>
                    Member Count
<input
                            name="numPeople"
                            type="text"
                            value={this.state.numPeople}
                            onChange={this.handleChange}
                            className="form-control"
                        />
                    </label>
                    <br />
                    <input
                        type="submit"
                        value="submit"
                        className="btn btn-primary"
                    />
                </form>
            </div>
        );
    }
}

export default EditEvent;