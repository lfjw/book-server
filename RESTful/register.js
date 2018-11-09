/*
 * @Author: jw 
 * @Date: 2018-10-30 14:56:23 
 * @Last Modified by: jw
 * @Last Modified time: 2018-10-30 17:05:51
 */

//注册
const register = require('../controller/register.js');
const Router = require('koa-router')
let router = new Router()

//获取注册信息
router.post('/login', async (ctx) => {
  await register.getInfo(ctx)
})

//注册
router.post('/register', async (ctx) => {
  await register.setInfo(ctx)
})

module.exports = router;