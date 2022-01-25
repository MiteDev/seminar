const express = require('express');
const router = express.Router();
const indexCtrl = require('../controller/indexCtrl');

router.get('/', indexCtrl.indexRoot);

module.exports = router;