const { Gateway, Wallets } = require('fabric-network');
const path = require('path');
const fs = require('fs')

var dnaKeyCollection = [ { dnaId: '123', secretKey: 'mysecretKey123'}, 
                          { dnaId: '124', secretKey: 'mysecretKey124'},
                          { dnaId: '125', secretKey: 'mysecretKey125'},
                          { dnaId: 'aa600f620305aa7bc5355fdc85d9e6619a681ea5', secretKey: 'mysecretKeyaaa'}]

class DnaKey {
                              
    
  
  static async readDnaKeyById(dnaId) {
    const dnaKey = dnaKeyCollection.find( dnaKey => {
      return dnaKey.dnaId == dnaId
    })
    return dnaKey
  }

  static async createDnaKey(dnaKey){
    dnaKeyCollection.push(dnaKey)
    return dnaKey
  }
  
}

module.exports = DnaKey;
