const express = require('express')
const router = express.Router()
const {Product, AssignSalesOrder } = require('../database')
router.post('/', function(req, res){

  Product.findOne({
    where: { id_salesOrder: req.body.salesOrderId, product: req.body.product}
  })
  .then(product => {
    product.destroy();
    Product.findOne({
      where: { id_salesOrder: req.body.salesOrderId}
    })
    .then(product => {
      console.log(product);
      if(product == null) {
        AssignSalesOrder.destroy({
          where: { id_salesOrder: req.body.salesOrderId }
        })
      }
    })
    res.status(200).json(product)
  })
  .catch(error => {
    //console.error(error)
    res.status(500).send(error)
  })

})

module.exports = router
