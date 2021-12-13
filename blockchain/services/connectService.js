const { Gateway, Wallets } = require('fabric-network');
const path = require('path');
const fs = require('fs')


class ConnectService {
  constructor() {
    this.walletPath = path.join(process.cwd(), 'wallet');
    
  }
  
  async connectNetwork(channel, chaincode) {
    const wallet = await Wallets.newFileSystemWallet(this.walletPath);
    console.log(`Wallet path: ${this.walletPath}`);

    // const connectionProfilePath = path.resolve(__dirname, '..', 'fabric-details', 'remote-connection-larc.json');
    const connectionProfilePath = path.resolve(__dirname, '..', 'fabric-details', 'connection.json');
    // const connectionProfilePath = path.resolve(__dirname, '..', '..',  'blockchain', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
    let connectionProfile = JSON.parse(fs.readFileSync(connectionProfilePath, 'utf8'));

    const gateway = new Gateway();
    // let connectionOptions = { wallet, identity: 'userCertificate', discovery: { enabled: true, asLocalhost: true }};
    let connectionOptions = { wallet, identity: 'keyguard', discovery: { enabled: true, asLocalhost: false }};
    await gateway.connect(connectionProfile, connectionOptions);

    const network = await gateway.getNetwork(channel);
    const contract = network.getContract(chaincode);

    return { network, contract, gateway }
 }
}

module.exports = ConnectService;
