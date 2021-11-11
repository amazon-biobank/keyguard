const fs = require('fs');
const https = require('https');

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
try{
  const req = https.request(
    {
      hostname: 'localhost',
      port: 9443,
      path: '/',
      method: 'GET',
      cert: fs.readFileSync('wallet/client.crt'),
      key: fs.readFileSync('wallet/client.key'),
      ca: fs.readFileSync('wallet/ca.crt')
    },
    res => {
      res.on('data', function(data) {
        console.log("cheguei!!! " + data)
      });
    }
    )
    req.end();
}catch(er){
  console.log("erro é")
}