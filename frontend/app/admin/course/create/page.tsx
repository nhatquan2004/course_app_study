import CreateCourseAdminPage from '@/modules/admin/pages/CreateCourseAdminPage';
import { getCategories } from '@/services/categoryService';

export const metadata = {
	title: 'Thêm khóa học | Admin | Course App',
	description: 'Tạo khóa học mới trong hệ thống quản lý Course App.',
};

export default async function CreateCoursePage() {
	const categories = await getCategories() || [];
	return <CreateCourseAdminPage categories={categories} />;
}
