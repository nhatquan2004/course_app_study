const courseService = require('../../services/course');
const Course = require('../../schemas/courseSchema');

async function getCourses(req, res) {
	const courseList = await courseService.getCourses();

	res.status(200).send(courseList);
}

async function updateCourse(req, res) {
	const { id } = req.params;
	const { name, description, price, coverImage, categoryIds } = req.body;
	const course = await courseService.updateCourse(
		id,
		name,
		description,
		price,
		coverImage,
		categoryIds,
	);
	res.status(200).send({
		success: true,
		message: 'Sửa khóa học thành công',
		data: course,
	});
}

async function createCourse(req, res) {
	const { name, description, price, coverImage, categoryIds } = req.body;

	const course = await courseService.createCourse(
		name,
		description,
		price,
		coverImage,
		categoryIds,
	);

	res.status(200).send({
		success: true,
		message: 'Thêm khóa học thành công',
		data: course,
	});
}

async function deleteCourse(req, res) {
	await courseService.deleteCourse(req.params.id);

	res.status(204).send({
		success: true,
		message: 'Đã xóa khóa học',
	});
}

module.exports = {
	getCourses,
	createCourse,
	deleteCourse,
	updateCourse,
};
