const {
  DataTypes
} = require('sequelize');
module.exports = sequelize => {
  const attributes = {
    RoleID: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      defaultValue: "",
      primaryKey: true,
      autoIncrement: false,
      comment: null,
      field: "RoleID"
    },
    RoleName: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "RoleName",
      unique: "Role_pk"
    },
    RoleDescription: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "RoleDescription"
    }
  };
  const options = {
    tableName: "Role",
    comment: "",
    indexes: []
  };
  const RoleModel = sequelize.define("Role_model", attributes, options);
  return RoleModel;
};