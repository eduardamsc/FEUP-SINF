const express = require('express')
const router = express.Router()
const primavera = require('../primavera')
const utils = require('../utils.js')
const { User } = require('../database')

router.get('/', function(req, res){
  res.render('index',{title: 'Express'})
})

router.post('/login', function(req, res){
  const needsBody = ['username','password'];

  if (!utils.hasFields(req.body, needsBody)) {
    res.status(400).send('Bad Request. Needed values in request body: ' + needsBody.join())
    return
  }

  User.findOne({
    attributes: ['id', 'username', 'name'],
    where: { username: req.body.username, password: req.body.password }
  })
  .then(user => {
    if (!user) {
      res.status(422).send('Unprocessable Entity. Wrong credentials')
      return
    }
    req.session.user = user
    res.status(200).json(user)

    /*primavera.token()
    .then(response => {
      req.session.user = user
      req.session.primavera = response.data
      res.status(200).json(user)
    })
    .catch(error => {
      console.error(error)
      res.status(500).send('Internal Server Error.')
    })*/
  })
  .catch(error => {
    console.error(error)
    res.status(500).send('Internal Server Error.')
  })
})

module.exports = router
