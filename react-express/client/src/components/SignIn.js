import React, { Component } from 'react';
import {
    Container, Col, Form,
    FormGroup, Input,
    Button,
  } from 'reactstrap';
  
class SignUp extends Component {
    constructor(props) {
        super(props);
          this.state = {
          'name': '',
          'email': '',
          'password': '',
          validate: {
            emailState: '',
          },
        }
        this.handleChange = this.handleChange.bind(this);
      }
    
      validateEmail(e) {
        const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const { validate } = this.state
          if (emailRex.test(e.target.value)) {
            validate.emailState = 'has-success'
          } else {
            validate.emailState = 'has-danger'
          }
          this.setState({ validate })
        }
    
      handleChange = async (event) => {
        const { target } = event;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const { name } = target;
        await this.setState({
          [ name ]: value,
        });
      }
    
      submitForm(e) {
        e.preventDefault();
        console.log(`Email: ${ this.state.email }`)
      }
    render() {
        return (
          <Container className="App">
            <h2>Sign In</h2>
            <Form className="form col-12">
              <Col>
                <FormGroup>
                  <Input
                    type="email"
                    name="email"
                    id="exampleEmail"
                    placeholder="Email"
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
              <Button className="btn btn-outline-secondary btn-lg">Sign Up</Button>
            </Form>
          </Container>
        );
    }
}
    export default SignUp;
