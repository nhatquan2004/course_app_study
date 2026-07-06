const categoryService = require('../../services/category');

async function getCategories(req, res) {
	const categoryList = await categoryService.getCategories();

	res.send(categoryList);
}

async function createCategory(req, res) {
	const { categoryName } = req.body;

	const category = await categoryService.createCategory(categoryName);

	res.send({
		status: 200,
		message: 'Thêm phân loại thành công',
		data: category,
	});
}

module.exports = {
	getCategories,
	createCategory,
};
