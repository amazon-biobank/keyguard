SUBSTITUIR client.id e Org1 Ca Admin.id e o keyguard.id
rodar o script ./parse-certificates.sh

testes possíveis
NODE_ENV=development node index.js 
NODE_ENV=development node client-test-register-dna-key.js 
NODE_ENV=development node client-test-read-dna-key.js 

# keyguard
Manages the storage and access to DNA encryption keys
