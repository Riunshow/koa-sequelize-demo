module.exports = (sequelize, DataTypes) => {
  const WxUser = sequelize.define('WxUser', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    openid: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    nickname: DataTypes.STRING,
    avatar: DataTypes.STRING,
    gender: DataTypes.STRING,
    city: DataTypes.STRING,
    province: DataTypes.STRING,
    country: DataTypes.STRING,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  })

  WxUser.associate = (models) => {
    models.WxUser.hasMany(models.TestSession, {
      foreignKey:'from_user_id'
    })
    models.WxUser.hasMany(models.TestSession, {
      foreignKey:'to_user_id'
    })
  }

  return WxUser
}