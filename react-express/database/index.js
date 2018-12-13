const Sequelize = require('sequelize')
const UserModel = require('./models/user')

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
      { name: 'Francisca Cerquinho', username: 'fcerquinho', password: '12345678' },
      { name: 'Francisca Paupério', username: 'fpauperio', password: '12345678' },
      { name: 'Luis Saraiva', username: 'lsaraiva', password: '12345678' },
      { name: 'Mariana Silva', username: 'msilva', password: '12345678' },
    ])
  })

module.exports = {
  User
}
