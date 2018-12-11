import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { Route, NavLink as RRNavLink, BrowserRouter } from 'react-router-dom';
import Home from './Home';
import Wave from './Wave';
import SignIn from './SignIn';
import ProductLocation from './ProductLocation';

class MainContainer extends Component {
      async componentDidMount() {
        
        const route = 'http://localhost:5000/login';
      
        fetch(route, {
          method: "post"
        });
    }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar color="light" light expand="md">
            <NavbarBrand href="/">
            Home
            </NavbarBrand>
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
          <Route exact path="/wave" component={Wave} />
          <Route exact path="/signIn" component={SignIn} />
          <Route path="/wave/productLocation" component={ProductLocation} />
        </div>
      </BrowserRouter>
    );
  }
}

export default MainContainer;
