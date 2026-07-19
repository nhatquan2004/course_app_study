const Course = require('../../schemas/courseSchema');

async function getCourses() {
	try {
		const courses = await Course.find();

		return courses;
	} catch (err) {
		console.log('Error: không tải được khóa học', err);
	}
}

async function updateCourse(id, name, description, price, coverImage, categoryIds) {
	try {
		const course = await Course.findByIdAndUpdate(
			id,
			{
				name,
				description,
				price,
				coverImage,
				categoryIds,
			},
			{
				new: true,
			},
		);

		return course;
	} catch (err) {
		console.log('Error: không thể sửa khóa học', err);
	}
}

async function createCourse(name, description, price, coverImage, categoryIds) {
	try {
		const course = await Course.create({
			name,
			description,
			price,
			coverImage,
			categoryIds,
			createdAt: new Date(),
		});

		return course;
	} catch (err) {
		Logger.info('Error: không thể tạo khóa học', err);
	}
}

async function deleteCourse(id) {
	try {
		const deletedCourse = await Course.findByIdAndDelete(id);
	} catch (err) {
		console.log('Error: không thể xóa khóa học', err);
	}
}

module.exports = {
	getCourses,
	createCourse,
	updateCourse,
	deleteCourse,
};
