const Sequelize = require('sequelize')
const UserModel = require('./models/user')
const AssignSalesOrderModel = require('./models/assignSalesOrder')


const sequelize = new Sequelize('server', 'admin', 'sqladmin', {
  host: 'localhost',
  dialect: 'sqlite',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  storage: 'database/database.sqlite'
})

const User = UserModel(sequelize, Sequelize)
const AssignSalesOrder = AssignSalesOrderModel(sequelize, Sequelize)

sequelize
  .authenticate()
  .then(() => {
    console.log('SQLite connection has been established successfully.');
  })
  .catch(error => {
    console.error('Unable to connect to the database:', error);
  })

sequelize
  .sync({ force: true })
  .then(() => {
    console.log(`Database & tables created!`)
    User.bulkCreate([
      { name: 'Francisca Cerquinho', userType: 'manager', username: 'fcerquinho', password: '12345678' },
      { name: 'Francisca Paupério', userType: 'manager', username: 'fpauperio', password: '12345678' },
      { name: 'Luis Saraiva', userType: 'picker', username: 'lsaraiva', password: '12345678' },
      { name: 'Mariana Silva', userType: 'picker', username: 'msilva', password: '12345678' },
    ])

    AssignSalesOrder.bulkCreate([
      { username_picker: 'fcerquinho',  id_salesOrder: '4b2b5c51-f3e3-11e8-bd69-080027b49706'},
      { username_picker: 'fpauperio',  id_salesOrder: '8799f449-f3e7-11e8-bd69-080027b49706'},
    ])
  })

  

module.exports = {
  User
}
