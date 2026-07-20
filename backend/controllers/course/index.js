const courseService = require('../../services/course');
const Course = require('../../schemas/courseSchema');
const chapterService = require('../../services/chapter');
const lessonService = require('../../services/lesson');
const Chapter = require('../../schemas/chapterSchema');
const Lesson = require('../../schemas/lessonSchema');

async function getCourses(req, res) {
	const courseList = await courseService.getCourses();

	res.status(200).send(courseList);
}

async function updateCourse(req, res) {
	const { id } = req.params;
	const { name, description, price, coverImage, categoryIds, status } = req.body;
	const course = await courseService.updateCourse(
		id,
		name,
		description,
		price,
		coverImage,
		categoryIds,
		status,
	);
	res.status(200).send({
		success: true,
		message: 'Sửa khóa học thành công',
		data: course,
	});
}

async function createCourse(req, res) {
	try {
		const { name, description, price, coverImage, categoryIds } = req.body;

		const course = await courseService.createCourse(
			name,
			description,
			price,
			coverImage,
			categoryIds,
		);

		if (course) {
			const chapter = await chapterService.createChapter(
				'Chương 1: Giới thiệu khóa học',
				0,
				1,
				course._id.toString()
			);
			if (chapter) {
				await lessonService.createLesson(
					'Bài học 1: Chào mừng bạn đến với khóa học',
					0,
					false,
					chapter._id.toString(),
					course._id.toString()
				);
			}
		}

		res.status(200).send({
			success: true,
			message: 'Thêm khóa học thành công',
			data: course,
		});
	} catch (err) {
		res.status(500).json({ success: false, message: err.message });
	}
}

async function deleteCourse(req, res) {
	await courseService.deleteCourse(req.params.id);

	res.status(204).send({
		success: true,
		message: 'Đã xóa khóa học',
	});
}

async function getCourse(req, res) {
	try {
		const course = await Course.findById(req.params.id);
		if (!course) {
			return res.status(404).json({ message: 'Không tìm thấy khóa học' });
		}
		res.status(200).send(course);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
}

async function saveBatchSyllabus(req, res) {
	try {
		const { courseId } = req.params;
		const { chapters } = req.body;

		if (!Array.isArray(chapters)) {
			return res.status(400).json({ success: false, message: 'Danh sách chương học không hợp lệ' });
		}

		const savedChapterIds = [];
		const savedLessonIds = [];

		for (const ch of chapters) {
			let chapterDbId;

			if (ch._id && !ch._id.startsWith('temp_')) {
				await Chapter.findByIdAndUpdate(ch._id, { name: ch.name });
				chapterDbId = ch._id;
			} else {
				const newCh = await Chapter.create({
					name: ch.name,
					courseId,
					totalDuration: 0,
					totalLessons: 0,
				});
				chapterDbId = newCh._id.toString();
			}
			savedChapterIds.push(chapterDbId);

			if (Array.isArray(ch.lessons)) {
				for (const les of ch.lessons) {
					let lessonDbId;
					if (les._id && !les._id.startsWith('temp_')) {
						await Lesson.findByIdAndUpdate(les._id, {
							lessonName: les.lessonName,
							isPreviewable: !!les.isPreviewable,
							chapterId: chapterDbId,
						});
						lessonDbId = les._id;
					} else {
						const newLes = await Lesson.create({
							lessonName: les.lessonName,
							duration: 0,
							isPreviewable: !!les.isPreviewable,
							chapterId: chapterDbId,
							courseId,
						});
						lessonDbId = newLes._id.toString();
					}
					savedLessonIds.push(lessonDbId);
				}
			}
		}

		await Chapter.deleteMany({ courseId, _id: { $nin: savedChapterIds } });
		await Lesson.deleteMany({ courseId, _id: { $nin: savedLessonIds } });

		res.status(200).json({
			success: true,
			message: 'Đồng bộ giáo trình thành công',
		});
	} catch (err) {
		res.status(500).json({ success: false, message: err.message });
	}
}

module.exports = {
	getCourses,
	createCourse,
	deleteCourse,
	updateCourse,
	getCourse,
	saveBatchSyllabus,
};
