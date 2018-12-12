import React, { Component } from 'react';
import { InputGroup, Input, Button } from 'reactstrap';

class ProductLocation extends Component {
    render() {
        return (
            <div className="container productLocation">
              <div className="row title">
                <h4>Product Location</h4>
              </div>
              <div className="row information">
                <h5 className="col-11">Product XPTO</h5>
                <h5 className="col-1">Date</h5>
              </div>
              <div className="row justify-content-center">
                <h3>Enter location's check digit:</h3>
              </div>
             
              <div className="inputGroup row container justify-content-center">
                <InputGroup className="col-3"size="lg">
                  <Input />
                </InputGroup>
                <InputGroup className="col-3" size="lg">
                  <Input />
                </InputGroup>
                <InputGroup className="col-3" size="lg">
                  <Input />
                </InputGroup>
                <InputGroup className="col-3" size="lg">
                  <Input />
                </InputGroup>
                <Button className="submit"color="danger">OK</Button>
              </div>
              
            </div>
        );
    }
}

export default ProductLocation;
