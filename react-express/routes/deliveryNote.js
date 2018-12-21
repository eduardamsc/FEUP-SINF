const express = require('express')
const router = express.Router()
const primavera = require('../primavera')
const { AssignSalesOrder } = require('../database')

router.post('/', function(req, res){
  AssignSalesOrder.findOne({
    attributes: ['username_picker', 'id_salesOrder', 'num_doc', 'entidade'],
    where: { id_salesOrder: req.body.id_salesOrder }
  })
  .then(result => {
    console.log(result);
    primavera.deliveryNote(result.dataValues.num_doc, result.dataValues.entidade, req.session.primavera.access_token)
    .then(response => {
      res.status(200).json(JSON.parse(response))
    })
    .catch(error => {
      res.status(500).send(error)
    })

  })
  .catch(error => {
    res.status(500).send(error)
  })

})

module.exports = router
