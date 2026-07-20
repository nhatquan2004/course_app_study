const Course = require('../../schemas/courseSchema');

async function getCourses() {
	try {
		const courses = await Course.find();

		return courses;
	} catch (err) {
		console.log('Error: không tải được khóa học', err);
	}
}

async function updateCourse(id, name, description, price, coverImage, categoryIds, status) {
	try {
		const updateData = {};
		if (name !== undefined) updateData.name = name;
		if (description !== undefined) updateData.description = description;
		if (price !== undefined) updateData.price = price;
		if (coverImage !== undefined) updateData.coverImage = coverImage;
		if (categoryIds !== undefined) updateData.categoryIds = categoryIds;
		if (status !== undefined) updateData.status = status;

		const course = await Course.findByIdAndUpdate(
			id,
			updateData,
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
