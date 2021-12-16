const fs = require('fs');
const https = require('https');


if(process.env.NODE_ENV == 'development'){
  process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
}

try{
  const params = 'dnaId=125'
  const path = '/read-dna-key?' + params

  const req = https.request(
    {
      hostname: 'localhost',
      port: 9443,
      path,
      method: 'GET',
      cert: fs.readFileSync('wallet/client.crt'),
      key: fs.readFileSync('wallet/client.key'),
      ca: fs.readFileSync('wallet/ca.crt')
    },
    res => {
      res.on('data', function(data) {
        console.log(data.toString())
      });
    }
  )

  req.end();
}catch(e){
  console.log("erro é" + e)
}