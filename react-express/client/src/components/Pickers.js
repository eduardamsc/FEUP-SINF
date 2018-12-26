import React, { Component } from 'react';
import Picker from '../assets/picker.png'

class Pickers extends Component {
    constructor(props) {
        super(props);
        this.state = {
          pickers: []
        };
      }

      componentDidMount() {
        const route = 'http://localhost:5000/pickers';

        fetch(route, {
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Access-Control-Allow-Credentials': 'true',
              'Access-Control-Allow-Origin': '*',

          },
          credentials: "include",
        })
        .then((response) => response.json())
          .then((responseJson) => {
            this.setState({
              isLoaded: true,
              pickers: responseJson,
            });

          })
          .catch((error) => {
            alert('Error logging in please try again');
          });

      }

      render() {
        const { pickers } = this.state;
        return (
            <div className="container pickers justify-content-center">
                  <div className="row">
                  <h4>Pickers</h4>
              </div>
               <div className="row container">
               {pickers.map(picker => (
                    <div className="col-2 picker justify-content-center">
                        <img src={Picker} alt="picker"></img>
                    </div>
               ))}
               </div>
               <div className="row">
               {pickers.map(picker => (
                    <div className="col-2">
                        {picker.name}
                    </div>
               ))}
               </div>
            </div>
        );
      }
}

export default Pickers;
