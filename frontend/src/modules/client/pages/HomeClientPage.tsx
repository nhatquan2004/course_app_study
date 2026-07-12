'use client';

import Link from 'next/link';
import CourseList from '@/modules/courses/components/CourseList';
import NavBar from '../components/NavBar';
import LogoutButton from '../components/LogoutButton';
import type { Course } from '@/modules/courses/types';
import type { Category } from '@/modules/categories/types';

export default function HomeClientPage() {
	return (
		<div className="flex min-h-screen bg-slate-50/50 text-slate-800">
			{/* Sidebar */}
			<aside className="w-64 border-r border-slate-200 bg-white px-5 py-8 flex flex-col gap-8 shrink-0">
				<div className="px-3 flex items-center gap-2.5">
					{/* Logo Icon */}
					<div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-extrabold text-base">
						C
					</div>
					<h1 className="text-lg font-bold text-slate-800 tracking-wide">Course App</h1>
				</div>

				<NavBar />
			</aside>

			{/* Main Content Area */}
			<main className="flex flex-1 flex-col min-w-0">
				{/* Top Header */}

				{/* Action Toolbar */}
				<div className="bg-white border-b border-slate-100 px-8 py-4 flex items-center justify-between">
					<p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
						Danh sách tất cả các khóa học
					</p>
					<Link
						href="/admin/course/create"
						className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-blue-500/10 hover:shadow hover:shadow-blue-500/20 transition-all duration-200 active:scale-95">
						<span>+</span> Thêm khóa học
					</Link>
				</div>

				{/* Grid List Section */}
				<section className="flex-1 p-8 overflow-y-auto">
					<CourseList courseList={initialCourses} categories={categories} />
				</section>
			</main>
		</div>
	);
}
