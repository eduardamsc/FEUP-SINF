const express = require('express')
const router = express.Router()
const {Product } = require('../database')
router.post('/', function(req, res){

  Product.findOne({
    attributes: ['id_salesOrder', 'product', 'quantity','location'],
    where: { id_salesOrder: req.body.salesOrderId }
  })
  .then(product => {
    res.status(200).json(product)
  }) 
  .catch(error => {
    //console.error(error)
    res.status(500).send(error)
  })

})

module.exports = router
