import CourseList from '@/modules/courses/components/CourseList';
import DashboardLayout from '@/modules/dashboard/DashboardLayout';
import { getCategories } from '@/services/categoryService';
import { getCourses } from '@/services/courseService';

export default async function CoursePage() {
	const courses = (await getCourses()) || [];
	const categories = (await getCategories()) || [];

	return (
		<DashboardLayout
			title="Khóa học"
			description="Danh sách tất cả các khóa học"
			createHref="/admin/course/create"
			createLabel="Thêm khóa học">
			<CourseList courses={courses} categories={categories} />
		</DashboardLayout>
	);
}
