import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
// To use routing functionalities
import { Link } from 'react-router-dom';
import '../index.css';




class Header extends Component {
    render() {
        return (
            <div>
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="javascript:void(0)">MATCH EVENT MANAGMENT</a>
                        </Navbar.Brand>
                    </Navbar.Header>
                    <Nav>
                        <NavItem href="javascript:void(0)">
                            <Link to="/">Home</Link>
                        </NavItem>
                        <NavItem href="javascript:void(0)">
                            <Link to="/addevent">Add New event</Link>
                        </NavItem>
                    </Nav>
                </Navbar>

                    {/* <Navbar inverse fixedTop>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/">React-Bootstrap</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavItem eventKey={1}
                            href="/about">About</NavItem>
                        <NavItem eventKey={2}
                            href="/contacts">Contact Us</NavItem>
                    
                    <NavItem eventKey={2}
                            href="/">Home</NavItem>
                   
                   <NavItem eventKey={2}
                            href="/addevent">Add Item</NavItem>
                   
                    
                    
                    
                    </Nav>
        </Navbar.Collapse>
        </Navbar> */}





            </div>
        );
    }
}
export default Header;