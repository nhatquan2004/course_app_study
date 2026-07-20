const Lesson = require('../../schemas/lessonSchema');
const logger = require('../../utils/logger');
const AppError = require('../../utils/AppError');

async function getLessonsByChapter(chapterId) {
	try {
		return await Lesson.find({ chapterId });
	} catch (err) {
		logger.error('Không lấy được danh sách bài học', err);
		throw err;
	}
}

async function createLesson(lessonName, duration, isPreviewable, chapterId, courseId) {
	try {
		const lesson = await Lesson.create({
			lessonName,
			duration,
			isPreviewable,
			chapterId,
			courseId,
		});
		return lesson;
	} catch (err) {
		logger.error('Không thể tạo bài học', err);
		throw err;
	}
}

async function updateLesson(lessonId, updateData) {
	try {
		const lesson = await Lesson.findByIdAndUpdate(lessonId, updateData, { new: true });
		if (!lesson) {
			throw new AppError('Không tìm thấy bài học', 404);
		}
		return lesson;
	} catch (err) {
		logger.error('Không thể cập nhật bài học', err);
		throw err;
	}
}

async function deleteLesson(lessonId) {
	try {
		const lesson = await Lesson.findByIdAndDelete(lessonId);
		if (!lesson) {
			throw new AppError('Không tìm thấy bài học', 404);
		}
		return lesson;
	} catch (err) {
		logger.error('Không thể xóa bài học', err);
		throw err;
	}
}

module.exports = {
	getLessonsByChapter,
	createLesson,
	updateLesson,
	deleteLesson,
};
