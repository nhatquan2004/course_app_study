import Link from 'next/link';
import CourseList from '@/features/courses/components/CourseList';
import NavBar from '@/shared/ui/NavBar';
import { getCourses } from '@/services/courseService';
import LogoutButton from '@/shared/ui/LogoutButton';

export default async function Home() {
	const courseList = await getCourses();

	return (
		<div className="flex min-h-screen bg-zinc-100 text-zinc-900">
			<aside className="w-64 border-r border-zinc-200 bg-white px-4 py-6">
				<h1 className="mb-8 px-3 text-xl font-semibold">Dashboard</h1>

				<NavBar />
			</aside>

			<main className="flex flex-1 flex-col gap-2">
				<header className="border-b border-zinc-200 bg-white px-8 py-5">
					<div className="flex items-center justify-between">
						<h2 className="text-2xl font-semibold">Text</h2>
						<LogoutButton />
					</div>
				</header>

				<div className="bg-white px-4 py-3">
					<Link
						href="/admin/course/create"
						className="inline-block rounded-md border border-stone-300 px-3 py-1.5 text-sm font-medium text-stone-700 transition hover:bg-stone-100">
						Thêm khóa học
					</Link>
				</div>

				<section className="flex-1 p-8">
					<CourseList courseList={courseList} />
				</section>
			</main>
		</div>
	);
}
