const User = require('../controller/user')
const Router = require('koa-router')

const router = new Router()

router.get('/', User.getAllUser)

module.exports = router