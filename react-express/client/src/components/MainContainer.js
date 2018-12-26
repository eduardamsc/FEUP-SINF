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
             isAuthenticated: false,
             username: '',
             userType: ''
         };
     }

   handleChildSetAuthenticated = (username, userType) =>{
       this.setState({
           isAuthenticated: true,
           username: username,
           userType: userType
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
     if (this.handleGetIsAuthenticated() && this.state.userType === 'picker') {
       navbar = <Nav className="ml-auto" navbar>
         <NavItem>
            <NavLink to="/salesOrderToBePrepared" tag={RRNavLink}>Hi, {this.state.username}!</NavLink>
         </NavItem>
         <NavItem>
           <NavLink className="logout" to='/' tag={RRNavLink}>Logout</NavLink>
         </NavItem>
       </Nav>;
     } else if (this.handleGetIsAuthenticated() && this.state.userType === 'manager'){
      navbar = <Nav className="ml-auto" navbar>
      <NavItem>
         <NavLink to="/salesOrders" tag={RRNavLink}>Hi, {this.state.username}!</NavLink>
      </NavItem>
      <NavItem>
         <NavLink to="/salesOrders" tag={RRNavLink}>Sales Orders</NavLink>
      </NavItem>
      <NavItem>
         <NavLink to="/pickers" tag={RRNavLink}>Pickers</NavLink>
      </NavItem>
      <NavItem>
         <NavLink to="/warehouse" tag={RRNavLink}>Warehouse</NavLink>
      </NavItem>
      <NavItem>
        <NavLink className="logout" to='/' tag={RRNavLink}>Logout</NavLink>
      </NavItem>
    </Nav>;
     }else {
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
          <Route path="/salesOrderToBePrepared/productLocation/:salesOrderId" component={ProductLocation} />
          <Route path="/salesOrderToBePrepared/productUnits/:salesOrderId" component={ProductUnits} />
          <Route path="/salesOrderToBePrepared/pickedUnits/:salesOrderId" component={PickedUnits} />
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
