const DataContract = require('../blockchain/contract/dataContract');

class ControllerUtil {
  static async getDataFromBlockchain(dnaId){
    const dataContract = new DataContract()
    const data = await dataContract.readData(dnaId)
    return data
  }
  
  static isDataOwner(data, userAddress){
    return data.owners.includes(userAddress)
  }
  
  static getUserAddress(req){
    const cert = req.socket.getPeerCertificate()
    return cert.fingerprint256.replace(/:/g, '').toLowerCase()
  }
  
  static isAuthenticated(req){
    if(process.env.NODE_ENV != 'development'){
      return req.client.authorized
    } else{
      return true
    }
  }
  
}


module.exports = ControllerUtil;