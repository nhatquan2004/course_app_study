const express = require('express');
const router = express.Router();
const courseController = require('../../controllers/course');
const chapterController = require('../../controllers/chapter');
const lessonController = require('../../controllers/lesson');
const authentication = require('../../middlewares/authentication');
const authorization = require('../../middlewares/authorization');

//Khóa học
router.get('/', authentication, authorization('admin', 'user'), courseController.getCourses);
router.get('/:id', authentication, authorization('admin', 'user'), courseController.getCourse);
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
router.patch('/:courseId/chapters/:chapterId', chapterController.updateChapter);
router.delete('/:courseId/chapters/:chapterId', chapterController.deleteChapter);

//Bài học
router.get('/:courseId/chapters/:chapterId/lessons', lessonController.getLessonsByChapter);
router.post('/:courseId/chapters/:chapterId/lessons', lessonController.createLesson);
router.patch('/:courseId/chapters/:chapterId/lessons/:lessonId', lessonController.updateLesson);
router.delete('/:courseId/chapters/:chapterId/lessons/:lessonId', lessonController.deleteLesson);

module.exports = router;
