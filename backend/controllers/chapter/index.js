const chapterService = require('../../services/chapter');

async function getChapters(req, res, next) {
	try {
		const { courseId } = req.params;

		const chapters = await chapterService.getChapters(courseId);

		res.status(200).json({
			success: true,
			message: 'Đã lấy được các chương',
			data: chapters,
		});
	} catch (err) {
		next(err);
	}
}

async function createChapter(req, res, next) {
	try {
		const { courseId } = req.params;
		const { name, totalDuration, totalLessons } = req.body;

		if (!name?.trim()) {
			return res.status(400).json({
				success: false,
				message: 'Không thể để trống tên chương',
			});
		}

		const chapter = await chapterService.createChapter(
			name
				.trim()
				.split(' ')
				.map(word => word[0].toUpperCase() + word.slice(1))
				.join(' '),
			totalDuration,
			totalLessons,
			courseId,
		);

		res.status(201).json({
			success: true,
			message: 'Thêm chương thành công',
			data: chapter,
		});
	} catch (err) {
		next(err);
	}
}

async function deleteChapter(req, res, next) {
	try {
		const { chapterId } = req.params;

		await chapterService.deleteChapter(chapterId);

		res.status(200).json({
			success: true,
			message: 'Xóa chương thành công',
		});
	} catch (err) {
		next(err);
	}
}

async function updateChapter(req, res, next) {
	try {
		const { chapterId } = req.params;
		const { name } = req.body;

		if (!name?.trim()) {
			return res.status(400).json({
				success: false,
				message: 'Không thể để trống tên chương',
			});
		}

		const formattedName = name
			.trim()
			.split(' ')
			.map(word => word[0].toUpperCase() + word.slice(1))
			.join(' ');

		const chapter = await chapterService.updateChapter(chapterId, formattedName);

		res.status(200).json({
			success: true,
			message: 'Cập nhật chương thành công',
			data: chapter,
		});
	} catch (err) {
		next(err);
	}
}

module.exports = {
	getChapters,
	createChapter,
	deleteChapter,
	updateChapter,
};
