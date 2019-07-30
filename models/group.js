module.exports = (sequelize, DataTypes) => {
	const Group = sequelize.define('Group', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		code: DataTypes.STRING, // 分组 code
		name: DataTypes.STRING,
		createdAt: DataTypes.DATE,
		updatedAt: DataTypes.DATE
	})

	Group.associate = (models) => {
    models.Group.belongsToMany(models.User, {
      through:'UserGroup',
      foreignKey:'groupId',
      onDelete: 'cascade'
    })
  }

  return Group
}