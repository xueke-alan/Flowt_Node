const {
  DataTypes
} = require('sequelize');
module.exports = sequelize => {
  const attributes = {
    UserID: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      defaultValue: "0",
      primaryKey: true,
      autoIncrement: false,
      comment: null,
      field: "UserID",
      unique: "UserID"
    },
    StaffID: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "XX00000",
      primaryKey: false,
      autoIncrement: false,
      comment: "员工编号",
      field: "StaffID",
      unique: "User_pk"
    },
    Username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "英文姓名",
      field: "Username"
    },
    UsernameCn: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "中文姓名",
      field: "UsernameCn"
    },
    UsernameGPO: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "GPO显示的姓名",
      field: "UsernameGPO"
    },
    Avatar: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "头像地址",
      field: "Avatar"
    },
    Email: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "邮箱",
      field: "Email"
    },
    State: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: "0",
      primaryKey: false,
      autoIncrement: false,
      comment: "账号状态(0:在职员工;1:离职员工)",
      field: "State"
    }
  };
  const options = {
    tableName: "User",
    comment: "",
    indexes: []
  };
  const UserModel = sequelize.define("User_model", attributes, options);
  return UserModel;
};