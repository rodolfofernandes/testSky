const userModel = require('../../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.login = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: 'Body empty',
            status: 400,
            content: false
        })
    }

    const { email, senha } = req.body

    if ((!email) || (!senha)) {
        return res.status(400).send({
            message: 'Preencha todos os campos corretamente.',
            status: 400,
            content: false
        })
    } else {
        userModel.findOne({ email }, (err, findResult) => {
            if (err) {
                return res.status(404).send({
                    message: 'Erro ao buscar usuário',
                    status: 404,
                    content: false
                })
            } else if (!findResult) {
                return res.status(404).send({
                    message: 'Usuário não registrado.',
                    status: 404,
                    content: false
                })
            } else {
                bcrypt.compare(senha, findResult.senha, (error, compareResult) => {
                    if (error) {
                        return res.status(401).send({
                            message: error,
                            status: 401,
                            content: false
                        })
                    }
                    if (compareResult === false) {
                        return res.status(401).send({
                            message: 'Usuário e/ou senha inválidos',
                            status: 401,
                            content: false
                        })
                    } else {
                        jwt.sign({ findResult }, 'SkyApiKey', { expiresIn: '30m' }, (error, token) => {
                            if (error) {
                                return res.status(401).send({
                                    message: 'Senha incorreta.',
                                    status: 401,
                                    content: false
                                })
                            } else {
                                userModel.findOneAndUpdate({ email }, { 'ultimoLogin': new Date().toLocaleString() }, (err, result) => {
                                    if (err) {
                                        return res.status(500).send({
                                            message: 'Erro ao atualizar ultimo login.',
                                            status: 500,
                                            content: false
                                        })
                                    } else {
                                        return res.status(200).send({
                                            status: 200,
                                            content: {
                                                userId: findResult.userId,
                                                'email': findResult.email,
                                                'nome': findResult.nome,
                                                'telefones': findResult.telefones
                                            },
                                            token,
                                            message: 'Sucesso ao logar!'
                                        })
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
    }
}
