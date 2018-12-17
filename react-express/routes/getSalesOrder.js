const express = require('express')
const router = express.Router()
const primavera = require('../primavera')
const { AssignSalesOrder } = require('../database')

router.get('/', function(req, res){

  AssignSalesOrder.findOne({
    attributes: ['username_picker', 'id_salesOrder'],
    where: { username_picker: req.session.user.username }
  })
  .then(assignSalesOrder => {
    const query = `SELECT CabecDoc.Data, LinhasDoc.Artigo, LinhasDoc.Quantidade, Localizacao, CabecDoc.Entidade, LinhasDoc.IdCabecDoc, LinhasDoc.Id 
    FROM LinhasDoc, CabecDoc WHERE CabecDoc.Id=LinhasDoc.IdCabecDoc 
    AND Artigo IS NOT NULL 
    AND LinhasDoc.IdCabecDoc='` + assignSalesOrder.id_salesOrder + `'`;


    primavera.query(req.session.primavera.access_token, query)
    .then(response => {
      var products = JSON.parse(response).DataSet.Table;
      var data = new Date(products[0].Data);
      data = data.getDate() + "/" + (data.getMonth()+1) + "/" + data.getFullYear();

      var data = {
        products: products,
        data: data
      };
      res.status(200).json(data)
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
