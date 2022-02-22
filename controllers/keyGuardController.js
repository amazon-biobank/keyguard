const { response } = require('express');
const DnaKeyDao = require('./../model/dnaKeyDao')
const Util = require('./controllerUtil')

exports.readDnaKey = async function(req, res, next){
  if( !Util.isAuthenticated(req) ){
    return res.status(401).send('Invalid client certificate authentication.');
  }
  
  const userAddress = Util.getUserAddress(req)
  const data = await Util.getDataFromBlockchain(req.query.dnaId)
  const dnaKey = await DnaKeyDao.readDnaKeyById(req.query.dnaId)

  if(data==undefined){
    return res.status(401).send('Data does not exist');
  } 
  else if(dnaKey == undefined){
    return res.status(401).send('Dna key not registered in the system')
  } 
  else if( !Util.isDataOwner(data, userAddress) ){
    return res.status(401).send("Requesting User is not Data Owner")
  }
  else {
    return res.send(JSON.stringify(dnaKey))
  }
};

exports.registerDnaKey = async function(req, res, next){
  if( !Util.isAuthenticated(req) ){
    return res.status(401).send('Invalid client certificate authentication.');
  }
  
  const dnaKey = req.body
  const userAddress = Util.getUserAddress(req)
  const data = await Util.getDataFromBlockchain(dnaKey.dnaId)

  if(data==undefined){
    return res.status(401).send('Data does not exists');
  }

  if( !Util.isDataOwner(data, userAddress) ){
    return res.status(401).send("User is not Data Owner")
  } else {
    await DnaKeyDao.createDnaKey(dnaKey)
    return res.send("DnaKey: " + dnaKey.dnaId + " was registered")
  }
}