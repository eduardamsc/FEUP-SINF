const express = require('express')
const router = express.Router()
const primavera = require('../primavera')

router.post('/', function(req, res){
  const query = "SELECT Artigo, Stock FROM INV_ValoresActuaisStock WHERE Artigo='" + req.body.product + "' AND Stock>=" + req.body.expectedStock ;

  primavera.query(req.session.primavera.access_token, query)
  .then(response => {
    res.status(200).json(JSON.parse(response).DataSet.Table)
  })
  .catch(error => {
    res.status(500).send(error)
  })
})

module.exports = router
