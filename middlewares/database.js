const Pool = require("../lib/pool");
const RD = require("../lib/redis");
const { logger } = require("./logger");

const database = (app) => {
  // mysql 建立连接打印信息
  const pool = Pool.init();
  pool.getConnection((error, connection) => {
    if (error) logger.error(`Mysql Connected failed`);
    else if(connection) logger.info(`Mysql Connected to MongoDB`)
  });

  // redis 建立连接打印信息
  const client = RD.init();
  client.on("connect", () => {
    logger.info(`Redis connect Successful`)
  });
  client.on("error", (err) => {
    logger.error(`Redis throw Error: ${err}`);
  });
};

module.exports = database;
