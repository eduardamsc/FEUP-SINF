const express = require('express')
const router = express.Router()
const primavera = require('../primavera')

router.get('/', function(req, res){
  const query = "SELECT  Localizacao,Armazem, Descricao FROM ArmazemLocalizacoes";

  primavera.query(req.session.primavera.access_token, query)
  .then(response => {
    //console.log(JSON.parse(response))
    var warehouse = [];
    var response = JSON.parse(response).DataSet.Table;

    const query2 = "SELECT  Localizacao,Artigo, Stock FROM INV_ValoresActuaisStock";
    primavera.query(req.session.primavera.access_token, query2)
    .then(stocks => {
      stocks = JSON.parse(stocks).DataSet.Table;

      for(var i = 0; i < response.length; i++) {
        if(response[i].Localizacao != "A1" && response[i].Localizacao != "A1.1" && response[i].Localizacao != "A1.2" && response[i].Localizacao != "A1.3" && response[i].Localizacao != "A1.4") {
          response[i].product = {Artigo: '', Stock: ''};
          for(var j = 0; j < stocks.length; j++) {
            if(stocks[j].Localizacao == response[i].Localizacao) {
              response[i].product = stocks[j];
            }
          }
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
  .catch(error => {
    //console.error(error)
    res.status(500).send(error)
  })
})

module.exports = router
