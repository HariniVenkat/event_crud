import React, { Component } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';

import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter, Comparator } from 'react-bootstrap-table2-filter';


// To use routing functionalities
import { Link } from 'react-router-dom';
import '../index.css';
import EventService from './Services';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css



var divStyle = {
    margin: '8% 8%',
};


const columns = [{
    dataField: 'event.eventDescription',
    text: 'event description'
  }, {
    dataField: 'event.eventTime',
    text: 'Evnet time',
    filter: textFilter({
      comparator: Comparator.EQ
    })
  }, {
    dataField: 'event.numpeople',
    text: 'people',
    filter: textFilter()
  }];

class ListEvent extends Component {

    constructor(props) {

        super(props);
        

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    
        
        this.eventService = new EventService();
        this.state = {
            events: [],
            show: false



        }
        this.deleteEvent = this.deleteEvent.bind(this);
    }

    componentDidMount = () => {
        this.getEventList();
    }




    
  
    handleClose() {
        this.setState({ show: false });
      }
    
      handleShow() {
        this.setState({ show: true });
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

  //  To delete any events
   // To delete any events
   deleteEvent(empid) {
    this.eventService.deleteEvent(empid);
    this.getEventList();
}


  submit = (empid) => {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => this.deleteEvent(empid)
          
        },
        {
          label: 'No',
          onClick: () => this.getEventList()
        }
      ]
    })
    this.getEventList();
  };  
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
                                            <Link to={"editevent/" + event._id} className="btn btn-primary"  >Edit</Link>
                 {/* <Button bsStyle="primary" bsSize="large" onClick={}> Edit   </Button> */}
  
                                        </td>
                                        <td>
                                        
                                        {/* <button onClick={this.submit(event._id)}>Confirm dialog</button> */}
                                            <Button onClick={() => this.submit(event._id)} bsStyle="danger" >Delete</Button>
                                        
                        {/* <Button onClick={() => {if(cofirm('Delete the item?')){this.deleteEvent(event._id)};}}  bsStyle="danger" >Delete</Button> */}
                                        
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