import React, { Component } from 'react';
import { Table, NavLink } from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';

class Wave extends Component {
    render() {
        return (
          <div>
            <div>
                <h4>Picking Wave to be prepared</h4>
                  <h5>Picking Wave 1</h5>
                  <h5>Date</h5>
            </div>
            <Table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td><NavLink to="/wave/productLocation" tag={RRNavLink}>Rice</NavLink></td>
                  <td>100</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td><NavLink to="/wave/productLocation" tag={RRNavLink}>Eggs</NavLink></td>
                  <td>2000</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td><NavLink to="/wave/productLocation" tag={RRNavLink}>Bananas</NavLink></td>
                  <td>150</td>
                </tr>
              </tbody>
            </Table>
          </div>
        );
    }
}

export default Wave;
