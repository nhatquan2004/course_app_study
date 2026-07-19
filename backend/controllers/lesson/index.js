const lessonService = require('../../services/lesson');

async function getLessonsByChapter(req, res, next) {
	try {
		const { chapterId } = req.params;
		const lessons = await lessonService.getLessonsByChapter(chapterId);

		res.status(200).json({
			success: true,
			message: 'Đã lấy được danh sách bài học',
			data: lessons,
		});
	} catch (err) {
		next(err);
	}
}

async function createLesson(req, res, next) {
	try {
		const { courseId, chapterId } = req.params;
		const { lessonName, duration, isPreviewable } = req.body;

		if (!lessonName?.trim()) {
			return res.status(400).json({
				success: false,
				message: 'Không thể để trống tên bài học',
			});
		}

		const lesson = await lessonService.createLesson(
			lessonName.trim(),
			Number(duration) || 0,
			!!isPreviewable,
			chapterId,
			courseId
		);

		res.status(201).json({
			success: true,
			message: 'Thêm bài học thành công',
			data: lesson,
		});
	} catch (err) {
		next(err);
	}
}

async function updateLesson(req, res, next) {
	try {
		const { lessonId } = req.params;
		const { lessonName, duration, isPreviewable } = req.body;

		const updateData = {};
		if (lessonName !== undefined) updateData.lessonName = lessonName.trim();
		if (duration !== undefined) updateData.duration = Number(duration) || 0;
		if (isPreviewable !== undefined) updateData.isPreviewable = !!isPreviewable;

		const lesson = await lessonService.updateLesson(lessonId, updateData);

		res.status(200).json({
			success: true,
			message: 'Cập nhật bài học thành công',
			data: lesson,
		});
	} catch (err) {
		next(err);
	}
}

async function deleteLesson(req, res, next) {
	try {
		const { lessonId } = req.params;
		await lessonService.deleteLesson(lessonId);

		res.status(200).json({
			success: true,
			message: 'Xóa bài học thành công',
		});
	} catch (err) {
		next(err);
	}
}

module.exports = {
	getLessonsByChapter,
	createLesson,
	updateLesson,
	deleteLesson,
};
