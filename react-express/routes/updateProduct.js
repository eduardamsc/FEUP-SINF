const express = require('express')
const router = express.Router()
const {Product, AssignSalesOrder } = require('../database')
router.post('/', function(req, res){

  Product.findOne({
    where: { id_salesOrder: req.body.salesOrderId, product: req.body.product}
  })
  .then(product => {
    var quantity = product.quantity - req.body.quantity;
    var location = product.location;
    var date = product.date;
    Product.destroy({
      where: { id_salesOrder: req.body.salesOrderId, product: req.body.product}
    }).then(affected => {
      Product.bulkCreate([
        {
          date: date,
          product: req.body.product,
          id_salesOrder: req.body.salesOrderId,
          location: location,
          quantity: quantity,
          notEnoughQuantity: true
        },
      ]).then(product => {
        AssignSalesOrder.findOne({
          where: { id_salesOrder: req.body.salesOrderId }
        }).then(assignSalesOrder => {
          var num_doc = assignSalesOrder.dataValues.num_doc;
          var entidade = assignSalesOrder.dataValues.entidade;
          assignSalesOrder.destroy();
          AssignSalesOrder.bulkCreate([
            {
              username_picker: req.session.user.username,
              id_salesOrder: req.body.salesOrderId,
              num_doc: num_doc,
              entidade: entidade
            },
          ]).then(assignSalesOrder => {
            res.status(200).json(product)
          })
        })
      })
    });

  })
  .catch(error => {
    res.status(500).send(error)
  })

})

module.exports = router
