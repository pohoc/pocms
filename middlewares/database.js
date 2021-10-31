const Pool = require('../lib/pool')
const RD = require('../lib/redis');
const { logger } = require('./logger')

const database = app => {
  const pool = Pool.init();
  const client = RD.init();
  // mysql 建立连接打印信息
  pool.getConnection((error, connection) => {
    if (error) logger.error(`Mysql Connected failed`)
    else if(connection) logger.info(`Mysql Connected to MongoDB`)
  })
  // redis 建立连接打印信息
  client.on('connect', () => {
    logger.info(`Redis connect Successful`)
  })
  client.on('error', (err) => {
    logger.error(`Redis throw Error: ${err}`)
  })
}

module.exports = database