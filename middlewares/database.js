const Pool = require('../lib/pool')
const { logger } = require('./logger')

const database = app => {
  const pool = Pool.init();

  // 建立连接打印信息
  pool.getConnection((error, connection) => {
    if (error) logger.error(`Mysql Connected failed`)
    else if(connection) logger.info(`Mysql Connected to MongoDB`)
  })
}

module.exports = database