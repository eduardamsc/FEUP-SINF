import React, { Component } from 'react';
import { Table, NavLink } from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';


class Wave extends Component {

  constructor(props) {
      super(props);
        this.state = {
            error: null,
            isLoaded: false,
            articles: []
        };

    }

  async componentDidMount() {
    
      const route = 'http://localhost:5000/articles';
      
      fetch(route)
          .then(res => res.json()
          )
          .then(
            (result) => {
              this.setState({
                isLoaded: true,
                articles: result
              })
            });


  }

    render() {
        const { articles } = this.state;

        return (
            <div>
                <ul>
                    {articles.map(article => (
                        <li key={article.Artigo}>
                        {article.Artigo}
                        </li>
                    ))}
                </ul>


          <div>
            <div>
                <h4>Picking Wave to be prepared</h4>
                  <h5>Picking Wave 1</h5>
                  <h5>Date</h5>
            </div>
            <Table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td><NavLink to="/wave/productLocation" tag={RRNavLink}>Rice</NavLink></td>
                  <td>100</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td><NavLink to="/wave/productLocation" tag={RRNavLink}>Eggs</NavLink></td>
                  <td>2000</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td><NavLink to="/wave/productLocation" tag={RRNavLink}>Bananas</NavLink></td>
                  <td>150</td>
                </tr>
              </tbody>
            </Table>
          </div>

          </div>
        );
    }
}

export default Wave;
