var express = require('express');
var router = express.Router();

var KeyGuardController = require('../controllers/keyGuardController')

router.get('/read-dna-key', KeyGuardController.readDnaKey);
router.post('/register-dna-key', KeyGuardController.registerDnaKey);

module.exports = router;