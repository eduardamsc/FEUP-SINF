import React, { Component } from 'react';
import { Collapse, Button, CardBody, Card,Input,FormGroup } from 'reactstrap';

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
                salesOrders: result.DataSet.Table
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
            <Button className="salesOrderBtn" onClick={this.toggle}>
                <div className="d-flex justify-content-between">
                    <div class="round">
                        <Input  id="checkbox" addon type="checkbox" aria-label="Checkbox for following text input" />
                        <label for="checkbox"></label>
                    </div>
                    <p>Sales Order 1 - Store 43 - Order Date </p>
                    <FormGroup>
                        <Input type="select" name="picker" id="exampleSelect">
                            <option>Picker 1</option>
                            <option>Picker 2</option>
                            <option>Picker 3</option>
                            <option>Picker 4</option>
                            <option>Picker 5</option>
                        </Input>
                    </FormGroup>
                </div>
            </Button>
            <Collapse isOpen={this.state.collapse}>
              <Card>
                <CardBody>
                    <p>Product - P1 location - 2 unit </p>
                    <p>Product - P3 location - 5 unit </p>
                    <p>Product - P6 location - 8 unit </p>
                </CardBody>
              </Card>
            </Collapse>
            <ul>
          {salesOrders.map(salesOrder => (
            <li key={salesOrder.Entidade}>
              {salesOrder.Artigo} {salesOrder.Quantidade} {salesOrder.Localizacao}
            </li>
          ))}
        </ul>
          </div>
        );
      }
}

export default SalesOrder;
