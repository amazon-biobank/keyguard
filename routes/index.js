var express = require('express');
var router = express.Router();

var KeyGuardController = require('../controllers/keyGuardController')

router.post('/request-dna-key', KeyGuardController.requestDnaKey);

module.exports = router;