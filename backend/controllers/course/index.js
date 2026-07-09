const courseService = require('../../services/course');
const Course = require('../../schemas/courseSchema');

async function getCourses(req, res) {
	console.log(req);
	const { role } = req.user;

	if (role !== 'admin') {
		return res.status(403).json({ message: 'Bạn không có quyền truy cập admin' });
	}

	const coursesList = await courseService.getCourses();
	res.send(coursesList);
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
	res.send({
		status: 200,
		message: 'Sửa khóa học thành công',
		data: course,
	});
}

async function createCourse(req, res) {
	const { name, description, price, coverImage, categoryIds } = req.body;

	const course = await courseService.createCourse(name, description, price, coverImage, categoryIds);

	res.send({
		status: 200,
		message: 'Thêm khóa học thành công',
		data: course,
	});
}

async function deleteCourse(req, res) {
	console.log('req', req);
	const deleteCourse = await courseService.deleteCourse(req.params.id);

	res.send({
		status: 204,
		message: 'Đã xóa khóa học',
		data: deleteCourse,
	});
}

module.exports = {
	getCourses,
	createCourse,
	deleteCourse,
	updateCourse,
};
