const Sequelize = require('sequelize');
const fs = require("fs");

// 检查db.psw.json是否创建，因为pull下来的代码是没有这个文件的
if (!fs.existsSync("./src/model/psw/db.psw.json")) {
  console.log("没有找到db.psw.json文件，请配置该文件。");
  process.exit(0)
}

// 引入密码文件
const DB_Config = require('./psw/db.psw.json')

// TODO 这里的scheams应该需要自动获取，如果不能实现至少应该半自动获取。
const { host, port, username, password, dialect, scheams } = DB_Config
console.log("Connect To", host, port, username);

// 创建连接池
const connect_pool = {};

// 添加连接至连接池
scheams.forEach((scheam) => {
  connect_pool[scheam] = new Sequelize(scheam, username, password, {
    host, port, dialect,
    // 格式化时间
    dialectOptions: {
      dateStrings: true,
      typeCast: true
    },
    timezone: '+08:00', //改为标准时区,
    "define": {
      "timestamps": false
    }
  });
})

// 暴露连接池
module.exports = connect_pool
