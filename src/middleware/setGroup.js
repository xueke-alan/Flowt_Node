// 中间件，通过Token查询角色的组别信息绑定在 req 上

const account = require('../model/account');
module.exports = async (req, res, next) => {
  console.log(111);
  console.log(req.auth.jobId);
  const user = await account.findOne({
    attributes: { exclude: ['id', 'password', 'createdAt', 'updatedAt'] },
    where: { jobId: req.auth.jobId },
    raw: true,  //查询出来只有需要的数据，没有别的内容
  });
  req.auth.group = user.group
  next()
}