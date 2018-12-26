import React, { Component } from 'react';
import { InputGroup, Input, Button } from 'reactstrap';

class ProductUnits extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      pickedUnits: '',
      salesOrderId: this.props.match.params.salesOrderId
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleInputChange(event) {
      this.setState({
          [event.target.name]: event.target.value
      });
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
        alert('Error, please try again');
      });
  }


    handleSubmit() {
      const route2 = 'http://localhost:5000/checkStock';
      const route = 'http://localhost:5000/updateProduct';

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
            product: this.state.product.product,
            expectedStock: this.state.pickedUnits
          })
      })
      .then((response) => response.json())
      .then((responseJson) => {
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
                product: this.state.product.product,
                salesOrderId: this.state.salesOrderId,
                quantity: this.state.pickedUnits
              })
          })
          .then((response) => response.json())
          .then((responseJson) => {
            this.props.history.push(`/salesOrderToBePrepared/productLocation/${this.state.salesOrderId}`);
          })
          .catch((error) => {
            alert('Error on Check Digit, please try again');
          });
        }
      })
      .catch((error) => {
        alert('Error on Check Digit, please try again');
      });
    }

    render() {
      const { product } = this.state;

        return (
            <div className="container productLocation">
              <div className="row title">
                <h4>Product {product.location}</h4>
              </div>
              <div className="row information">
                <h5 className="col-11">Product {product.product}</h5>
                <h5 className="col-1">Date</h5>
              </div>
              <div className="row justify-content-center">
                <p>Quantity: {product.quantity} units</p>
              </div>
              <div className="row justify-content-center">
                <p>Picked: </p>
                <InputGroup className="col-2"size="lg">
                  <Input
                    name="pickedUnits"
                    type="text"
                    placeholder="Picked Units"
                    value={this.state.pickedUnits}
                    onChange={this.handleInputChange}
                  />
                </InputGroup>
                <p>units </p>
              </div>
              <div className="row justify-content-center">
                <Button className="submit"color="secondary" onClick={this.handleSubmit}>OK</Button>
              </div>
            </div>
        );
    }
}

export default ProductUnits;
