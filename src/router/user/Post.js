
const Sequelize = require('sequelize');
const { flowt_rbac } = require('../../model/dateBase');
const jwt = require('jsonwebtoken')

const scretKey = 'SGS (*^_^*) GZMR'
const dayjs = require('dayjs');

// 引入数据库表
const UserPasswordModel = require("../../model/flowt_rbac/UserPassword")
const UserPasswordTable = UserPasswordModel(flowt_rbac)

const UserModel = require("../../model/flowt_rbac/User")
const UserTable = UserModel(flowt_rbac)


// 创建连接关系
UserPasswordTable.belongsTo(UserTable, { foreignKey: 'StaffID', targetKey: 'StaffID' });
UserTable.hasOne(UserPasswordTable, { foreignKey: 'StaffID', sourceKey: 'StaffID' });

console.log("UserPasswordTable", "UserTable", "Connect Success");

// 建立路由
module.exports = (router) => {
  // 预登录，在这里检验账号是否存在
  router.post('/preLogin', async (req, res) => {
    let { StaffID } = req.body
    console.log(StaffID);
    const user = await UserTable.findOne(
      {
        attributes: ["StaffID"],
        where: { StaffID },
        include: [
          {
            model: UserPasswordTable,
            attributes: ["Salt", "SaltRounds", "valid_until"],
          },
        ],
        raw: true,
        nest: true,
      }
    )

    console.log(user);

    if (!user) {
      res.send({
        code: 400,
        type: "error",
        message: "账号不存在",
      });
      return;
    }

    const { UserPassword_model } = user;

    if (!UserPassword_model.SaltRounds || !UserPassword_model.Salt) {
      res.send({
        code: 400,
        message: "账号异常，请联系管理员",
        type: "error"
      });
      return;
    }

    if (!UserPassword_model.valid_until || dayjs(UserPassword_model.valid_until).isAfter(dayjs())) {
      console.log('账号有效期 在当前时间之后，或者不存在');
    } else {
      console.log('账号有效期 过期');
      res.send({
        code: 400,
        message: "账号已失效，请联系您的管理员",
        type: "error"
      });
      return;
    }

    res.send({
      code: 200,
      message: "ok",
      type: "success",
      result: {
        StaffID,
        saltRounds: UserPassword_model.SaltRounds,
        salt: UserPassword_model.Salt,
      }
    });


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
    // 密码验证
    const user = await UserPasswordTable.findOne({
      attributes: ["StaffID", 'HashPassword', 'Salt', 'SaltRounds'],
      where: { StaffID },
      raw: true,
    });
    if (user) {

      console.log(user);
      const verify = HashPasswordFormFront == user.HashPassword
      // 密码验证一致，重写盐值与迭代与hash密码，返回token
      if (verify) {
        // 重写盐值，迭代次数，与密码
        console.log('重写密码：');
        console.log(newHashPassword);
        await UserPasswordTable.update({ ...newHashPassword }, {
          where: { StaffID }
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
          type: "error"
        })
      }

    } else {
      // 这里应该不存在这类情况，因为已经预请求验证User存在，可能盐值等为null
      res.send({
        code: 400,
        message: "账号出现登录错误，请联系管理员",
        type: "error"
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
