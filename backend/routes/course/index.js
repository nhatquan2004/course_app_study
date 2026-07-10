const express = require('express');
const router = express.Router();
const courseController = require('../../controllers/course');
const authentication = require('../../middlewares/authentication');
const authorization = require('../../middlewares/authorization');

router.get('/', authentication, authorization('admin', 'user'), courseController.getCourses);
router.post('/', authentication, authorization('admin', 'user'), courseController.createCourse);
router.patch('/:id', authentication, authorization('admin', 'user'), courseController.updateCourse);
router.delete(
	'/:id',
	authentication,
	authorization('admin', 'user'),
	courseController.deleteCourse,
);

module.exports = router;
