import React, { Component } from 'react';
import axios from 'axios';
import {Modal, Panel, Col, Row, Well, Button, ButtonGroup, Label} from 'react-bootstrap'; 

const customStyle = {
    width: '300px',
    margin: '0 auto'
}

class EditEvent extends React.Component {
    constructor(props, context) {
      super(props, context);
  
      this.handleShow = this.handleShow.bind(this);
      this.handleClose = this.handleClose.bind(this);
  
      this.state = {
        eventDescription: '',
        eventTime: '',
        eventDate: '',
        numPeople: '',
        show: true
      };
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
                console.log('^_^',error);
            });

    }



  
    handleClose() {
      this.setState({ show: false });
      this.props.history.push('/');
    }
  
    handleShow() {
      this.setState({ show: true });
    }
  
    render() {
    //   const popover = (
    //     <Popover id="modal-popover" title="popover">
    //       very popover. such engagement
    //     </Popover>
    //   );
    //   const tooltip = <Tooltip id="modal-tooltip">wow.</Tooltip>;
  
      return (
        <div>
     
{/*   
          <Button bsStyle="primary" bsSize="large" onClick={this.handleShow}>
            Launch demo modal
          </Button> */}
  
          <Modal show={this.state.show} onHide={this.handleClose}>

            <Modal.Header closeButton>
              <Modal.Title>Event Edit Form</Modal.Title>

            </Modal.Header>
            <Modal.Body>
              <h4>edit events</h4>


 {/* adding form code */}

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
                            required
                            min="9:00" max="18:00"

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
                    <br />
                    {/* button within form */}
                    <input
                        type="submit"
                        value="submit"
                        className="btn btn-primary"
                    />
                </form>


{/* adding form code */}

              
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.handleClose}>Close</Button>
            </Modal.Footer>
          </Modal>
        </div>
      );
    }
  }
  
  export default EditEvent;