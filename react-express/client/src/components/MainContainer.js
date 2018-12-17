import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { Route, NavLink as RRNavLink, BrowserRouter } from 'react-router-dom';
import Home from './Home';
import SalesOrderToBePrepared from './SalesOrderToBePrepared';
import SignIn from './SignIn';
import ProductLocation from './ProductLocation';
import ProductUnits from './ProductUnits';
import PickedUnits from './PickedUnits';
import GoodJob from './GoodJob';
import SalesOrders from './SalesOrders';
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
          <Route exact path="/salesOrderToBePrepared" component={SalesOrderToBePrepared} />
          <Route path="/salesOrderToBePrepared/productLocation" component={ProductLocation} />
          <Route path="/salesOrderToBePrepared/productUnits" component={ProductUnits} />
          <Route path="/salesOrderToBePrepared/pickedUnits" component={PickedUnits} />
          <Route path="/goodJob" component={GoodJob} />
          <Route path="/salesOrders" component={SalesOrders} />
          <Route path="/warehouse" component={Warehouse} />
          <Route path="/pickers" component={Pickers} />
        </div>
      </BrowserRouter>
    );
  }
}

export default MainContainer;
