const express = require('express');
const router = express.Router();
const courseController = require('../../controllers/course');
const authentication = require('../../middlewares/authentication');
const authorization = require('../../middlewares/authorization');

router.get('/', authentication, authorization('admin'), courseController.getCourses);
router.post('/', authentication, authorization('admin'), courseController.createCourse);
router.patch('/:id', authentication, authorization('admin'), courseController.updateCourse);
router.delete('/:id', authentication, authorization('admin'), courseController.deleteCourse);

module.exports = router;
