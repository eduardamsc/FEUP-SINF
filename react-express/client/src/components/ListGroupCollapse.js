import React from 'react';
import { ListGroupItem, Collapse, Button,Input, FormGroup } from 'reactstrap';

class ListGroupCollapse extends React.Component {
  constructor(props) {
    super(props);
    this.handlePickerSubmit = this.handlePickerSubmit.bind(this);
    this.handleChangePicker = this.handleChangePicker.bind(this);
    this.toggle = this.toggle.bind(this);
    this.state = {collapse: false, picker: '', index: this.props.cat.index, username_picker: this.props.cat.username_picker};
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  handlePickerSubmit() {
    var username_picker = document.getElementById(this.state.index).querySelector("#exampleSelect").options[document.getElementById(this.state.index).querySelector("#exampleSelect").selectedIndex].value;
    var id_salesOrder = document.getElementById(this.state.index).querySelector("#id_salesOrder").value;
    const route = 'http://localhost:5000/assignSalesOrder';
    fetch(route, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Origin': '*',

        },
        credentials: "include",

        body: JSON.stringify({
          username_picker: username_picker,
          id_salesOrder: id_salesOrder
        })
    })
    .then((response) => response.json())
      .then((responseJson) => {
        document.getElementById(this.state.index).querySelector("#checkbox").checked = true;

      })
      .catch((error) => {
        alert('Error Assigning Picker to Sales Order please try again');
      });
  }

  handleChangePicker(event) {
    document.getElementById(this.state.index).querySelector("#checkbox").checked = false;
    this.setState({username_picker: event.target.value});

  }

  render() {
    const cat = this.props.cat;
    const pickers = this.props.pickers;

    return (
      <ListGroupItem>
        <div>

          <Button id={cat.index} className="salesOrderBtn" onClick={this.toggle}>
                <div className="d-flex justify-content-between">
                    <div className="round">
                        <Input  id="checkbox" addon type="checkbox" aria-label="Checkbox for following text input" onChange={this.handlePickerSubmit} checked={cat.checked}/>
                    </div>
                    <p>Sales Order {cat.index} - {cat.entidade} - {cat.data} </p>
                    <FormGroup>
                      <Input type="select" name="picker" id="exampleSelect" value={this.state.username_picker} onChange={this.handleChangePicker}>
                        {pickers.map(picker => (
                          <option key={picker.username} value={picker.username}>{picker.name}</option>
                        ))}
                      </Input>
                      <Input readOnly type="text" name="idCabecDoc" id="id_salesOrder" style={{display: "none"}} value={cat.IdCabecDoc}>
                      </Input>
                    </FormGroup>
                </div>
            </Button>

          <Collapse isOpen={this.state.collapse}>
            {cat.artigos.map(artigo => (
                <p key={artigo.nome}>
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
