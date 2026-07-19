const courseService = require('../../services/course');
const Course = require('../../schemas/courseSchema');
const chapterService = require('../../services/chapter');
const lessonService = require('../../services/lesson');

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

module.exports = {
	getCourses,
	createCourse,
	deleteCourse,
	updateCourse,
	getCourse,
};
