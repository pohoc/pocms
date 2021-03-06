const { logger } = require('./logger')

// 这个middleware用于将ctx.result中的内容最终回传给客户端
// 否则取error错误信息
// 回传的格式遵循这样的格式：{ code: 0, msg: any data: any }
const responseHandler = (ctx) => {
  ctx.type = 'json'
  if (ctx.result !== undefined) {
    ctx.body = {
      code: 0,
      msg: ctx.msg || 'OK',
      data: ctx.result
    }
  }
  else{
    ctx.body = {
      code: ctx.code || -1,
      msg: ctx.msg || '接口未返回数据',
      data: ''
    }
  }
}

// 这个middleware处理在其它middleware中出现的异常
// 并将异常消息回传给客户端：{ code: '错误代码', msg: '错误信息' }
const errorHandler = (ctx, next) => {
  return next().catch(err => {
    if (err.code == null) {
      logger.error(err.stack)
    }
    ctx.body = {
      code: err.code || -1,
      data: null,
      msg: err.message.trim()
    }

    ctx.status = 200 // 保证返回状态是 200, 这样前端不会抛出异常
    return Promise.resolve()
  })
}

module.exports = {
  responseHandler,
  errorHandler
}
