const mysql = require('mysql')
const config = require('../config')

class Pool {
  constructor() {
    this.pool = this.init()
  }

  init() {
    return mysql.createPool(config.mysql)
  }
}

module.exports = new Pool(config.mysql)