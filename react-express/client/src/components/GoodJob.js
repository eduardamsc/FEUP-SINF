import React, { Component } from 'react';
import Smile from '../assets/smile.png';

class ProductUnits extends Component {
    render() {
        return (
            <div className="container goodJob">
              <div className="row information">
                <h5>Date</h5>
              </div>
              <div className="row justify-content-center">
                <img alt="smile" src={Smile} className="smile"/>
              </div>
              <div className="row justify-content-center infoJob">
                <p>GOOD JOB!</p>
              </div>
              <div className="row justify-content-center">
                <p>You can go Home!</p>
              </div>
            </div>
        );
    }
}

export default ProductUnits;
