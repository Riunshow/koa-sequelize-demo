const Koa = require('koa')
const cors = require('koa2-cors')
const bodyParser = require('koa-bodyparser')
const routes = require('./routes')
const { logger, accessLogger } = require('./config/log_config')

const app = new Koa()

app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    logger.error(err.message)
    ctx.response.status = err.statusCode || err.status || 500
    ctx.response.body = {
      success: false,
      code: -1,
      message: err.message
    }
  }
})

app.use(accessLogger())

app.use(bodyParser())

//跨域
app.use(cors({
  origin: function (ctx) {
    return "*" // 允许来自所有域名请求
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))

routes(app)

//端口监听
app.listen(3000)
console.log('---------------------------')
console.log('---------------------------')
console.info("server is running at port 3000")
console.log('---------------------------')
console.log('---------------------------')
