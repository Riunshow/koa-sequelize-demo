const Router = require('koa-router')
const router = new Router()

const user = require('./user')

module.exports = (app) => {
  //路由表
  app.use(router.routes()).use(router.allowedMethods())

  //sysmgr
  router.use('/api/user', user.routes(), user.allowedMethods())
}