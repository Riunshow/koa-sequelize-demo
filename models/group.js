const db = require('../db')
const Sequelize = require('sequelize')
const { UserModel } = require('../models/user')

const GroupModel = db.sequelize.define('group', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	code: Sequelize.STRING, // 分组 code
	name: Sequelize.STRING,
	createdAt: Sequelize.DATE,
	updatedAt: Sequelize.DATE
})

GroupModel.associate = () => {
	GroupModel.belongsToMany(UserModel, {
		through: 'UserGroup',
		foreignKey: 'group_id',
	})
}


module.exports = {
	GroupModel
}