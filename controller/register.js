/*
 * @Author: jw 
 * @Date: 2018-10-30 14:52:08 
 * @Last Modified by: jw
 * @Last Modified time: 2018-10-30 17:07:59
 */

//  注册模块

const mongoose = require("mongoose");


class Register {
  constructor() {}
  //添加注册信息
  async setInfo(ctx) {
    
    let { password, username } = ctx.request.body;
    //账户创建时间
    let createAt = Date.now();
    //取得Model
    const User = mongoose.model("user");
    //把从前端接收的POST数据封装成一个新的user对象
    let newUser = new User({
      userName: username,
      password: password,
      createAt: createAt
    });

    //查找用户名是否存在，如果存在开始比对密码
    await User.findOne({ userName: username })
      .exec()
      .then(async result => {
        //如果内容存在此处result会返回之前加的内容
        if (result) {
          ctx.body = { code: false, message: "用户名已存在" };
        } else {
          //用mongoose的save方法直接存储，然后判断是否成功，返回相应的结果
          await newUser
            .save()
            .then(() => {
              ctx.body = { code: true, message: "提交成功" };
            })
            .catch(error => {
              ctx.body = { code: false, message: error };
            });
        }
      })
      .catch(error => {
        ctx.body = { code: false, message: error };
      });
  }
  //获取注册信息
  async getInfo(ctx) {
    let body = ctx.request.body;
    let password = body.password;
    let username = body.username;
    const User = mongoose.model("user");
    await User.findOne({
      userName: username
    })
      .exec()
      .then(async result => {
        ctx.body = rehisterState(password, result);
      })
      .catch(error => {
        ctx.body = { code: 500, message: error };
      });
  }
}

/**
 *
 * 状态码处理
 * @param {*} password 密码
 * @param {*} result 返回值
 * @returns
 */
function rehisterState(password, result) {
  let obj = {};
  if (result) {
    if (password === result.password) {
      obj = {
        code: true,
        message: "登陆成功!",
        data: {
          username: result.userName,
          user_id: result._id
        }
      };
    } else {
      obj = {
        code: false,
        message: "密码不正确!"
      };
    }
  } else {
    obj = {
      code: false,
      message: "用户名不存在，请注册！"
    };
  }

  return obj;
}

module.exports = new Register()