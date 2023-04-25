const { Gateway, Wallets } = require('fabric-network');
const path = require('path');
const fs = require('fs')


class ConnectService {
  constructor() {
    this.walletPath = path.join(process.cwd(), 'wallet');

    if(process.env.CONTEXT=='microfabric'){
      this.connectionProfilePath = path.resolve(__dirname, '..', 'fabric-details', 'microfabric-connection.json');
      this.asLocalhost = true
    }
    else if(process.env.CONTEXT=='remote'){
      this.connectionProfilePath = path.resolve(__dirname, '..', 'fabric-details', 'connection.json');
      this.asLocalhost = false
    }else if(process.env.CONTEXT=='localhost'){
      this.connectionProfilePath = path.resolve(__dirname, '..', '..','..','biobank', 'blockchain/test-network/organizations/peerOrganizations/org1.example.com/connection-org1.json');
      this.asLocalhost = true
    }
  }
  
  async connectNetwork(channel, chaincode) {
    const wallet = await Wallets.newFileSystemWallet(this.walletPath);
    console.log(`Wallet path: ${this.walletPath}`);

    let connectionProfile = JSON.parse(fs.readFileSync(this.connectionProfilePath, 'utf8'));

    const gateway = new Gateway();
    // let connectionOptions = { wallet, identity: 'userCertificate', discovery: { enabled: true, asLocalhost: true }};
    let connectionOptions = { wallet, identity: 'keyguard', discovery: { enabled: true, asLocalhost: this.asLocalhost }};
    await gateway.connect(connectionProfile, connectionOptions);

    const network = await gateway.getNetwork(channel);
    const contract = network.getContract(chaincode);

    return { network, contract, gateway }
 }
}

module.exports = ConnectService;
