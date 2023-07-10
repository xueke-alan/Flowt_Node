

module.exports = (err, req, res, next) => {
  if (err.name = 'UnauthorizedError') {
    return res.send({
      code: 401,
      message: '无效的Token'
    })
  }

  res.send({
    code: 500,
    message: '未知的错误'
  })
}