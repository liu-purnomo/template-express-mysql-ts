'use strict';
const {
  Model
} = require('sequelize');

const { paranoidFunction, modelHelper, hashPassword } = require("../helpers/index");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      ...modelHelper({
        name: "Email",
        isEmail: true,
        allowNull: true,
        isUnique: true,
      }),
    },
    password: {
      type: DataTypes.STRING,
      ...modelHelper({
        name: "Password",
        len: [5, 255],
      }),
    },
    status: {
      type: DataTypes.ENUM,
      values: ["Active", "Inactive", "Banned", "Pending"],
      defaultValue: "Active",
    },
    role: {
      type: DataTypes.ENUM,
      values: ["Admin", "User", "Guest"],
      defaultValue: "User",
    },
  }, {
    sequelize,
    ...paranoidFunction("User", "users"),
  });

  User.beforeCreate((user, _) => {
    user.password = hashPassword(user.password);
  })

  return User;
};