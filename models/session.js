module.exports = (sequelize, DataTypes) => {
	const TestSession = sequelize.define('TestSession', {
		session_id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		code: DataTypes.STRING, // 分组 code
		name: DataTypes.STRING,
		createdAt: DataTypes.DATE,
		updatedAt: DataTypes.DATE
	})

	TestSession.associate = (models) => {
    models.TestSession.belongsTo(models.User, {
      foreignKey:'from_user_id'
		})
    models.TestSession.belongsTo(models.User, {
      foreignKey:'to_user_id'
    })
  }

  return TestSession
}