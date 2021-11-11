const DataContract = require('../contract/dataContract');

exports.requestDnaKey = async function(req, res, next){
  if(process.env.NODE_ENV != 'development'){
    if (!req.client.authorized) {
      return res.status(401).send('Invalid client certificate authentication.');
    }
  }

  const cert = req.socket.getPeerCertificate()
  const userAddress = cert.fingerprint256.replace(/:/g, '').toLowerCase()

  const dataContract = new DataContract()
  const data = await dataContract.readData(req.body.dna_id)

  if(data==undefined){
    return res.status(401).send('Data does not exists');
  }

  if(data.owners.includes(userAddress)){
    res.send("Is data owner")
  } else{
    res.send("is NOT data owner")
  }
};

