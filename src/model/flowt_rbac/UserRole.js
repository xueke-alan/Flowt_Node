const {
  DataTypes
} = require('sequelize');
module.exports = sequelize => {
  const attributes = {
    StaffID: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "",
      primaryKey: true,
      autoIncrement: false,
      comment: null,
      field: "StaffID"
    },
    RoleName: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "",
      primaryKey: true,
      autoIncrement: false,
      comment: null,
      field: "RoleName"
    },
    UsernameCn: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "中文姓名",
      field: "UsernameCn"
    }
  };
  const options = {
    tableName: "UserRole",
    comment: "",
    indexes: [{
      name: "RoleID",
      unique: false,
      type: "BTREE",
      fields: ["RoleName"]
    }]
  };
  const UserRoleModel = sequelize.define("UserRole_model", attributes, options);
  return UserRoleModel;
};