import React, { Component } from 'react';
import { Container, Col, Form, FormGroup, Input, Button } from 'reactstrap';
  
class SignIn extends Component {
    constructor(props) {
        super(props);
          this.state = {
          id:'',
          name: '',
          password: '',
        }
        this.handleChange = this.handleChange.bind(this);
      }

    componentDidMount(){
      fetch('/login')
      .then(res => res.json())
      .then(
        (result)
      )
    }
    
    
      handleChange = async (event) => {
        const { target } = event;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const { name } = target;
        await this.setState({
          [ name ]: value,
        });
      }

      handleLogin(){
        this.setState()
      }

    render() {
        return (
          <Container className="App">
            <h2>Sign In</h2>
            <Form className="form col-12">
              <Col>
                <FormGroup>
                  <Input
                    type="username"
                    name="username"
                    id="exampleUsername"
                    placeholder="Username"
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Input
                    type="password"
                    name="password"
                    id="examplePassword"
                    placeholder="Password"
                  />
                </FormGroup>
              </Col>
              <Button className="btn btn-outline-secondary btn-lg" onClick={this.handleLogin}>Sign In</Button>
            </Form>
          </Container>
        );
    }
}
    export default SignIn;
