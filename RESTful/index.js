/*
 * @Author: jw 
 * @Date: 2018-10-30 16:42:53 
 * @Last Modified by: jw
 * @Last Modified time: 2018-10-30 17:28:14
 */

//注册
const register = require('./register')
//上传
const uploadImg = require('./uploadImg')
//登录
const login = require('./login')

module.exports = {
  register: register,
  uploadImg: uploadImg,
  login: login,
} 