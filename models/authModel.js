const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const AuthSchema = mongoose.Schema({
    cd_auth: String
})

AuthSchema.pre('save', function (next, done) {
    let auth = this

    const salt = bcrypt.genSaltSync(10)

    const hash = bcrypt.hashSync(auth.cd_auth, salt)

    auth.cd_auth = hash

    next()
})

module.exports = mongoose.model('Auth', AuthSchema)
