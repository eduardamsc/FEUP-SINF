/*const express = require('express')
const router = express.Router()
const primavera = require('../primavera')

router.get('/', function(req, res){
  const query = "SELECT Data, Zona, Entidade, TipoDoc, NumDoc FROM CabecDoc WHERE TipoDoc='FA'"
  primavera.query(req.session.primavera.access_token, query)
  .then(response => {
    console.log(response.data)
    res.status(200).json(response.data.DataSet.Table)
  })
  .catch(error => {
    console.error(error)
    res.status(500).send(error)
  })
})

module.exports = router*/
