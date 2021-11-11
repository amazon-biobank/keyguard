const fs = require('fs');
const https = require('https');


if(process.env.NODE_ENV == 'development'){
  process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
}

try{
  const post_data = JSON.stringify({
    dna_id: '3600f620305aa7bc5355fdc85d9e6619a68d1ea5'
  })

  const req = https.request(
    {
      hostname: 'localhost',
      port: 9443,
      path: '/request-dna-key',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': post_data.length
      },
      cert: fs.readFileSync('wallet/client.crt'),
      key: fs.readFileSync('wallet/client.key'),
      ca: fs.readFileSync('wallet/ca.crt'), 
    },
    res => {
      res.on('data', function(data) {
        console.log(data.toString())
      });
    }
  )

  req.write(post_data);
  req.end();
}catch(e){
  console.log("erro é" + e)
}