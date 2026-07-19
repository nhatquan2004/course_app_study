const Chapter = require('../../schemas/chapterSchema');

async function getChapters(courseId) {
	try {
		const chapters = await Chapter.find({ courseId });
		return chapters;
	} catch (err) {}
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
		console.log('Không thể tạo chương mới');
	}
}

async function deleteChapter(chapterId) {
	try {
		await Chapter.findByIdAndDelete(chapterId);
	} catch (err) {
		console.log(err);
	}
}

module.exports = { getChapters, createChapter, deleteChapter };
