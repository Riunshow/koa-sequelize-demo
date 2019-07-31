module.exports = (sequelize, DataTypes) => {
  const FacelessResult = sequelize.define('FacelessResult', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
		code: DataTypes.STRING,
		status: DataTypes.STRING,
		result: DataTypes.STRING,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  })

  FacelessResult.associate = (models) => {
    models.FacelessResult.belongsTo(models.TestSession, {
      foreignKey:'session_id'
    })
  }

  return FacelessResult
}