const express = require('express');
const router = express.Router();
const categoryController = require('../../controllers/category');
const authentication = require('../../middlewares/authentication');
const authorization = require('../../middlewares/authorization');

router.get('/', authentication, authorization('admin', 'user'), categoryController.getCategories);
router.post('/', authentication, authorization('admin', 'user'), categoryController.createCategory);
router.put(
	'/:id',
	authentication,
	authorization('admin', 'user'),
	categoryController.updateCategory,
);
router.delete(
	'/:id',
	authentication,
	authorization('admin', 'user'),
	categoryController.deleteCategory,
);

module.exports = router;
