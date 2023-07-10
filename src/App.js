// 导入express
const express = require("express");

// 调用express
const app = express();

// 安装和配置cors中间件
const cors = require('cors')
app.use(cors())

// 安装body中间件
let bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
app.use(bodyParser.json({ limit: '50mb' }))

// 打开数据库

// const connect_pool = require('./model/dateBase');
// console.log(connect_pool);

// 安装JWT中间件
const { expressjwt } = require('express-jwt')
const scretKey = 'SGS (*^_^*) GZMR'
app.use(expressjwt({ secret: scretKey, algorithms: ['HS256'] })
  // 不用验证Token页面
  .unless({
    path: [/^\/user.*/, { url: /^\/page.*/, methods: ['GET'] }]
  }))

// 导入路由模块
const RouterList = ['/user']
RouterList.forEach(path => {
  app.use(`${path}`, require('./router/merge')(path))
});


// 全局错误中间件
app.use(require('./middleware/error'))


// 调用app.listen(端口号，启动成功后的回调函数)，启动服务器
const port = 8810
app.listen(port, () => {
  console.log(`http://127.0.0.1:${port}`);
});
