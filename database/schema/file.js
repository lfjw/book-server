/*
 * @Author: jw 
 * @Date: 2018-10-30 16:14:21 
 * @Last Modified by:   jw 
 * @Last Modified time: 2018-10-30 16:14:21 
 */

var mongoose = require('mongoose')
var schema = mongoose.Schema

var file = new schema({
  "path": String,
}, {
  collection: 'file'
})

module.exports = mongoose.model('file', file)