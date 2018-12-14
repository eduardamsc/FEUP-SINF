import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { Route, NavLink as RRNavLink, BrowserRouter } from 'react-router-dom';
import Home from './Home';
import Wave from './Wave';
import SignIn from './SignIn';
import ProductLocation from './ProductLocation';
import ProductUnits from './ProductUnits';
import PickedUnits from './PickedUnits';
import GoodJob from './GoodJob';
import SalesOrder from './SalesOrder';
import Warehouse from './Warehouse';
import Pickers from './Pickers';
import Logo from '../assets/logo.png';

class MainContainer extends Component {
    constructor(props) {
         super(props);
         this.state = {
             isAuthenticated: false
         };
     }

   handleChildSetAuthenticated = () =>{
       this.setState({
           isAuthenticated: true
       });
   }

   handleChildUnsetAuthenticated = () =>{
       this.setState({
           isAuthenticated: false
       });
   }

   handleGetIsAuthenticated = () => {
       return this.state.isAuthenticated;
   }


  render() {
    let navbar;
     if (this.handleGetIsAuthenticated()) {
       navbar = <Nav className="ml-auto" navbar>
         <NavItem>
           <NavLink to="/wave" tag={RRNavLink}>Hi, picker!</NavLink>
         </NavItem>
         <NavItem>
           <NavLink className="logout" to='/' tag={RRNavLink}>Logout</NavLink>
         </NavItem>
       </Nav>;
     } else {
       navbar = null;
     }

    return (
      <BrowserRouter>
        <div>
          <Navbar color="light" light expand="md">
            <NavbarBrand href="/">
            <img className="logo" src={Logo} alt="logo"/>
            </NavbarBrand>
            {navbar}
          </Navbar>
          <Route exact path="/" render={(props)=>
                          <Home {...props}
                              onChildSetAuthenticated={this.handleChildSetAuthenticated}
                              onGetIsAuthenticated={this.handleGetIsAuthenticated}
                              onChildUnsetAuthenticated={this.handleChildUnsetAuthenticated}/>}/>
          <Route path='/signIn' render={(props)=>
                          <SignIn {...props}
                              onChildSetAuthenticated={this.handleChildSetAuthenticated}
                              onGetIsAuthenticated={this.handleGetIsAuthenticated}
                              onChildUnsetAuthenticated={this.handleChildUnsetAuthenticated}/>}/>
          <Route exact path="/wave" component={Wave} />
          <Route path="/wave/productLocation" component={ProductLocation} />
          <Route path="/wave/productUnits" component={ProductUnits} />
          <Route path="/wave/pickedUnits" component={PickedUnits} />
          <Route path="/goodJob" component={GoodJob} />
          <Route path="/salesOrder" component={SalesOrder} />
          <Route path="/warehouse" component={Warehouse} />
          <Route path="/pickers" component={Pickers} />
        </div>
      </BrowserRouter>
    );
  }
}

export default MainContainer;
