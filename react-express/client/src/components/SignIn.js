import React, { Component } from 'react';
import { Container, Col, Form, FormGroup, Input, Button } from 'reactstrap';
  
class SignIn extends Component {

    constructor(props) {
        super(props);
          this.state = {
          id:'',
          username: '',
          password: '',
          user:''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

      }

    /*login(username, password){
      return{
        request: {
          url:'https://localhost:5000/login',
          data: {
            username: username,
            password: password
          }
        }
      }
    }*/

    onSubmit(){
     // const { username, password } = this.state;
      console.log("Clicou!");
     // this.login(username, password);
     fetch("/login", {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: {
        "username": this.state.username,
        "password": this.state.password
       }

    })
      .then(res => console.log(res)
      )
/*      .then(
        (result) => {
          console.log(result);
          
          this.setState({
            user: result
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
      )*/
    }

    handleInputChange(event){
        this.setState({
          [event.target.name]: event.target.value
        });
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
                    type="username"
                    name="username"
                    id="exampleUsername"
                    placeholder="Username"
                    value={this.state.username}
                    onChange={this.handleInputChange}
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
                    value={this.state.password}
                    onChange={this.handleInputChange}
                  />
                </FormGroup>
              </Col>
              <Button className="btn btn-outline-secondary btn-lg" onClick={this.onSubmit}>Sign In</Button>
            </Form>
          </Container>
        );
    }
}
    export default SignIn;
