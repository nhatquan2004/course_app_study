const express = require('express');
const router = express.Router();
const categoryController = require('../../controllers/category');
const authentication = require('../../middlewares/authentication');
const adminAuthorization = require('../../middlewares/adminAuthorization');

router.get('/', authentication, categoryController.getCategories);
router.post('/', authentication, adminAuthorization, categoryController.createCategory);
router.put('/:id', authentication, adminAuthorization, categoryController.updateCategory);
router.delete('/:id', authentication, adminAuthorization, categoryController.deleteCategory);

module.exports = router;
