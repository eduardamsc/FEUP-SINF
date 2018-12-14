import React, { Component } from 'react';
import { Container, Button } from 'reactstrap';

class Home extends Component {
    componentDidMount(){
      this.props.onChildUnsetAuthenticated();
    }

    render() {
        return (
            <Container className="Welcome">
            <div className="description ">
                <h1>    Hello, Welcome To Warehouse!
                    <p>   Are you a picker? We are going to help you improve your work.</p>
                <Button href="SignIn" className="btn btn-outline-secondary btn-lg">Sign In</Button>
                   </h1>
            </div>
            </Container>

        );
    }
}

export default Home;
