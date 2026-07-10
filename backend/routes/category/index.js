const express = require('express');
const router = express.Router();
const categoryController = require('../../controllers/category');
const authentication = require('../../middlewares/authentication');
const authorization = require('../../middlewares/authorization');

router.get('/', authentication, authorization('admin'), categoryController.getCategories);
router.post('/', authentication, authorization('admin'), categoryController.createCategory);
router.put('/:id', authentication, authorization('admin'), categoryController.updateCategory);
router.delete('/:id', authentication, authorization('admin'), categoryController.deleteCategory);

module.exports = router;
