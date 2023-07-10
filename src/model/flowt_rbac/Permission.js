const {
  DataTypes
} = require('sequelize');
module.exports = sequelize => {
  const attributes = {
    PermissionID: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: false,
      comment: null,
      field: "PermissionID"
    },
    PermissionName: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "PermissionName"
    },
    PermissionDescription: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "PermissionDescription"
    }
  };
  const options = {
    tableName: "Permission",
    comment: "",
    indexes: []
  };
  const PermissionModel = sequelize.define("Permission_model", attributes, options);
  return PermissionModel;
};