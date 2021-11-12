const { logger } = require('../middlewares/logger')

/**
 * 日志相关的数据库操作
 * @param DB
 */
const log = DB => {
  return {
    async Set(info) {
      try {
        return res = await DB.insert(info)
      } catch (err) {
        logger.error(err)
      }
    },
  }
}

module.exports = log;