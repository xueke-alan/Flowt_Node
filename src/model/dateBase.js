const fs = require("fs");
if (!fs.existsSync("./src/model/psw/db.psw.json")) {
  console.log("没有找到db.psw.json文件，请配置文件。");
  process.exit(0)
}


// 引入密码文件

const DB_Config = require('./psw/db.psw.json')

const { host, port, username, password, scheams } = DB_Config
console.log("Connect To", host, port, username);

const Sequelize = require('sequelize');


const connect_pool = {};

scheams.forEach((scheam) => {
  const sequelize = new Sequelize(scheam, username, password, {
    host, port,
    dialect: 'mysql',
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
  connect_pool[scheam] = sequelize
})

// 建立连接


module.exports = connect_pool
