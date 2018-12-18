const express = require('express')
const router = express.Router()
const primavera = require('../primavera')

router.get('/', function(req, res){
  const query = "SELECT Cliente, Nome, Fac_Mor, Pais, Fac_Local FROM Clientes WHERE Fac_Local='Porto'"
  primavera.query(req.session.primavera.access_token, query)
  .then(response => {
    res.status(200).json(JSON.parse(response).DataSet.Table)
  })
  .catch(error => {
    res.status(500).send(error)
  })
})

module.exports = router
