const express = require('express')
const morgan = require('morgan')
const app = express()
const routes = require('./routes/routes')

app.use(express.json())
app.use(morgan('combined'))
app.use('/routes', routes)

app.listen(3000, () => {
    console.log('Running at 3000')
})

module.exports = app