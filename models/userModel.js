const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const uuidv4 = require('uuid/v4')

const UserSchema = mongoose.Schema({
    userId: {
        type: String,
        default: uuidv4
    },
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true
    },
    telefones: [{
        numero: {
            type: String
        },
        ddd: {
            type: String
        }
    }],
    dataCriacao: {
        type: Date
    },
    dataAtualizacao: {
        type: Date
    },
    ultimoLogin: {
        type: Date
    }
})

UserSchema.pre('save', function (next, done) {
    let company = this

    const salt = bcrypt.genSaltSync(10)

    const hash = bcrypt.hashSync(company.senha, salt)

    company.senha = hash

    next()
})

module.exports = mongoose.model('User', UserSchema)
