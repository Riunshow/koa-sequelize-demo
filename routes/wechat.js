const Wechat = require('../controller/wechat')
const Router = require('koa-router')

const router = new Router()

router.get('/goLogin', Wechat.goLogin)

router.get('/wxcallback', Wechat.getAccessToken)

module.exports = router