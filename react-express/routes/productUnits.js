const express = require('express')
const router = express.Router()
const primavera = require('../primavera')

router.get('/', function(req, res){
  const query = "SELECT LinhasDoc.Quantidade, LinhasDoc.Artigo FROM LinhasDoc WHERE LinhasDoc.Id='" + req.body.linhasDocId + "'";

  primavera.query(req.session.primavera.access_token, query)
  .then(response => {
    res.status(200).json(JSON.parse(response).DataSet.Table)
  })
  .catch(error => {
    res.status(500).send(error)
  })
})

module.exports = router
