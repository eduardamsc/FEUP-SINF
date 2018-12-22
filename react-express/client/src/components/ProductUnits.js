import React, { Component } from 'react';
import { Button } from 'reactstrap';

class ProductUnits extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      location: '',
      salesOrderId: this.props.match.params.salesOrderId,
      hasStock: false
    };

    this.handleOkSubmit = this.handleOkSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);


  }

  componentDidMount() {
    const route = 'http://localhost:5000/getProduct';
    fetch(route, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Origin': '*',

        },
        credentials: "include",

        body: JSON.stringify({
          salesOrderId: this.state.salesOrderId,
        })
    })
    .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          product: responseJson,
          location: responseJson.location
        });

      })
      .catch((error) => {
        alert('Error on Check Digit, please try again');
      });
  }

  handleOkSubmit() {
    const route = 'http://localhost:5000/deleteProduct';
    const route2 = 'http://localhost:5000/checkStock';

    fetch(route2, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Origin': '*',

        },
        credentials: "include",

        body: JSON.stringify({
          expectedStock: this.state.product.quantity,
          product: this.state.product.product
        })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if(responseJson[0].Stock < this.state.product.quantity){
        alert("On warehouse, there isn't quantity enough to pick!");
      }
      if(responseJson.length) {
        fetch(route, {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': 'true',
                'Access-Control-Allow-Origin': '*',

            },
            credentials: "include",

            body: JSON.stringify({
              salesOrderId: this.state.salesOrderId,
              product: this.state.product.product
            })
        })
        .then((response) => response.json())
        .then((responseJson) => {
          this.props.history.push(`/salesOrderToBePrepared/productLocation/${this.state.salesOrderId}`);
        })
        .catch((error) => {
          alert('Error, please try again');
        });

      }
    })
    .catch((error) => {
      alert("On warehouse, there isn't quantity enough to pick!");
    });

  }

  handleClick() {
    const route = 'http://localhost:5000/checkStock';

    fetch(route, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Origin': '*',

        },
        credentials: "include",

        body: JSON.stringify({
          expectedStock: this.state.product.quantity,
          product: this.state.product.product
        })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if(responseJson[0].Stock > this.state.product.quantity){
        alert("There is enough quantity of this product to pick ("+responseJson[0].Stock+")! You can choose OK button");
      }
    });

    this.props.history.push(`/salesOrderToBePrepared/pickedUnits/${this.state.salesOrderId}`);

  }

    render() {
      const { product } = this.state;

        return (
            <div className="container productLocation">
              <div className="row title">
                <h4>Product Location {product.location}</h4>
              </div>
              <div className="row information">
                <h5 className="col-11">Product {product.product}</h5>
                <h5 className="col-1">Date</h5>
              </div>
              <div className="row justify-content-center">
                <p>Quantity: {product.quantity} units</p>
              </div>
              <div className="row justify-content-center">
                <Button className="submit"color="secondary" onClick={this.handleOkSubmit}>OK</Button>
              </div>
              <div className="row justify-content-center">
                <Button className="units"color="danger" onClick={this.handleClick}>Not enough units</Button>
              </div>
            </div>
        );
    }
}

export default ProductUnits;
