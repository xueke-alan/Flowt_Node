// 导入express
const express = require("express");
// 创建路由对象
const router = express.Router();


// 向外导出路由
module.exports = (path) => {

  ['Get', 'Put', 'Post', 'Delete']
    .forEach((m) => {
      try {
        require(`.${path}/${m}.js`)(router)
      } catch (_) { }
    })
  return router
};