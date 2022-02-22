cd ../biobank/application/fabric-details/
node registerUser.js client remote
node registerUser.js keyguard remote
mv wallet/client.id ./../../../keyguard/wallet
mv wallet/keyguard.id  ./../../../keyguard/wallet
cd -

cd wallet
./parse-certificates.sh
cp ./../biobank/blockchain/test-network/organizations/fabric-ca/org1/ca-cert.pem ./wallet/ca.crt


cp ./../biobank/blockchain/test-network/organizations/peerOrganizations/org1.example.com/connection-org1.json ./blockchain/fabric-details/connection.json
