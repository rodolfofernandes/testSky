const User = require('../../models/userModel')
const ValidateMail = require('../../services/validatePassword')
// Create and Save a new User
exports.create = (req, res) => {
    const body = req.body
    if (!body) {
        return res.status(400).send({
            message: 'Body can not be empty',
            status: 400,
            content: false
        })
    }

    const { email, nome, senha, telefones } = body
    if ((!email) || (!nome) || (!senha) || (!telefones)) {
        return res.status(400).send({
            content: false,
            message: 'Email, nome de usuário e senha são necessários!',
            status: 400
        })
    } else {
        let validarEmailSenha = ValidateMail.validateLoginAndPassword(email, senha)
        if (validarEmailSenha) {
            return res.status(500).send({
                message: validarEmailSenha.message,
                status: validarEmailSenha.status,
                content: false
            })
        } else {
            User.findOne({ email }, (err, result) => {
                if (err) {
                    return res.status(500).send({
                        message: 'Erro ao verificar a existência do usuário',
                        status: 500,
                        content: false
                    })
                }
                if (result) {
                    return res.status(400).send({
                        message: 'Usuário já foi cadastrado.',
                        status: 400,
                        content: false
                    })
                } else {
                    body.dataCriacao = new Date().toLocaleString()
                    body.ultimoLogin = body.dataCriacao
                    User.create(body).then(user => {
                        return res.status(201).json({
                            message: 'Usuário registrado com sucesso !',
                            content: {
                                userId: user.userId,
                                'email': user.email,
                                'nome': user.nome,
                                'telefones': user.telefones
                            },
                            status: 201
                        })
                    }).catch(err => {
                        return res.status(500).json({
                            message: 'Erro ao cadastrar Usuário.',
                            content: err,
                            status: 500
                        })
                    })
                }
            })
        }
    }
}
