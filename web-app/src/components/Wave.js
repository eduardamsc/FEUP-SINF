import React, { Component } from 'react';
import { Table, NavLink } from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';

const API_ENDPOINT = 'http://localhost:2018/WebApi';

export function makeRequestBody(body) {
    let formData = new URLSearchParams();

    for (var key in body) {
      formData.append(key, body[key]);
    }

    return formData;
};

export function authenticate() {
    return fetch(`${API_ENDPOINT}/token`, {
        method: 'POST',
        body: makeRequestBody(
            {
                username: 'FEUP',
                password: 'qualquer1',
                company: 'demo',
                instance: 'DEFAULT',
                line: 'professional',
                grant_type: 'password'
            }
        ),
    });
}

class Wave extends Component {

  constructor(props) {
      super(props);
        this.state = {
            error: null,
            isLoaded: false,
            //projects: []
        };

    }

  componentDidMount() {
      const route = API_ENDPOINT;
      fetch(route)
          .then(res => res.json())
          .then(
              (result) => {
                  this.setState({
                      isLoaded: true,
                  });
              },
              (error) => {
                  this.setState({
                      isLoaded: true,
                      error
                  });
              }
          );

  }

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
