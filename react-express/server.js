const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

require('dotenv').config()

const uuid = require('uuid/v4')
const session = require('express-session')

// REQUIRE ROUTS
const index = require('./routes/index')
const articles = require('./routes/articles')
const customers = require('./routes/customers')
const getSalesOrder = require('./routes/getSalesOrder')
const warehouse = require('./routes/warehouse')
const productUnits = require('./routes/productUnits')
const checkStock = require('./routes/checkStock')
const inventory = require('./routes/inventory')
const salesOrder = require('./routes/salesOrder')
const deliveryNote = require('./routes/deliveryNote')
const checkDigit = require('./routes/checkDigit')

const cors = require('cors')
require('./database')
const app = express()

app.use(session({
  genid: () => {
    return uuid()
  },
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}))


app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// USES ROUTES
app.use('/', index)
app.use('/getSalesOrder', getSalesOrder)
app.use('/articles', articles)
app.use('/customers', customers)
app.use('/warehouse', warehouse)
app.use('/login', index)
app.use('/productUnits', productUnits)
app.use('/checkStock', checkStock)
app.use('/inventory', inventory)
app.use('/salesOrder', salesOrder)
app.use('/deliveryNote', deliveryNote)
app.use('/checkDigit', checkDigit)

const port = 5000
app.listen(port, () => console.log(`Server started on port ${port}`))
