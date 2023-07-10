const {
  DataTypes
} = require('sequelize');
module.exports = sequelize => {
  const attributes = {
    GroupID: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      defaultValue: "0",
      primaryKey: true,
      autoIncrement: false,
      comment: null,
      field: "GroupID"
    },
    GroupName: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "GroupName",
      unique: "Group_pk"
    }
  };
  const options = {
    tableName: "Group",
    comment: "",
    indexes: []
  };
  const GroupModel = sequelize.define("Group_model", attributes, options);
  return GroupModel;
};