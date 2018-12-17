import React from 'react';
import { ListGroupItem, Collapse, Button,Input, FormGroup } from 'reactstrap';

class ListGroupCollapse extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {collapse: false};
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  render() {
    const cat = this.props.cat;
    const pickers = this.props.pickers;

    return (
      <ListGroupItem>
        <div>

          <Button className="salesOrderBtn" onClick={this.toggle}>
                <div className="d-flex justify-content-between">
                    <div class="round">
                        <Input  id="checkbox" addon type="checkbox" aria-label="Checkbox for following text input" />
                        <label for="checkbox"></label>
                    </div>
                    <p>Sales Order {cat.index} - {cat.entidade} - {cat.data} </p>
                    <FormGroup>
                        <Input type="select" name="picker" id="exampleSelect">
                          {pickers.map(picker => (
                              <option>{picker.name}</option>
                          ))}
                        </Input>
                    </FormGroup>
                </div>
            </Button>

          <Collapse isOpen={this.state.collapse}>
            {cat.artigos.map(artigo => (
                <p>
                    {artigo.nome} - {artigo.quantidade} - {artigo.localizacao}
                </p>
            ))}
          </Collapse>
        </div>
      </ListGroupItem>
    );
  }
}

export default ListGroupCollapse
