import React, { Component } from 'react';
import { Table, NavLink } from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';

const API_ENDPOINT = 'http://localhost:2018/WebApi';
var token;

export function makeRequest(body) {
    let formData = new URLSearchParams();

    for (var key in body) {
      formData.append(key, body[key]);
    }

    return formData;
};

export function authenticate() {

    return fetch(`${API_ENDPOINT}/token`, {
        method: 'POST',
        body: makeRequest(
            {
                username: 'FEUP',
                password: 'qualquer1',
                company: 'BELAFLOR',
                instance: 'DEFAULT',
                Line: 'Professional',
                grant_type: 'password'
            }
        ),
    }).then(function(response){
        return response.json();
    }).then(function(data) {
        token = data.access_token;
        console.log(token);

    });
}

class Wave extends Component {

  constructor(props) {
      super(props);
        this.state = {
            error: null,
            isLoaded: false,
            companies: []
        };

    }

  async componentDidMount() {
      if(token == null){
        await authenticate();
        console.log("\nFEZ AUTHENTICATE")

      }
      const route = API_ENDPOINT + '/Administrador/ListaEmpresas';
      console.log('Bearer ' + token);

      fetch(route, {
          headers: makeRequest({
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/x-wwww-form-urlencoded'
          }),
        })
        .then(function(response){
            return response.json();
        }).then(
            (result) => {
              this.setState({
                isLoaded: true,
                companies: result
              })
            });


  }

    render() {
        const { companies } = this.state;

        return (
            <div>
                <ul>
                    {companies.map(company => (
                        <li key={company.name}>
                        {company.name} {company.price}
                        </li>
                    ))}
                </ul>


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

          </div>
        );
    }
}

export default Wave;
