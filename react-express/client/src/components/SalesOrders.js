import React, { Component } from 'react';
import ListGroupCollapse from './ListGroupCollapse';

class SalesOrder extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
          collapse: false,
          salesOrders: []
        };
      }

      componentDidMount() {
        const route = 'http://localhost:5000/salesOrders';

        fetch(route, {
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Access-Control-Allow-Credentials': 'true',
              'Access-Control-Allow-Origin': '*',

          },
          credentials: "include",
        })
        .then(res => res.json())
        .then(
            (result) => {
              this.setState({
                isLoaded: true,
                salesOrders: result
              });
            },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
        )
      }

      toggle() {
        this.setState({ collapse: !this.state.collapse });
      }


      render() {
        const { salesOrders } = this.state;
        return (
          <div className="salesOrder container justify-content-center">
       
            {Object.keys(salesOrders).map((key, index) =>
              <ListGroupCollapse key={index} cat={salesOrders[key]} />
            )}
   

          </div>
        );
      }
}

export default SalesOrder;
