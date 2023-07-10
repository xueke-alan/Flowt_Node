const {
  DataTypes
} = require('sequelize');
module.exports = sequelize => {
  const attributes = {
    StaffID: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "员工编号",
      field: "StaffID",
      references: {
        key: "StaffID",
        model: "User_model"
      }
    },
    HashPassword: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "密码",
      field: "HashPassword"
    },
    Salt: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "Salt"
    },
    SaltRounds: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: "5000",
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "SaltRounds"
    }
  };
  const options = {
    tableName: "UserPassword",
    comment: "",
    indexes: [{
      name: "UserPassword_User_StaffID_fk",
      unique: false,
      type: "BTREE",
      fields: ["StaffID"]
    }]
  };
  const UserPasswordModel = sequelize.define("UserPassword_model", attributes, options);
  return UserPasswordModel;
};