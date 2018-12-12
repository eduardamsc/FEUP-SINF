import React, { Component } from 'react';
import { InputGroup, Input, Button } from 'reactstrap';

class ProductUnits extends Component {
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
                <p>Quantity: 200 units</p>
              </div>
              <div className="row justify-content-center">
                <Button className="submit"color="secondary">OK</Button>
              </div>
              <div className="row justify-content-center">
                <Button className="units"color="danger">Not enought units</Button>
              </div>
            </div>
        );
    }
}

export default ProductUnits;
