const express = require('express')
const router = express.Router()
const primavera = require('../primavera')
const { User, AssignSalesOrder } = require('../database')

router.get('/', function(req, res){
  const query = "SELECT CabecDoc.Data, LinhasDoc.Artigo, LinhasDoc.Quantidade, Localizacao, CabecDoc.Entidade, LinhasDoc.IdCabecDoc, LinhasDoc.Id FROM LinhasDoc, CabecDoc WHERE CabecDoc.Id=LinhasDoc.IdCabecDoc AND CabecDoc.TipoDoc='ECL' AND LinhasDoc.Artigo IS NOT NULL ORDER BY Artigo ASC, LinhasDoc.Data DESC";

  User.findAll({
    attributes: ['id', 'username', 'name', 'userType'],
    where: { userType: "picker" }
  })
  .then(users => {
    AssignSalesOrder.findAll()
    .then(assignedSalesOrder => {
      primavera.query(req.session.primavera.access_token, query)
      .then(response => {
        var salesOrders = [];
        var response = JSON.parse(response).DataSet.Table;
        var id = null;
        for(var i=0; i<response.length; i++) {
          if(id == null || id != response[i].IdCabecDoc) {
            id = response[i].IdCabecDoc;
            var checked = false;
            var username_picker = '';
            for(var j = 0; j < assignedSalesOrder.length; j++) {
              if(assignedSalesOrder[j].dataValues.id_salesOrder == id) {
                checked = true;
                username_picker = assignedSalesOrder[j].dataValues.username_picker;
              }
            }
            var data = new Date(response[i].Data);
            data = data.getDate() + " " + (data.getMonth()+1) + " " + data.getFullYear();
            salesOrder = {
              artigos: [],
              entidade: response[i].Entidade,
              data: data,
              index: salesOrders.length+1,
              IdCabecDoc: response[i].IdCabecDoc,
              checked: checked,
              username_picker: username_picker
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
          }

        }
        var data = {
          pickers: users,
          salesOrders: salesOrders
        }
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
  .catch(error => {
    //console.error(error)
    res.status(500).send(error)
  })
})

module.exports = router
