/*
 * @Author: jw 
 * @Date: 2018-10-30 17:26:14 
 * @Last Modified by:   jw 
 * @Last Modified time: 2018-10-30 17:26:14 
 */
const register = require('../controller/register.js');
const Router = require('koa-router')
let router = new Router()

router.post('/login', async (ctx) => {
  await register.getInfo(ctx)
})

module.exports = router;