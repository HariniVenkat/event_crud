import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

// Our all component files
import ListEvent from '../Components/ListEvent';
import AddEvent from '../Components/AddEvent';
import EditEvent from '../Components/EditEvent';

class Main extends Component {

    render() {
        return (
            <main>
                <Switch>
                    <Route exact path='/' component={ListEvent} />
                    <Route path='/list' component={ListEvent} />
                    <Route path='/addevent' component={AddEvent} />
                    <Route path='/editevent/:id' component={EditEvent} />
                </Switch>
            </main>
        );
    }
}

export default Main;