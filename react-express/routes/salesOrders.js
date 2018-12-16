const express = require('express')
const router = express.Router()
const primavera = require('../primavera')

router.get('/', function(req, res){
  const query = "SELECT CabecDoc.Data, LinhasDoc.Artigo, LinhasDoc.Quantidade, Localizacao, CabecDoc.Entidade, LinhasDoc.IdCabecDoc, LinhasDoc.Id FROM LinhasDoc, CabecDoc WHERE CabecDoc.Id=LinhasDoc.IdCabecDoc AND LinhasDoc.Artigo IS NOT NULL ORDER BY Artigo ASC, LinhasDoc.Data DESC";
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
