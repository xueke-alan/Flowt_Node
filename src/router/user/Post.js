
const { flowt_rbac } = require('../../model/dateBase');
// const { performance } = require('perf_hooks');
const jwt = require('jsonwebtoken')

const UserPassword = require("../../model/flowt_rbac/UserPassword")

// const crypto = require('crypto');
const cryptoJS = require('crypto-js/crypto-js')


const scretKey = 'SGS (*^_^*) GZMR'

/**
 * @description: 生成一个随机数，可以生成一个迭代次数
 * @param min  最小值
 * @param max  最大值
 * @return: 返回值是一个介于这之间的整数
 * */
function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}



/**
 * @description: 生成一个hash密码
 * @param password  原密码
 * @param salt  盐值
 * @param saltRounds  迭代次数
 * @param keySize  hash长度
 * @return: 返回hash对象，包含salt, saltRounds, hashedPassword
 * */
function hashPassword(password,
  salt = '12',
  saltRounds = generateRandomNumber(4000, 6000),
  keySize = 8
) {
  const startTime = performance.now(); // 记录开始时间


  const hashedPassword = cryptoJS.PBKDF2(password, salt, {
    keySize: 8,
    iterations: 5714
  }).toString(cryptoJS.enc.Hex)


  const endTime = performance.now(); // 记录结束时间
  const executionTime = endTime - startTime; // 计算代码执行毫秒数
  console.log(executionTime + "ms");
  return { salt, saltRounds, hashedPassword };
}


module.exports = (router) => {
  router.post('/preLogin', async (req, res) => {
    let { StaffID } = req.body
    console.log(StaffID);

    //todo: 这里应该将user与userpassword连接起来一起查询。
    //todo:  把 UserPassword(flowt_rbac)赋值给一个变量。
    const user = await UserPassword(flowt_rbac).findOne({
      attributes: ["StaffID", 'HashPassword', 'Salt', 'SaltRounds'],
      where: { StaffID },
      raw: true, 
    });

    if (user) {
      res.send({
        code: 200,
        message: "ok",
        type: "success",
        result: {
          saltRounds: user.SaltRounds,
          salt: user.Salt,
        }
      })
    } else {
      res.send({
        code: 400,
        message: "账号错误或不存在，请联系管理员",
        type: "success"
      })
    }
  })


  router.get('/admin_info', async (req, res) => {

    // 返回用户信息

    res.send({
      code: 200,
      message: "ok",
      type: "success",
      result: {
        userId: '1',
        username: 'admin',
        realName: 'Admin',
        avatar: "",
        desc: 'manager',
        password: "",
        token: "",
        permissions: [
          {
            label: '主控台',
            value: 'dashboard_console',
          },
          {
            label: '监控页',
            value: 'dashboard_monitor',
          },
          {
            label: '工作台',
            value: 'dashboard_workplace',
          },
          {
            label: '基础列表',
            value: 'basic_list',
          },
          {
            label: '基础列表删除',
            value: 'basic_list_delete',
          },
        ],
      }
    })

  })


  router.post('/login', async (req, res) => {
    let { StaffID, HashPasswordFormFront, newHashPassword } = req.body
    // 将加密后的密码解密
    const user = await UserPassword(flowt_rbac).findOne({
      attributes: ["StaffID", 'HashPassword', 'Salt', 'SaltRounds'],
      where: { StaffID },
      raw: true,
    });
    if (user) {
      // 密码存在，重写盐值与迭代与hash密码，返回token
      console.log(user);
      const verify = HashPasswordFormFront == user.HashPassword

      if (verify) {
        // 重写盐值，迭代次数，与密码
        console.log('重写密码：');
        console.log(newHashPassword);
        await UserPassword(flowt_rbac).update({ ...newHashPassword }, {
          where: {
            StaffID: user.StaffID
          }
        });

        res.send({
          code: 200,
          result: {
            token: jwt.sign({ StaffID }, scretKey, { expiresIn: '168h' }),
          },
          message: "登陆成功，已重写SHA-256",
          type: "success"
        })

      } else {
        res.send({
          code: 400,
          message: "密码错误，请检查你的密码",
          type: "success"
        })
      }

    } else {
      // 这里应该不存在这类情况，因为已经预请求验证User存在，可能盐值等为null
      res.send({
        code: 400,
        message: "账号出现登录错误，请联系管理员",
        type: "success"
      })
    }


  });


  router.post('/sendResetPswEmail', async (req, res) => {
    // 拿到验证码，邮箱，StaffID

    // 验证验证码是否正确，

  })

  router.post('/changePsw', async (req, res) => {
    // 如何安全的发送请求到这个路由不是这个路由考虑的问题。

    // 拿到盐值，迭代次数，hash密码，直接按StaffID查行替换

  })


  return router
}
