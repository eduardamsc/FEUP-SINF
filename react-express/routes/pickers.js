const express = require('express')
const router = express.Router()
const { User } = require('../database')


router.get('/', function(req, res){

User.findAll({
  where: {userType: 'picker'}
  })
    .then(response => {

        console.log(response);
        res.status(200).json(response)
    })
    .catch(error => {
    res.status(500).send(error)
    })



})

module.exports = router
