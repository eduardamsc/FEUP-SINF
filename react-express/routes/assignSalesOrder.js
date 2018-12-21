const express = require('express')
const router = express.Router()
const primavera = require('../primavera')
const { AssignSalesOrder } = require('../database')

router.post('/', function(req, res){
  var assignSalesOrder = {
    username_picker: req.body.username_picker,
    id_salesOrder: req.body.id_salesOrder,
    num_doc: req.body.num_doc,
    entidade: req.body.entidade
  }

  AssignSalesOrder.bulkCreate([assignSalesOrder]).then(assignSalesOrder => {
    var data = {
      id_salesOrder: req.body.id_salesOrder,

    }
    res.status(200).json(data)
  }).catch(error => {
    res.status(500).send(error)
  });
});

module.exports = router
