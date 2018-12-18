import React, { Component } from 'react';
import { NavLink, Button } from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';
import ProductLocation from './ProductLocation';


class SalesOrderToBePrepared extends Component {
    constructor(props) {
        super(props);
        this.state = {
          products: [],
          salesOrderId: null,
        };
        this.handleClick = this.handleClick.bind(this);
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
              salesOrderId: responseJson.products[0].IdCabecDoc,
              data: responseJson.data
            });

          })
          .catch((error) => {
            console.error(error);
            alert('Error logging in please try again');
          });

      }

      handleClick() {
        this.props.history.push(`/salesOrderToBePrepared/productLocation/${this.state.salesOrderId}`);
      }

    render() {
        const { products, data, salesOrderId } = this.state;

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
              <div className="tablePW">
                  <table className="table table-hover">
                  <thead>
                      <tr>
                      <th scope="col">#</th>
                      <th scope="col">Product</th>
                      <th scope="col">Quantity</th>
                      </tr>
                  </thead>
                  <tbody>
                    {products.map(product => (
                    <tr key={product.Artigo}>
                      <th scope="row">{productNumber++}</th>
                      <td>{product.Artigo}</td>
                      <td>{product.Quantidade}</td>
                    </tr>
                    ))}
                  </tbody>
                  </table>
              </div>
              <div className="d-flex justify-content-end">
                <Button className="startPicking" onClick={this.handleClick}>
                 Start Picking
               </Button>
              </div>

          </div>
        );
    }
}

export default SalesOrderToBePrepared;
