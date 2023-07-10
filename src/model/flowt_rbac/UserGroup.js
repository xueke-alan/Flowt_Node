const {
  DataTypes
} = require('sequelize');
module.exports = sequelize => {
  const attributes = {
    StaffID: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "StaffID"
    },
    GroupName: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "GroupName"
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
    tableName: "UserGroup",
    comment: "",
    indexes: [{
      name: "GroupID",
      unique: false,
      type: "BTREE",
      fields: ["GroupName"]
    }, {
      name: "UserGroup_ibfk_1",
      unique: false,
      type: "BTREE",
      fields: ["StaffID"]
    }]
  };
  const UserGroupModel = sequelize.define("UserGroup_model", attributes, options);
  return UserGroupModel;
};