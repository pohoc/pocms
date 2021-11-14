const { logger } = require('../middlewares/logger')

/**
 * 登录相关的数据库操作
 * @param DB
 */
const role = DB => {
  return {
    async add(info) {
      try {
        return res = await DB.insert(info)
      } catch (err) {
        logger.error(err)
      }
    },
    async update(id, info) {
      try {
        return res = await DB.update({id}, info)
      } catch (err) {
        logger.error(err)
      }
    },
    async getByUserId(id) {
      try {
        return res = await DB.fetchRow({id})
      } catch (err) {
        logger.error(err)
      }
    },
    async getInfoByJson(info) {
      try {
        return res = await DB.fetchRow(info)
      } catch (err) {
        logger.error(err)
      }
    },
    async updateScore(sql) {
      try {
        return res = await DB.queryStr(sql)
      } catch (err) {
        logger.error(err)
      }
    },
    async getRowsByJson(where) {
      try {
        return res = await DB.fetchAll(where)
      } catch (err) {
        logger.error(err)
      }
    },
  }
}

module.exports = role;