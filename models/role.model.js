const { logger } = require('../middlewares/logger')
const Model = require("./base.model.class");

class role extends Model {
  constructor(DB) {
    super(DB);
  }

  async roleJson (where){
    try {
      return await super.query(where)
    } catch (err) {
      logger.error(err)
    }
  }
}

module.exports = role;