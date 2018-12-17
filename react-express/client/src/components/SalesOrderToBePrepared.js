import React, { Component } from 'react';
import { NavLink, Button } from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';


class SalesOrderToBePrepared extends Component {
    constructor(props) {
        super(props);
        this.state = {
          products: []
        };
      }

      componentDidMount() {
        const route = 'http://localhost:5000/getSalesOrder';

        fetch(route, {
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Access-Control-Allow-Credentials': 'true',
              'Access-Control-Allow-Origin': '*',

          },
          credentials: "include",
        })
        .then((response) => response.json())
          .then((responseJson) => {
            this.setState({
              isLoaded: true,
              products: responseJson.products,
              data: responseJson.data
            });

          })
          .catch((error) => {
            console.error(error);
            alert('Error logging in please try again');
          });

      }

    render() {
        const { products, data } = this.state;
        let productNumber = 1;
        return (
            <div className="container productLocation">
              <div className="row title">
                  <h4>Sales Order to be prepared</h4>
              </div>
              <div className="row information">
                <h5 className="col-10">Sales Order 1</h5>
                <h5 className="col-2">{data}</h5>
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
                    {products.map(product => (
                    <tr>
                      <th scope="row">{productNumber++}</th>
                      <td>{product.Artigo}</td>
                      <td>{product.Quantidade}</td>
                    </tr>
                    ))}
                  </tbody>
                  </table>
              </div>
              <div className="d-flex justify-content-end">
                <Button bsStyle="primary" className="startPicking">
                <NavLink to="/salesOrderToBePrepared/productLocation" tag={RRNavLink}> Start Picking</NavLink>
               </Button>
              </div>

          </div>
        );
    }
}

export default SalesOrderToBePrepared;
