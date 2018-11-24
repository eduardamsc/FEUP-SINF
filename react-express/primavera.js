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
  query: rawQuery
}
