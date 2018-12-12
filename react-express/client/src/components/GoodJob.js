import React, { Component } from 'react';
import {Smile} from '../assets/smile.jpg';

class ProductUnits extends Component {
    render() {
        return (
            <div className="container goodJob">
              <div className="row information">
                <h5>Date</h5>
              </div>
              <div className="row">
                <img src={Smile}/>
              </div>
            </div>
        );
    }
}

export default ProductUnits;
