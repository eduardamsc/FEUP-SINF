const express = require('express')
const router = express.Router()
const primavera = require('../primavera')
//const { User } = require('../database')

router.get('/', function(req, res){
  res.send("Hello World")
})

router.post('/login', function(req, res){
  primavera.token()
  .then(response =>{
    req.session.primavera = JSON.parse(response)
    res.status(200).json(JSON.parse(response))
  })
})

module.exports = router
