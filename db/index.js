//mysql数据库连接

const mysql = require('mysql')
const Sequelize = require('sequelize')
const { MYSQL_CONFIG } = require('../config')

const POOL = mysql.createPool({
	host: MYSQL_CONFIG.host,
	port: MYSQL_CONFIG.port,
	user: MYSQL_CONFIG.user,
	password: MYSQL_CONFIG.password,
	database: MYSQL_CONFIG.database,
})

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

sequelize.sync().then(() => {
  console.log('mysql连接成功')
})
.catch(err => {
  console.log('mysql连接失败:', err)
})

module.exports = {
	sequelize: sequelize
}