import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { Route, NavLink as RRNavLink, BrowserRouter } from 'react-router-dom';
import Home from './Home';
import Wave from './Wave';

class MainContainer extends Component {

  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar color="light" light expand="md">
            <NavbarBrand href="/">logo</NavbarBrand>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink to='/' tag={RRNavLink}>Home</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/wave" tag={RRNavLink}>Wave</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="logout" to='/' tag={RRNavLink}>Logout</NavLink>
                </NavItem>
              </Nav>
          </Navbar>
          <Route exact path="/" component={Home} />
          <Route path="/wave" component={Wave} />
        </div>
      </BrowserRouter>
    );
  }
}

export default MainContainer;
