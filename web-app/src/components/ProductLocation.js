import React, { Component } from 'react';
import { InputGroup, Input, Button } from 'reactstrap';

class ProductLocation extends Component {
    render() {
        return (
            <div>
              <h4>Product Location</h4>
              <h5>Product XPTO</h5>
              <h5>Date</h5>
              <h3>Enter location check digit:</h3>
              <div className="inputGroup">
                <InputGroup size="lg">
                  <Input />
                </InputGroup>
                <InputGroup size="lg">
                  <Input />
                </InputGroup>
                <InputGroup size="lg">
                  <Input />
                </InputGroup>
                <InputGroup size="lg">
                  <Input />
                </InputGroup>
              </div>
              <Button color="danger">OK</Button>
            </div>
        );
    }
}

export default ProductLocation;
