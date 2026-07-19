const chapterService = require('../../services/chapter');

async function getChapters(req, res) {
	const courseId = req.params.courseId;

	const chapters = await chapterService.getChapters(courseId);

	res.status(200).send({
		success: true,
		message: 'Đã lấy được các chương',
		data: chapters,
	});
}

async function createChapter(req, res) {
	const courseId = req.params.courseId;
	const { name, totalDuration, totalLessons } = req.body;

	const chapter = await chapterService.createChapter(name, totalDuration, totalLessons, courseId);

	res.status(200).send({
		success: true,
		message: 'Thêm chương thành công',
		data: chapter,
	});
}

async function deleteChapter(req, res) {
	const chapterId = req.params.chapterId;

	await chapterService.deleteChapter(chapterId);

	res.status(204).send({
		success: true,
		message: 'Xóa chương thành công',
	});
}

module.exports = { getChapters, createChapter, deleteChapter };
