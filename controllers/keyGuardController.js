const DataContract = require('../contract/dataContract');

exports.requestDnaKey = async function(req, res, next){
  if( !isAuthenticated(req) ){
    return res.status(401).send('Invalid client certificate authentication.');
  }
  
  const userAddress = getUserAddress(req)
  console.log(userAddress)
  const dataContract = new DataContract()
  const data = await dataContract.readData(req.body.dna_id)

  if(data==undefined){
    return res.status(401).send('Data does not exists');
  }

  if( !isDataOwner(data, userAddress) ){
    return res.status(401).send("Requesting User is not Data Owner")
  } else {
    return res.send("return data key")
  }

};

function isDataOwner(data, userAddress){
  return data.owners.includes(userAddress)
}

function getUserAddress(req){
  const cert = req.socket.getPeerCertificate()
  return cert.fingerprint256.replace(/:/g, '').toLowerCase()
}

function isAuthenticated(req){
  if(process.env.NODE_ENV != 'development'){
    return req.client.authorized
  } else{
    return true
  }
}

