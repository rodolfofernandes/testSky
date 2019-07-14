const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const bearerHeader = req.headers['authorization']

    if (typeof bearerHeader === 'undefined') {
        return res.status(500).json({
            status: 403,
            message: 'Token nao presente'
        })
    } else {
        const bearer = bearerHeader.split(' ')
        jwt.verify(bearer[1], 'SKYACCESSKEY', (err, data) => {
            if (err) {
                return res.status(500).json({
                    status: 500,
                    message: 'Sessão inválida'
                })
            } else {
                next()
            }
        })
    }
}
