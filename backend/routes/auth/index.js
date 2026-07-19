const express = require('express');
const router = express.Router();
const authController = require('../../controllers/auth');

router.post('/login', authController.login);
router.get('/me', authController.me);
router.get('/verify-invite', authController.verifyInvite);
router.post('/set-password', authController.setPassword);

module.exports = router;
