const express = require('express');
const router = express.Router();
const emailController = require('../../controllers/email');
const authentication = require('../../middlewares/authentication');
const authorization = require('../../middlewares/authorization');

router.post('/send', authentication, authorization('admin'), emailController.sendEmail);

module.exports = router;
