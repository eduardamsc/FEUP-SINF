import React, { Component } from 'react';

class Warehouse extends Component {
  constructor(props) {
      super(props);
      this.state = {
        warehouse: []
      };
      this.state.warehouse["A1"] = [];
      this.state.warehouse["A2"] = [];
      this.state.warehouse["A3"] = [];
      this.state.warehouse["A4"] = [];

      console.log(this.state.warehouse);
    }

    componentDidMount() {
      const route = 'http://localhost:5000/warehouse';

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
          for(var i = 0; i < responseJson.length; i++) {
            if(responseJson[i].Localizacao > "A1.1" && responseJson[i].Localizacao < "A1.2") {
              this.state.warehouse["A1"].push(responseJson[i]);
            }
            else if(responseJson[i].Localizacao > "A1.2" && responseJson[i].Localizacao < "A1.3") {
              this.state.warehouse["A2"].push(responseJson[i]);
            }
            else if(responseJson[i].Localizacao > "A1.3" && responseJson[i].Localizacao < "A1.4") {
              this.state.warehouse["A3"].push(responseJson[i]);
            }
            else if(responseJson[i].Localizacao > "A1.4" && responseJson[i].Localizacao < "A1.5") {
              this.state.warehouse["A4"].push(responseJson[i]);
            }
          }
          this.setState({
            isLoaded: true,
          });

        })
        .catch((error) => {
          console.error(error);
          alert('Error Getting Warehouse please try again');
        });

    }

      render() {
        const { warehouse } = this.state;
        return (
            <div className="container warehouseDiv">
              {Object.keys(warehouse).map((key, index) =>
                <div className="row  warehouse2 justify-content-center">
                  <p>{key}</p>
                  {warehouse[key].map( pos => (
                    <div className="col-1 square">
                    </div>
                  ))}
                </div>
              )}
            </div>

        );
      }
}

export default Warehouse;
