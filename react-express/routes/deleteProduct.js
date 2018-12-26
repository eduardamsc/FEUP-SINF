const express = require('express')
const router = express.Router()
const {Product, AssignSalesOrder } = require('../database')
const primavera = require('../primavera')

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
      if(product == null) {
        AssignSalesOrder.findOne({
          where: { id_salesOrder: req.body.salesOrderId }
        })
        .then(result => {

          AssignSalesOrder.destroy({
            where: { id_salesOrder: req.body.salesOrderId }
          })
          .then(response => {
            primavera.deliveryNote(result.dataValues.num_doc, result.dataValues.entidade, req.session.primavera.access_token)
            .then(response => {
              res.status(200).json(product)
            })
            .catch(error => {
              res.status(500).send(error)
            })
          })
          .catch(error => {
            res.status(500).send(error)
          })
        })
        .catch(error => {
          res.status(500).send(error)
        })

      } else {
        res.status(200).json(product)
      }
    })
  })
  .catch(error => {
    res.status(500).send(error)
  })

})

module.exports = router
