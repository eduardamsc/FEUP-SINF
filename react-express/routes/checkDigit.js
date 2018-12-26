const express = require('express')
const router = express.Router()
const primavera = require('../primavera')
const {Product } = require('../database')

router.post('/', function(req, res){

  Product.findOne({
    attributes: ['id_salesOrder', 'product', 'quantity','location'],
    where: { id_salesOrder: req.body.salesOrderId }
  })
    .then(product => {
      const query = "SELECT * FROM ArmazemLocalizacoes WHERE Localizacao='" + req.body.location + "' AND Descricao='" + req.body.checkDigit + "'";

      primavera.query(req.session.primavera.access_token, query)
      .then(response => {
          res.status(200).json(JSON.parse(response).DataSet.Table)
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
