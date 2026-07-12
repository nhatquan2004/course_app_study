const express = require('express');
const router = express.Router();
const userController = require('../../controllers/user');
const authentication = require('../../middlewares/authentication');
const authorization = require('../../middlewares/authorization');

router.get('/', authentication, userController.getUser);
router.post('/create', userController.createUser);
router.delete('/:id', authentication, authorization('admin'), userController.deleteUser);

module.exports = router;
