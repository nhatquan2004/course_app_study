const express = require('express');
const router = express.Router();
const courseController = require('../../controllers/course');
const authentication = require('../../middlewares/authentication');
const authorization = require('../../middlewares/authorization');

router.get('/', authentication, authorization, courseController.getCourses);
router.post('/', authentication, courseController.createCourse);
router.patch('/:id', authentication, courseController.updateCourse);
router.delete('/:id', authentication, courseController.deleteCourse);

module.exports = router;
