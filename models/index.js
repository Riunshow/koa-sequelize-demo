const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const basename = path.basename(module.filename)
const { MYSQL_CONFIG } = require('../config/mysql_config')

let db = {}

const sequelize = new Sequelize(MYSQL_CONFIG.database, MYSQL_CONFIG.user, MYSQL_CONFIG.password, {
  host: MYSQL_CONFIG.host,
  port: MYSQL_CONFIG.port,
  dialect: MYSQL_CONFIG.dialect,
  pool: MYSQL_CONFIG.pool,
  define: {
    timestamps: true,
    underscored: true,
    freezeTableName: true
  }
})

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file))
    db[model.name] = model
  })


try {
  (async () => {
    await sequelize.authenticate()
    console.log('mysql连接成功')
  })()
} catch (error) {
  console.error('mysql连接失败:', err)  
}

try {
  (async () => {
    await sequelize.sync()
    console.log('mysql表生成成功')
  })()
} catch (error) {
  console.error('mysql表生成失败:', err)  
}

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize

module.exports = db