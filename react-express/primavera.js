const request = require('request-promise')

function token() {
  const URL = process.env.API_URL + '/token'
  const REQ_DATA = {
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    company: process.env.COMPANY,
    instance: process.env.INSTANCE,
    grant_type: process.env.GRANT_TYPE,
    line: process.env.LINE
  }

  const data = Object.keys(REQ_DATA).map(key => {
    return encodeURIComponent(key) + '=' + encodeURIComponent(REQ_DATA[key])
  }).join('&')

  return request.post({
    url: URL,
    body: data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

function deliveryNote(ecl_number, entidade, bearer) {
  const URL = process.env.API_URL + '/Vendas/Docs/TransformDocument/ECL/A/' + ecl_number + '/000/true'

  const REQ_DATA = {
    Tipodoc: "GR",
    Serie: "A",
    Entidade: entidade,
    TipoEntidade: "C",
    DataDoc: "30/11/2018",
    DataVenc: "30/11/2018",
  }
  console.log(REQ_DATA);
  const data = Object.keys(REQ_DATA).map(key => {
    return encodeURIComponent(key) + '=' + encodeURIComponent(REQ_DATA[key])
  }).join('&')

  return request.post({
    url: URL,
    body: data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer ' + bearer
    },
  })
}

function rawQuery(bearer,query) {
  const URL = process.env.API_URL + '/Administrador/Consulta'

  return request.get({
    url: URL,
    body: JSON.stringify(query),
    headers: {
      'Content-Type': "application/json",
      'Authorization': 'Bearer ' + bearer
    },
  })
}

module.exports = {
  token: token,
  query: rawQuery,
  deliveryNote: deliveryNote
}
