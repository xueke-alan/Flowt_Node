const httpcode = require("./httpCode.json")

module.exports = {
  NEW_RES_SEND: (res) => {
    // 创建发送器
    const sender = {}
    // 根据状态码补全发送器
    httpcode.forEach(({ code, type, message }) => {
      sender[code] = (result) => res.send({ code, type, message, result });
    })
    // 返回发送器
    return sender
  }
}