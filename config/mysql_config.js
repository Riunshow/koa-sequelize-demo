const MYSQL_CONFIG = {
	host: 'localhost',
	port: '3306',
	database: 'h5_operation',
	dialect: 'mysql',
	user: 'root',
	password: '12345678',
	// password: '123456',
	pool: {
		max: 5,
		min: 0,
		idle: 30000
	}
}

module.exports = {
	MYSQL_CONFIG
}