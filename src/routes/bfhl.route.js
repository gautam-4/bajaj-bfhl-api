const express = require('express');
const { postBfhl, getBfhl } = require('../controllers/bfhl.controller');
const validate = require('../middlewares/validate.middleware');

const router = express.Router();

router.get('/', getBfhl);
router.post('/', validate.bfhlBody, postBfhl);

module.exports = router;