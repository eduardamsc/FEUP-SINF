const express = require('express')
const router = express.Router()
const primavera = require('../primavera')
const { AssignSalesOrder, Product } = require('../database')

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
      var elements = [];

      Product.findAll({
        attributes: [ 'product', 'location', 'quantity', 'id_salesOrder', 'date', 'notEnoughQuantity' ],
        where: { id_salesOrder: assignSalesOrder.dataValues.id_salesOrder}
      }).then(response => {

        if(response.length == 0) {
          for (let index = 0; index < products.length; index++) {

            var element = {
              id_salesOrder: assignSalesOrder.id_salesOrder,
              product: products[index].Artigo,
              quantity: products[index].Quantidade,
              location: products[index].Localizacao,
              notEnoughQuantity: false,
              date: products[index].Data
            }
            elements.push(element);
          }
          Product.bulkCreate(elements).then(element => {
            var data = new Date(products[0].Data);
            data = data.getDate() + "/" + (data.getMonth()+1) + "/" + data.getFullYear();

            var data = {
              products: products,
              data: data
            };
            res.status(200).json(data);

          })
        }
        else {

          products = [];
          for(var i = 0; i < response.length; i++) {
            var product = {
              Data: response[i].date,
              Artigo: response[i].product,
              Quantidade: response[i].quantity,
              IdCabecDoc: response[i].id_salesOrder
            }
            products.push(product);
          }

          Product.update(
            { notEnoughQuantity: false },
            {where: { id_salesOrder: assignSalesOrder.dataValues.id_salesOrder}}
          ).then(result => {
            var data = new Date(products[0].Data);
            data = data.getDate() + "/" + (data.getMonth()+1) + "/" + data.getFullYear();
            var data = {
              products: products,
              data: data
            };

            res.status(200).json(data);

          })
        }
      })
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
