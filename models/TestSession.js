module.exports = (sequelize, DataTypes) => {
  const TestSession = sequelize.define('TestSession', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
		code: DataTypes.STRING,
		status: DataTypes.STRING,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  })

  TestSession.associate = (models) => {
    models.TestSession.belongsTo(models.WxUser, {
      foreignKey:'from_user_id'
    })
    models.TestSession.belongsTo(models.WxUser, {
      foreignKey:'to_user_id'
    })
    models.TestSession.hasOne(models.FacelessResult, {
      foreignKey:'session_id'
    })
  }

  return TestSession
}