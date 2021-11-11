const fs = require('fs');

const idName = process.argv[2]
const outFileName = process.argv[3]
const option = process.argv[4]

const id = fs.readFileSync(idName)
var outString

if(option == 'certificate'){
  outString = JSON.parse(id.toString()).credentials.certificate
}
else if(option == 'key'){
  outString = JSON.parse(id.toString()).credentials.privateKey
}

fs.writeFile(outFileName, outString, function (err) {
  if (err) return console.log(err);
  console.log('parsed with success');
})