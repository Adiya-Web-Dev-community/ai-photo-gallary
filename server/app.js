const { urlencoded } = require('body-parser');

require('dotenv').config();
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')


const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

//routers
app.use(require('./routes/newUser'))
app.use(require('./routes/dashboard-details'))
app.use(require('./routes/event'))


module.exports = app