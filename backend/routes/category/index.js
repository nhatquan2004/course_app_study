const express = require('express');
const router = express.Router();
const categoryController = require('../../controllers/category');
const authentication = require('../../middlewares/authentication');

router.get('/',authentication, categoryController.getCategories);
router.post('/',authentication, categoryController.createCategory);

module.exports = router;
