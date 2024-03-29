const Sequelize = require('sequelize')
const UserModel = require('./models/user')
const AssignSalesOrderModel = require('./models/assignSalesOrder')
const ProductModel = require('./models/product')


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
const Product = ProductModel(sequelize, Sequelize)

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
      { name: 'Eduarda Cunha', userType: 'picker', username: 'ecunha', password: '12345678' },

    ])

  })



module.exports = {
  User, AssignSalesOrder, Product
}
