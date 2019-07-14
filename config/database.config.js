const mongoose = require('mongoose')
const config = require('./global.config')

const connect = () => {
    const url = config.DATABASE
    const options = {
        reconnectTries: Number.MAX_VALUE,
        reconnectInterval: 500,
        poolSize: 5,
        useNewUrlParser: true
    }

    mongoose.connect(url, options)
    mongoose.set('useCreateIndex', true)

    mongoose.connection.on('error', (err) => {
        console.log('Error in connecting to the database: ' + err)
    })

    mongoose.connection.on('disconnected', () => {
        console.log('Application disconnected from the database!')
    })

    mongoose.connection.on('connected', () => {
        console.log('Application connected to the database!')
    })
}

module.exports = connect()
