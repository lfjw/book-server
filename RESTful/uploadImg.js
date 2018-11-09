/*
 * @Author: jw 
 * @Date: 2018-10-30 16:31:20 
 * @Last Modified by:   jw 
 * @Last Modified time: 2018-10-30 16:31:20 
 */

const mongoose = require('mongoose')
const Router = require('koa-router')
const multer = require('koa-multer'); //加载koa-multer模块
let router = new Router()

//储存路径
let filePath = ''
let devPath = '/Users/jiwei/desktop/gitee-demo/lfjw-blog/service/upload-static'
let proPath = '/usr/share/nginx/file'

//预览路径
let ImgPath = ''
let devImgPath = 'http://localhost:9999/'
let proImgPath = 'http://file.sxlfjw.cn/'


//文件上传
//配置
var storage = multer.diskStorage({
  //文件保存路径
  destination: function (req, file, cb) {
    //区分开发环境
    filePath = !req.headers.referer.isUrl() ? devPath : proPath
    cb(null, filePath)
  },
  //修改文件名称
  filename: function (req, file, cb) {
    var fileFormat = (file.originalname).split(".");
    cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
  }
})
//加载配置
var upload = multer({
  storage: storage
});

//路由
router.post('/uploadImg', upload.single('file'), async (ctx, next) => {

  if (!ctx.request.header.referer.isUrl()) {
    //本地开发
    ImgPath = `${devImgPath}upload-static/`
  } else {
    //线上服务器
    ImgPath = proImgPath
  }

  const file = mongoose.model('file')
  let newfile = new file({
    "path": `${ctx.req.file.filename}`,
  })
  await newfile.save().then(() => {
    //成功返回code=200，并返回成功信息
    ctx.body = {
      code: true,
      message: '上传成功!',
      data: `${ImgPath}${ctx.req.file.filename}` //返回文件名
    }
  }).catch(error => {
    //失败返回code=500，并返回错误信息
    ctx.body = {
      code: false,
      message: error
    }
  })
})


module.exports = router;