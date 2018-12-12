import React, { Component } from 'react';
import LeftArrow from '../assets/left-arrow.png';
import RightArrow from '../assets/right-arrow.png';
class Warehouse extends Component {
      render() {
        return (
            <div className="container warehouseDiv">
                <div className="row  warehouse justify-content-center">
                    <div className="col-1 square">
                    </div>
                    <div className="col-1 square">
                    </div>
                    <div className="col-1">
                    </div>
                    <div className="col-1 square">
                    </div>
                    <div className="col-1 square">
                    </div>
                    <div className="col-1 ">
                    </div>
                    <div className="col-1 square">
                    </div>
                    <div className="col-1 square">
                    </div>
                    <div className="col-1 ">
                    </div>
                    <div className="col-1 square">
                    </div>
                    <div className="col-1 square">
                    </div>
                </div>
                <div className="row  warehouse2 justify-content-center">
                <div className="col-1 square">
                    </div>
                    <div className="col-1 square">
                    </div>
                    <div className="col-1">
                    </div>
                    <div className="col-1 square">
                    </div>
                    <div className="col-1 square">
                    </div>
                    <div className="col-1 ">
                    </div>
                    <div className="col-1 square">
                    </div>
                    <div className="col-1 square">
                    </div>
                    <div className="col-1 ">
                    </div>
                    <div className="col-1 square">
                    </div>
                    <div className="col-1 square">
                    </div>
                </div>
                <div className="row  warehouse2 justify-content-center">
                <div className="col-1 square">
                    </div>
                    <div className="col-1 square">
                    </div>
                    <div className="col-1">
                    </div>
                    <div className="col-1 square">
                    </div>
                    <div className="col-1 square">
                    </div>
                    <div className="col-1 ">
                    </div>
                    <div className="col-1 square">
                    </div>
                    <div className="col-1 square">
                    </div>
                    <div className="col-1 ">
                    </div>
                    <div className="col-1 square">
                    </div>
                    <div className="col-1 square">
                    </div>
                </div>
                <div className="row  warehouse2 justify-content-center">
                <div className="col-1 square">
                    </div>
                    <div className="col-1 square">
                    </div>
                    <div className="col-1">
                    </div>
                    <div className="col-1 square">
                    </div>
                    <div className="col-1 square">
                    </div>
                    <div className="col-1 ">
                    </div>
                    <div className="col-1 square">
                    </div>
                    <div className="col-1 square">
                    </div>
                    <div className="col-1 ">
                    </div>
                    <div className="col-1 square">
                    </div>
                    <div className="col-1 square">
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-1">
                        <img alt="arrow"  src={LeftArrow} className="leftArrow"/>
                    </div>
                    <div className="col-1">
                        <img alt="arrow"  src={RightArrow} className="leftArrow"/>
                    </div>
                    <div className="col-1">
                    </div>
                    <div className="col-1">
                        <img alt="arrow" src={LeftArrow} className="leftArrow2"/>
                    </div>
                    <div className="col-1">
                        <img alt="arrow" src={RightArrow} className="leftArrow2"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-1">
                       <p>A</p>
                    </div>
                    <div className="col-1">
                       <p>B</p>
                    </div>
                    <div className="col-1">
                    </div>
                    <div className="col-1">
                       <p>C</p>
                    </div>
                    <div className="col-1">
                       <p>D</p>
                    </div>
                </div>
             </div>
          
        );
      }
}

export default Warehouse;
