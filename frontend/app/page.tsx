import { redirect } from 'next/navigation';

export const metadata = {
	title: 'Dashboard | Course App',
	description: 'Quản lý khóa học trực tuyến cùng Course App.',
};

export default function Home() {
	redirect('/admin/course');
}
