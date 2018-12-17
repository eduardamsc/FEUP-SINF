const express = require('express')
const router = express.Router()
const primavera = require('../primavera')

router.get('/', function(req, res){
  const query = "SELECT  Localizacao,Armazem, Descricao FROM ArmazemLocalizacoes";
  console.log(req.session);

  primavera.query(req.session.primavera.access_token, query)
  .then(response => {
    //console.log(JSON.parse(response))
    var warehouse = [];
    var response = JSON.parse(response).DataSet.Table;

    for(var i = 0; i < response.length; i++) {
      console.log(response[i].Localizacao);
      if(response[i].Localizacao != "A1" && response[i].Localizacao != "A1.1" && response[i].Localizacao != "A1.2" && response[i].Localizacao != "A1.3" && response[i].Localizacao != "A1.4") {
        console.log(response[i].Localizacao);
        warehouse.push(response[i]);
      }
    }
    res.status(200).json(warehouse)
  })
  .catch(error => {
    //console.error(error)
    res.status(500).send(error)
  })
})

module.exports = router
