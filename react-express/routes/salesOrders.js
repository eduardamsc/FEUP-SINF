const express = require('express')
const router = express.Router()
const primavera = require('../primavera')
const { User } = require('../database')

router.get('/', function(req, res){
  const query = "SELECT CabecDoc.Data, LinhasDoc.Artigo, LinhasDoc.Quantidade, Localizacao, CabecDoc.Entidade, LinhasDoc.IdCabecDoc, LinhasDoc.Id FROM LinhasDoc, CabecDoc WHERE CabecDoc.Id=LinhasDoc.IdCabecDoc AND LinhasDoc.Artigo IS NOT NULL ORDER BY Artigo ASC, LinhasDoc.Data DESC";

<<<<<<< HEAD
  primavera.query(req.session.primavera.access_token, query)
  .then(response => {
    //console.log(JSON.parse(response))
    var salesOrders = [];
    var response = JSON.parse(response).DataSet.Table;
    var id = null;
    for(var i=0; i<response.length; i++) {
      if(id == null || id != response[i].IdCabecDoc) {
        id = response[i].IdCabecDoc;
        console.log(response[i].Data);
        var data = new Date(response[i].Data);
        data = data.getDate() + "/" + (data.getMonth()+1) + "/" + data.getFullYear();
        salesOrder = {
          artigos: [],
          entidade: response[i].Entidade,
          data: data,
          index: salesOrders.length+1, 
          IdCabecDoc: response[i].IdCabecDoc 
        };
        var artigo = {
          nome: response[i].Artigo,
          quantidade: response[i].Quantidade,
          localizacao: response[i].Localizacao
        };
        salesOrder.artigos[salesOrder.artigos.length] = artigo;
        salesOrders[salesOrders.length] = salesOrder;
      } else if (id == response[i].IdCabecDoc) {
        var artigo = {
          nome: response[i].Artigo,
          quantidade: response[i].Quantidade,
          localizacao: response[i].Localizacao
=======
  User.findAll({
    attributes: ['id', 'username', 'name', 'userType'],
    where: { userType: "picker" }
  })
  .then(users => {
    console.log(users);
    primavera.query(req.session.primavera.access_token, query)
    .then(response => {
      //console.log(JSON.parse(response))
      var salesOrders = [];
      var response = JSON.parse(response).DataSet.Table;
      var id = null;
      for(var i=0; i<response.length; i++) {
        if(id == null || id != response[i].IdCabecDoc) {
          id = response[i].IdCabecDoc;
          var data = new Date(response[i].Data);
          data = data.getDate() + " " + (data.getMonth()+1) + " " + data.getFullYear();
          salesOrder = {
            artigos: [],
            entidade: response[i].Entidade,
            data: data,
            index: salesOrders.length+1,
            IdCabecDoc: response[i].IdCabecDoc
          };
          var artigo = {
            nome: response[i].Artigo,
            quantidade: response[i].Quantidade,
            localizacao: response[i].Localizacao
          };
          salesOrder.artigos[salesOrder.artigos.length] = artigo;
          salesOrders[salesOrders.length] = salesOrder;
        } else if (id == response[i].IdCabecDoc) {
          var artigo = {
            nome: response[i].Artigo,
            quantidade: response[i].Quantidade,
            localizacao: response[i].Localizacao
          }
          salesOrders[salesOrders.length-1].artigos[salesOrder.artigos.length] = artigo;
>>>>>>> 7452630a9c903b8b28408ae51c66271bfd29ce5a
        }
      }
      var data = {
        pickers: users,
        salesOrders: salesOrders
      }
      console.log(data);
      res.status(200).json(data)
    })
    .catch(error => {
      //console.error(error)
      res.status(500).send(error)
    })
  })
  .catch(error => {
    //console.error(error)
    res.status(500).send(error)
  })
})

module.exports = router
