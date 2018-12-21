import React, { Component } from 'react';
import { InputGroup, Input, Button } from 'reactstrap';

class ProductLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      checkDigit:'',
      location: '',
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
      if(responseJson) {
        if(!responseJson.notEnoughQuantity) {
          this.setState({
            product: responseJson,
            location: responseJson.location
          });
        } else {
          this.props.history.push(`/salesOrderToBePrepared`);
        }
      } else {
        const route2 = 'http://localhost:5000/deliveryNote';

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
              salesOrderId: this.state.salesOrderId,
            })
        })
        .then((response) => response.json())
        .then((responseJson) => {
          this.props.history.push(`/salesOrderToBePrepared`);
        })
        .catch((error) => {
          alert('Error on Delivery Note, please try again');
        });
      }
    })
    .catch((error) => {
      alert('Error on Check Digit, please try again');
    });
  }


  handleSubmit() {
    const route = 'http://localhost:5000/checkDigit';

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
          checkDigit: this.state.checkDigit,
          location: this.state.location,
          salesOrderId: this.state.salesOrderId
        })
    })
    .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.length) {
          this.props.history.push(`/salesOrderToBePrepared/productUnits/${this.state.salesOrderId}`);
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
                <h4>Product Location {product.location}</h4>
              </div>
              <div className="row information">
                <h5 className="col-11">Product {product.product}</h5>
                <h5 className="col-1">Date</h5>
              </div>
              <div className="row justify-content-center enter">
                <h3>Enter location's check digit:</h3>
              </div>

              <div className="inputGroup row container justify-content-center">
                <InputGroup className="col-12"size="lg">
                  <Input
                    name="checkDigit"
                    type="text"
                    placeholder="Check Digit"
                    value={this.state.checkDigit}
                    onChange={this.handleInputChange}
                  />
                </InputGroup>
                <Button className="submit"color="danger" onClick={this.handleSubmit}>OK</Button>
              </div>

            </div>
        );
    }
}

export default ProductLocation;
