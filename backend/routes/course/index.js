const express = require('express');
const router = express.Router();
const courseController = require('../../controllers/course');
const chapterController = require('../../controllers/chapter');
const authentication = require('../../middlewares/authentication');
const authorization = require('../../middlewares/authorization');

//Khóa học
router.get('/', authentication, authorization('admin', 'user'), courseController.getCourses);
router.post('/', authentication, authorization('admin', 'user'), courseController.createCourse);
router.patch('/:id', authentication, authorization('admin', 'user'), courseController.updateCourse);
router.delete(
	'/:id',
	authentication,
	authorization('admin', 'user'),
	courseController.deleteCourse,
);

//Chương
router.get('/:courseId/chapters', chapterController.getChapters);
router.post('/:courseId/chapters', chapterController.createChapter);
router.delete('/:courseId/chapters/:chapterId', chapterController.deleteChapter);

module.exports = router;
