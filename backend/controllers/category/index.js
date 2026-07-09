const categoryService = require('../../services/category');

async function getCategories(req, res) {
    try {
        const categories = await categoryService.getCategories();
        res.status(200).json({
            status: 200,
            message: 'Lấy danh sách danh mục thành công',
            data: categories
        });
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: 'Lỗi máy chủ khi lấy danh sách danh mục',
            error: err.message
        });
    }
}

async function createCategory(req, res) {
    try {
        const { categoryName } = req.body;
        
        if (!categoryName) {
            return res.status(400).json({
                status: 400,
                message: 'Tên danh mục không được để trống'
            });
        }

        const category = await categoryService.createCategory(categoryName);
        res.status(201).json({
            status: 201,
            message: 'Thêm danh mục thành công',
            data: category
        });
    } catch (err) {
        res.status(400).json({
            status: 400,
            message: err.message || 'Lỗi khi tạo danh mục'
        });
    }
}

async function updateCategory(req, res) {
    try {
        const { id } = req.params;
        const { categoryName } = req.body;

        if (!categoryName) {
            return res.status(400).json({
                status: 400,
                message: 'Tên danh mục mới không được để trống'
            });
        }

        const updated = await categoryService.updateCategory(id, categoryName);
        res.status(200).json({
            status: 200,
            message: 'Cập nhật danh mục thành công',
            data: updated
        });
    } catch (err) {
        res.status(400).json({
            status: 400,
            message: err.message
        });
    }
}

async function deleteCategory(req, res) {
    try {
        const { id } = req.params;

        await categoryService.deleteCategory(id);
        res.status(200).json({
            status: 200,
            message: 'Xóa danh mục thành công'
        });
    } catch (err) {
        res.status(400).json({
            status: 400,
            message: err.message
        });
    }
}

module.exports = {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory
};
