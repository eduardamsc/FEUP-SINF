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
    req.session.primavera = {};
    console.log(JSON.parse(response));
    
    req.session.primavera = JSON.parse(response);
    console.log(req.session.primavera.access_token);
    res.status(200).json(req.session.primavera);
  })
  
})

module.exports = router
