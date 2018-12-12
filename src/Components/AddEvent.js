
import React, { Component } from 'react';
import { Modal,  Button } from 'react-bootstrap';


import { Field } from 'react-redux-form';
import validator from 'validator';


//import { Field } from 'redux-form';

import axios from 'axios';

const customStyle = {
    width: '300px',
    margin: '0 auto'
}



//form validation part



//form validation part





class AddEvent extends Component {
    constructor(props) {
        super(props);


        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);



        this.state = {
            eventDescription: '',
            eventTime: '',
            eventDate: '',
            numPeople: '',
            show: true
        }
    }

    // When value changes of the fields
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    //validate fields..
    handleClose() {
         this.setState({ show: false });
         this.props.history.push('/');
}
    handleShow() { this.setState({ show: true }); }
    // To add new evente when user submits the form


    handleSubmit = (event) => {
        event.preventDefault();

        const { eventDescription, eventTime, eventDate, numPeople } = this.state;


        axios.post('http://localhost:4000/events/addEvent', {
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


            <Modal show={this.state.show} onHide={this.handleClose}>

                <Modal.Header closeButton>
                    <Modal.Title>Event ADD Form</Modal.Title>

                </Modal.Header>
                <Modal.Body>
                    <h4>ADD EVENTS</h4>

                    

                    <form style={customStyle} onSubmit={this.handleSubmit}>


                    <label>
                    Event Description 
 <input
                            name="eventDescription"
                            type="text"
                            required
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
                              
                                type="time"
                            
                                min="9:00" max="18:00"
    

                                required
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
                                type="Date"
                                required
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
                                type="number"
                                required
                                value={this.state.numPeople}
                                onChange={this.handleChange}
                                className="form-control"
                            />
                        </label>

 {/* <Field name="numPeople" type="text"
                             value={this.state.numPeople}
                             onChange={this.handleChange}
                             component={renderField} label="numPeople"
        validate={[ required, number ]}
      /> */}




                        <br />
                        <input
                            type="submit"
                            value="submit"
                            className="btn btn-primary"
                        />
                    </form>




                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>



        );
    }
}

export default AddEvent;