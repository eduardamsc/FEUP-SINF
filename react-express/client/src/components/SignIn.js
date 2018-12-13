import React, { Component } from 'react';
import { Container, Col, Form, FormGroup, Input, Button } from 'reactstrap';

class SignIn extends Component {

    constructor(props) {
        super(props);
          this.state = {
          id:'',
          username: '',
          name: '',
          password: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

      }

      handleInputChange(event) {
          this.setState({
              [event.target.name]: event.target.value
          });
      }

      handleSubmit(event){
        event.preventDefault();
        const route = 'http://localhost:5000/login';
        fetch(route, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state),
        })
        .then(response => response.json());
    }

    render() {
      const { user } = this.state;
      
        return (
         <Container className="App">
            <h2>Sign In</h2>
            <Form className="form col-12">
              <Col>
                <FormGroup>
                  <Input
                    name="username"
                    placeholder="Username"
                    value={this.state.username}
                    onChange={this.handleInputChange}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Input
                    name="password"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.handleInputChange}
                  />
                </FormGroup>
              </Col>
              <Button className="btn btn-outline-secondary btn-lg" onClick={this.handleSubmit}>Sign In</Button>
            </Form>
          </Container>
        );
    }
}
    export default SignIn;
