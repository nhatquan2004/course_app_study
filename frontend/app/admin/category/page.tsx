import { getCategories } from '@/services/categoryService';
import CategoryList from '@/modules/categories/components/CategoryList';
import DashboardLayout from '@/modules/dashboard/DashboardLayout';

export const metadata = {
	title: 'Quản lý danh mục | Course App',
};

export default async function CategoryPage() {
	const categories = (await getCategories()) || [];

	return (
		<DashboardLayout
			title="Phân loại"
			description="Danh sách tất cả danh mục"
			createHref="/admin/category/create"
			createLabel="Thêm danh mục">
			<CategoryList categoryList={categories} />
		</DashboardLayout>
	);
}
