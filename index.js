/*
 * @Author: jw 
 * @Date: 2018-10-30 16:06:17 
 * @Last Modified by: jw
 * @Last Modified time: 2018-10-30 17:30:05
 */
const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
const cors = require('koa2-cors')
const bodyParser = require('koa-bodyparser')
const path = require('path');
const serve = require('koa-static');
const main = serve(path.join(__dirname))

let router = new Router();

const {
  connect,
  initSchemas
} = require('./database/init.js')

app.use(cors({
  origin: function (ctx) {
    return ctx.request.header.origin
  },
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE', 'PUT'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))

app.use(bodyParser());

const RESTful = require('./RESTful/index.js')

for (key in RESTful){
  router.use('/book', RESTful[key].routes())
}

app.use(router.routes())
app.use(router.allowedMethods())

  //立即执行函数
  !(async () => {
    await connect()
    initSchemas()
  })()

app.use(main)

app.listen(9999, () => {
  console.log('[Server] starting at port 9999')
})