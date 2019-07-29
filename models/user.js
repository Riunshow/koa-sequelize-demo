const db = require('../db')
const Sequelize = require('sequelize')
const { GroupModel } = require('../models/group')

const UserModel = db.sequelize.define('user', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	username: {
		type: Sequelize.STRING,
		unique: true,
	}, // 登录名
	name: Sequelize.STRING,
	email: Sequelize.STRING,
	password: Sequelize.STRING,
	token: {
		type: Sequelize.STRING,
		unique: true,
		default: '',
	},
	loginTime: Sequelize.STRING,
	createdAt: Sequelize.DATE,
	updatedAt: Sequelize.DATE
})

UserModel.belongsToMany(GroupModel, {
	through: 'UserGroup',
	foreignKey: 'user_id'
})


module.exports = {
	UserModel
}