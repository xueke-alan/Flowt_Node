// 中间件，创建res发送器
const { NEW_RES_SEND } = require('../utils/resSender')


module.exports = async (req, res, next) => {
  // 部署 sendf 发送器
  res.sendf = NEW_RES_SEND(res)
  next()
}