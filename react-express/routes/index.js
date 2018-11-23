const express = require('express')
const router = express.Router()
const primavera = require('../primavera')

router.get('/', function(req, res){
  res.send("Hello World")
})

router.post('/login', function(req, res){
  primavera.token()
  .then(response =>{
    req.session.primavera = response.data
    res.status(200).json(response.data)
  })
})

module.exports = router
