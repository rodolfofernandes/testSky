const express = require('express')
const consign = require('consign')
const cors = require('cors')
const bodyParser = require('body-parser')
const config = require('./config/global.config')

require('./config/database.config')

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.listen(config.PORT, () => {
    console.log(`lead-service running on port ${config.PORT}`)
})

consign()
    .include('routes')
    .into(app)

module.exports = app
