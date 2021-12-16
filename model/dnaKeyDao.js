const DnaKey = require('./dnaKey')

class DnaKeyDao {
  static async readDnaKeyById(dnaId) {
    const dnaKey = await DnaKey.findOne({ where: { dnaId } });
    return dnaKey
  }

  static async createDnaKey(dnaKey){
    return await DnaKey.create(dnaKey)
  }
  
}

module.exports = DnaKeyDao;
