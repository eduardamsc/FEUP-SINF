import React, { Component } from 'react';
import { NavLink } from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';


class Wave extends Component {

    render() {
        return (
            <div className="container productLocation">
              <div className="row title">
                  <h4>Sales Order to be prepared</h4>
              </div>
              <div className="row information">
                <h5 className="col-11">Sales Order 1</h5>
                <h5 className="col-1">Date</h5>
              </div>
              <div class="tablePW">
                  <table class="table table-hover">
                  <thead>
                      <tr>
                      <th scope="col">#</th>
                      <th scope="col">Product</th>
                      <th scope="col">Quantity</th>
                      </tr>
                  </thead>
                  <tbody>
                    <tr> 
                      <th scope="row">1</th>
                      <td><NavLink to="/wave/productLocation" tag={RRNavLink}>Rice</NavLink></td>
                      <td>100</td>
                    </tr>
                  </tbody>
                  </table>
              </div>
          </div>
        );
    }
}

export default Wave;
