const express = require('express');
const { postBfhl } = require('../controllers/bfhl.controller');
const validate = require('../middlewares/validate.middleware');

const router = express.Router();

router.post('/', validate.bfhlBody, postBfhl);

module.exports = router;
