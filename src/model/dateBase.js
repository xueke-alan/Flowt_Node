// 引入密码文件
const { host, port, username, password, scheams } = require('./psw/db.psw.json')


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
