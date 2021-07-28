const api = {}
api.login = async (ctx, next) => {
  ctx.body = "1"
}

api.register = async (ctx, next) => {
  ctx.body = "2"
}


module.exports = api
