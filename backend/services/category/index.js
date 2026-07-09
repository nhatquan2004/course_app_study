const Category = require('../../schemas/categorySchema');
const logger = require('../../utils/logger');

async function getCategories() {
    try {
        return await Category.find().sort({ createdAt: -1 });
    } catch (err) {
        logger.error(`Lỗi khi lấy danh mục: ${err.message}`);
        throw err;
    }
}

async function createCategory(categoryName) {
    try {
        const existingCategory = await Category.findOne({ categoryName });
        if (existingCategory) {
            throw new Error('Danh mục này đã tồn tại rồi!');
        }

        const newCategory = await Category.create({ categoryName });
        
        logger.info(`Tạo danh mục thành công: ${categoryName}`);
        return newCategory;
    } catch (err) {
        logger.error(`Lỗi khi tạo danh mục: ${err.message}`);
        throw err;
    }
}

async function updateCategory(id, categoryName) {
    try {
        const updatedCategory = await Category.findByIdAndUpdate(
            id,
            { categoryName },
            { new: true, runValidators: true }
        );
        
        if (!updatedCategory) {
            throw new Error('Không tìm thấy danh mục để cập nhật');
        }

        logger.info(`Cập nhật danh mục ID ${id} thành: ${categoryName}`);
        return updatedCategory;
    } catch (err) {
        logger.error(`Lỗi khi cập nhật danh mục: ${err.message}`);
        throw err;
    }
}

async function deleteCategory(id) {
    try {
        const deletedCategory = await Category.findByIdAndDelete(id);
        if (!deletedCategory) {
            throw new Error('Không tìm thấy danh mục để xóa');
        }

        logger.info(`Xóa danh mục ID: ${id}`);
        return deletedCategory;
    } catch (err) {
        logger.error(`Lỗi khi xóa danh mục: ${err.message}`);
        throw err;
    }
}

module.exports = {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory
};
