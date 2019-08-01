const Router = require('koa-router')
const Wechat = require('../controller/wechat')

const router = new Router()

// 跳转登录引导页
router.get('/goLogin', Wechat.goLogin)

// 获取 access_token openid
router.get('/getWxCallback', Wechat.getAccessToken)

// 获取用户信息
router.get('/user', Wechat.getWechatUserInfo)

// 校验 access_token 是否有效
router.get('/validateAccessToken', Wechat.validateAccessToken)

// 刷新 access_token
router.get('/refreshAccessToken', Wechat.refreshAccessToken)

// 获取 jsapi_ticket
router.get('/getAccessTokenForTicket', Wechat.getAccessTokenForTicket)

// 获取 jsapi_ticket
router.get('/getTicket', Wechat.getTicket)

// 获取 signature
router.get('/getSignature', Wechat.getSignature)

module.exports = router