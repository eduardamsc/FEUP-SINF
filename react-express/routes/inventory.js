const express = require('express')
const router = express.Router()
const primavera = require('../primavera')

router.get('/', function(req, res){
  const query = "SELECT Artigo, INV_ValoresActuaisStock.Localizacao, Stock FROM INV_ValoresActuaisStock, ArmazemLocalizacoes WHERE INV_ValoresActuaisStock.Localizacao=ArmazemLocalizacoes.Localizacao  ";
  console.log(req.session);
  
  primavera.query(req.session.primavera.access_token, query)
  .then(response => {
    //console.log(JSON.parse(response))
    res.status(200).json(JSON.parse(response))
  })
  .catch(error => {
    //console.error(error)
    res.status(500).send(error)
  })
})

module.exports = router
