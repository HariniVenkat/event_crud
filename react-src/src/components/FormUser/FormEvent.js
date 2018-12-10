import React, { Component } from 'react';
import { Message, Button, Form, Select } from 'semantic-ui-react';
import axios from 'axios';

// const genderOptions = [
//   { key: 'm', text: 'Male', value: 'm' },
//   { key: 'f', text: 'Female', value: 'f' },
//   { key: 'o', text: 'Do Not Disclose', value: 'o' }
// ]

class FormEvent extends Component {

  constructor(props) {
    super(props);
    
    this.state = {

      description: '',
      
      date: '',
      time: '',
      numpeople: '',
      
      formClassName: '',
      formSuccessMessage: '',
      formErrorMessage: ''
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    // Fill in the form with the appropriate data if user id is provided
    if (this.props.eventID) {
      axios.get(`${this.props.server}/api/events/${this.props.eventID}`)
     
      .then((response) => {
        this.setState({
          description: response.data.description,
          date: response.data.date,
          time: (response.data.time === null) ? '' : response.data.time,
          numpeople: response.data.numpeople,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }

  handleInputChange(e) {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({ [name]: value });
  }

  // handleSelectChange(e, data) {
  //   this.setState({ numpeople: data.value });
  // }

  handleSubmit(e) {
    // Prevent browser refresh
    e.preventDefault();

    const event = {
      description: this.state.description,
      date: this.state.email,
      time: this.state.time,
      numpeople: this.state.numpeople
    }

    // Acknowledge that if the user id is provided, we're updating via PUT
    // Otherwise, we're creating a new data via POST
    const method = this.props.eventID ? 'put' : 'post';
    const params = this.props.eventID ? this.props.eventID : '';

    axios({
      method: method,
      responseType: 'json',
      url: `${this.props.server}/api/events/${params}`,
      data: event
    })
    .then((response) => {
      this.setState({
        formClassName: 'success',
        formSuccessMessage: response.data.msg
      });

      if (!this.props.eventID) {
        this.setState({
          description: '',
          date: '',
          time: '',
          numpeople: ''
        });
        this.props.onEventAdded(response.data.result);
        this.props.socket.emit('add', response.data.result);
      }
      else {
        this.props.onEventUpdated(response.data.result);
        this.props.socket.emit('update', response.data.result);
      }
      
    })
    .catch((err) => {
      if (err.response) {
        if (err.response.data) {
          this.setState({
            formClassName: 'warning',
            formErrorMessage: err.response.data.msg
          });
        }
      }
      else {
        this.setState({
          formClassName: 'warning',
          formErrorMessage: 'Something went wrong. ' + err
        });
      }
    });
  }

  render() {

    const formClassName = this.state.formClassName;
    const formSuccessMessage = this.state.formSuccessMessage;
    const formErrorMessage = this.state.formErrorMessage;

    return (
      <Form className={formClassName} onSubmit={this.handleSubmit}>
        <Form.Input
          label='EVENT DESCRIPTION'
          type='text'
          placeholder=''
          name='description'
          maxLength='40'
          required
          value={this.state.name}
          onChange={this.handleInputChange}
        />


         <Form.Input
          label='DATE'
          type='text'
          placeholder=''
          name='date'
          maxLength='40'
          required
          value={this.state.name}
          onChange={this.handleInputChange}
        />
        <Form.Input
          label='TIME'
          type='text'
          placeholder=''
          name='time'
          maxLength='40'
          required
          value={this.state.name}
          onChange={this.handleInputChange}
        />
       
        <Form.Input
          label='NUM OF PEOPLE'
          type='email'
          placeholder=''
          name='numpeople'
          maxLength='40'
          required
          value={this.state.email}
          onChange={this.handleInputChange}
        />
       
        
        <Message
          success
          color='green'
          header='Nice one!'
          content={formSuccessMessage}
        />
        <Message
          warning
          color='yellow'
          header='Woah!'
          content={formErrorMessage}
        />

        <Button color={this.props.buttonColor} floated='right'>{this.props.buttonSubmitTitle}</Button>
        <br /><br /> {/* Yikes! Deal with Semantic UI React! */}

      </Form>
    );
  }
}

export default FormEvent;
