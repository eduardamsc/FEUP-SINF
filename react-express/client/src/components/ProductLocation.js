import React, { Component } from 'react';
import { InputGroup, Input, Button } from 'reactstrap';

class ProductLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      checkDigit:'',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    this.setState({
        [event.target.name]: event.target.value
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
          salesOrderId: this.props.match.params.salesOrderId,
        })
    })
    .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
      })
      .catch((error) => {
        alert('Error on Check Digit, please try again');
      });
  }
    render() {
        return (
            <div className="container productLocation">
              <div className="row title">
                <h4>Product Location</h4>
              </div>
              <div className="row information">
                <h5 className="col-11">Product </h5>
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
