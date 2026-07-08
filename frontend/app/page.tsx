import { getCourses } from '@/services/courseService';
import HomeClientPage from '@/modules/client/pages/HomeClientPage';

export const metadata = {
	title: 'Dashboard | Course App',
	description: 'Quản lý khóa học trực tuyến cùng Course App.',
};

export default async function Home() {
	const courseList = await getCourses() || [];

	return <HomeClientPage initialCourses={courseList} />;
}
