const fs = require('fs');
const https = require('https');
const express = require('express');

console.log(process.env.NODE_ENV)

let rejectUnauthorized
if(process.env.NODE_ENV == 'development'){
  process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
  rejectUnauthorized = false
} else{
  rejectUnauthorized = true
}


const app = express();

app.get('/', (req, res) => {

  const cert = req.socket.getPeerCertificate()
  console.log(cert.fingerprint)
  console.log(cert)
  if (!req.client.authorized) {
    return res.status(401).send('Invalid client certificate authentication.');
  }

  return res.send('Hello, world!');
});

https
  .createServer(
    {
      requestCert: true,
      rejectUnauthorized,
      ca: fs.readFileSync('wallet/ca.crt'),
      cert: fs.readFileSync('wallet/server.crt'),
      key: fs.readFileSync('wallet/server.key'),
    },
    app
  )
  .listen(9443, function(){
    console.log('Listening on port ' + 9443);
  });