/*
 * @Author: jw 
 * @Date: 2018-10-30 16:13:34 
 * @Last Modified by: jw
 * @Last Modified time: 2018-10-30 18:27:09
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

//创建我们的用户Schema
const user = new Schema({
  userId: ObjectId,
  userName: {
    unique: true,
    type: String
  },
  password: String,
  isLogin: {
    type: Boolean,
    default: false,
  },
  createAt: {
    type: Date,
    default: Date.now()
  },
  lastLoginAt: {
    type: Date,
    default: Date.now()
  }
}, {
  collection: 'user'
})

//发布模型
mongoose.model('user', user)