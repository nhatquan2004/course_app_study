const Chapter = require('../../schemas/chapterSchema');
const logger = require('../../utils/logger');
const AppError = require('../../utils/AppError');

async function getChapters(courseId) {
	try {
		return await Chapter.find({ courseId });
	} catch (err) {
		logger.error('Không lấy được danh sách chương', err);
		throw err;
	}
}

async function createChapter(name, totalDuration, totalLessons, courseId) {
	try {
		const chapter = await Chapter.create({
			name,
			totalDuration,
			totalLessons,
			courseId,
			createdAt: new Date(),
		});

		return chapter;
	} catch (err) {
		logger.error('Không thể tạo chương', err);
		throw err;
	}
}

async function deleteChapter(chapterId) {
	try {
		const chapter = await Chapter.findByIdAndDelete(chapterId);

		if (!chapter) {
			throw new AppError('Không tìm thấy chương', 404);
		}

		return chapter;
	} catch (err) {
		logger.error('Không xóa được chương', err);
		throw err;
	}
}

module.exports = {
	getChapters,
	createChapter,
	deleteChapter,
};
