const userCreate = require('../controllers/user/userCreate')
const userRead = require('../controllers/user/userRead')
const verifyToken = require('../middlewares/verifyTokenMiddleware')
const apiAccessToken = require('../middlewares/apiTokenMiddleware')

module.exports = (router) => {
    router.post('/user/signup', apiAccessToken, userCreate.create)
    router.get('/user/:userId', verifyToken, userRead.findOne)
}
