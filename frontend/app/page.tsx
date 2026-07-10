import { getCourses } from '@/services/courseService';
import { getCategories } from '@/services/categoryService';
import HomeClientPage from '@/modules/client/pages/HomeClientPage';

export const metadata = {
	title: 'Dashboard | Course App',
	description: 'Quản lý khóa học trực tuyến cùng Course App.',
};

export default async function Home() {
	const courseList = await getCourses() || [];
	const categories = await getCategories() || [];

	return <HomeClientPage initialCourses={courseList} categories={categories} />;
}
