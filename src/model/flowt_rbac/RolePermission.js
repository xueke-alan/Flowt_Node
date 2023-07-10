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
    PermissionID: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      defaultValue: "",
      primaryKey: true,
      autoIncrement: false,
      comment: null,
      field: "PermissionID"
    }
  };
  const options = {
    tableName: "RolePermission",
    comment: "",
    indexes: [{
      name: "PermissionID",
      unique: false,
      type: "BTREE",
      fields: ["PermissionID"]
    }]
  };
  const RolePermissionModel = sequelize.define("RolePermission_model", attributes, options);
  return RolePermissionModel;
};