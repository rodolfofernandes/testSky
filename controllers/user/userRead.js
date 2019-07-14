const UserModel = require('../../models/userModel')

exports.findOne = async (req, res) => {
    let { userId } = req.params

    if ((!userId)) {
        return res.status(400).send({
            message: 'User Id é necessário.',
            status: 400,
            content: false
        })
    } else {
        UserModel.findOne({ userId }, (err, result) => {
            if (err) {
                return res.status(400).send({
                    message: 'Erro ao buscar user ID',
                    status: 400,
                    content: false
                })
            } else if (!result) {
                return res.status(400).send({
                    message: 'Não foi possivel localizar o id',
                    status: 400,
                    content: false
                })
            } else {
                return res.status(200).send({
                    message: 'Aqui estã os dados solicitados',
                    status: 200,
                    content: result
                })
            }
        })
    }
}
