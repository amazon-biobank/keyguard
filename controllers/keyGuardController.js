const DnaKey = require('./../model/dnaKey')
const Util = require('./controllerUtil')

exports.requestDnaKey = async function(req, res, next){
  if( !Util.isAuthenticated(req) ){
    return res.status(401).send('Invalid client certificate authentication.');
  }
  
  const userAddress = Util.getUserAddress(req)
  const data = await Util.getDataFromBlockchain(req.body.dna_id)

  if(data==undefined){
    return res.status(401).send('Data does not exists');
  }

  if( !Util.isDataOwner(data, userAddress) ){
    return res.status(401).send("Requesting User is not Data Owner")
  } else {
    const dnaKey = await DnaKey.readDnaKeyById(req.body.dna_id)
    return res.send(JSON.stringify(dnaKey))
  }
};






