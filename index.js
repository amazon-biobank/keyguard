const fs = require('fs');
const https = require('https');
const express = require('express');
require('dotenv').config()
console.log(process.env.NODE_ENV)

let rejectUnauthorized
if(process.env.NODE_ENV == 'development'){
  process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
  rejectUnauthorized = false
} else{
  rejectUnauthorized = true
}

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require('./routes'));

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