'use strict'

const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const basename = path.basename(module.filename)
const {
  MYSQL_CONFIG
} = require('../config')

let db = {}

const sequelize = new Sequelize(MYSQL_CONFIG.database, MYSQL_CONFIG.user, MYSQL_CONFIG.password, {
  host: MYSQL_CONFIG.host,
  port: MYSQL_CONFIG.port,
  dialect: MYSQL_CONFIG.dialect,
  pool: MYSQL_CONFIG.pool,
  define: {
    timestamps: true,
    underscored: true,
    freezeTableName: true,
  }
})

fs
  .readdirSync(__dirname)
  .filter(function (file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
  })
  .forEach(function (file) {
    const model = sequelize['import'](path.join(__dirname, file))
    db[model.name] = model
  })

sequelize.sync().then(() => {
    console.log('mysql连接成功')
  })
  .catch(err => {
    console.log('mysql连接失败:', err)
  })

Object.keys(db).forEach(function (modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize

module.exports = db