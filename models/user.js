module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
    }, // 登录名
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    token: {
      type: DataTypes.STRING,
      unique: true,
      default: '',
    },
    loginTime: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  })

  User.associate = (models) => {
    models.User.belongsToMany(models.Group, {
      through: 'UserGroup',
      foreignKey: 'user_id',
      onDelete: 'cascade',
    })

    models.User.hasMany(models.TestSession, {
      foreignKey:'from_user_id'
    })
    models.User.hasMany(models.TestSession, {
      foreignKey:'to_user_id'
    })
  }

  return User
}