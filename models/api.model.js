const { logger } = require('../middlewares/logger')

/**
 * 登录相关的数据库操作
 * @param DB
 */
const api = DB => {
  return {
    async getState(name) {
      try {
        return res = await DB.fetchRow({name})
      } catch (err) {
        logger.error(err)
      }
    },
  }
}

module.exports = api;