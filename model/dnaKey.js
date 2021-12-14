const { Gateway, Wallets } = require('fabric-network');
const path = require('path');
const fs = require('fs')


class DnaKey {
  static dnaKeyCollection = [ { dnaId: '123', secretKey: 'mysecretKey123'}, 
                            { dnaId: '124', secretKey: 'mysecretKey124'},
                            { dnaId: '125', secretKey: 'mysecretKey125'}]
                              
    
  
  static async readDnaKeyById(dnaId) {
    const dnaKey = this.dnaKeyCollection.find( dnaKey => {
      return dnaKey.dnaId == dnaId
    })
    return dnaKey
  }

  static async createDnaKey(dnaKey){
    this.dnaKeyCollection.push(dnaKey)
    return dnaKey
  }
  
}

module.exports = DnaKey;
