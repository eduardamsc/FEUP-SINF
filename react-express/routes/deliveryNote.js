const express = require('express')
const router = express.Router()
const primavera = require('../primavera')

router.get('/', function(req, res){
  primavera.deliveryNote(req.client, req.session.primavera.access_token)
  .then(response => {
    res.status(200).json(JSON.parse(response))
  })
  .catch(error => {
    res.status(500).send(error)
  })
})

module.exports = router
