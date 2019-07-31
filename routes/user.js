const User = require('../controller/user')
const Router = require('koa-router')

const router = new Router()

// 绑定用户
router.post('/bind', User.bindUser)

// 获取单个用户
router.get('/:user_id', User.getUser)

// 获取全部用户
router.get('/', User.getAllUsers)

module.exports = router