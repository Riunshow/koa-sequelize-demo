const path = require('path')
const log4js = require('koa-log4')

log4js.configure({
  appenders: {
    access: {
      type: 'dateFile',
			pattern: '-yyyy-MM-dd.log',
			alwaysIncludePattern: true,
      filename: path.join('./logs/', 'access.log')
    },
    application: {
      type: 'dateFile',
			pattern: '-yyyy-MM-dd.log',
			alwaysIncludePattern: true,
      filename: path.join('./logs/', 'application.log')
    },
    out: {
      type: 'stdout'
    }
  },
  categories: {
    default: { appenders: [ 'out' ], level: 'info' },
    access: { appenders: [ 'access' ], level: 'info' },
    application: { appenders: [ 'out', 'application' ], level: 'warn'}
  }
})

exports.accessLogger = () => log4js.koaLogger(log4js.getLogger('access'))
exports.logger = log4js.getLogger('application')