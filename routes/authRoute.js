const userLogin = require('../controllers/auth/loginAuth')
module.exports = (router) => {
    router.post('/auth/user/signin', userLogin.login)
}
