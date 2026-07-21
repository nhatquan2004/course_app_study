'use client';

import { useState } from 'react';
import CourseItem from './CourseItem';
import type { Course } from '../types';
import type { Category } from '@/modules/categories/types';
import SearchBar from '@/common/components/SearchBar';

export default function CourseList({
	courses,
	categories,
}: {
	courses: Course[];
	categories: Category[];
}) {
	const [searchQuery, setSearchQuery] = useState('');

	const filteredCourses = courses.filter(
		c =>
			c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			(c.description && c.description.toLowerCase().includes(searchQuery.toLowerCase())),
	);

	return (
		<div className="w-full max-w-5xl flex flex-col gap-5 animate-in fade-in duration-300">
			<div className="flex justify-start">
				<SearchBar
					value={searchQuery}
					onChange={setSearchQuery}
					placeholder="Tìm kiếm khóa học..."
					className="w-full md:w-80"
				/>
			</div>

			<div className="flex flex-col gap-3.5">
				{filteredCourses.length === 0 ? (
					<div className="text-center text-[var(--color-muted)] text-xs py-16 border border-dashed border-[var(--color-rule)] rounded-[20px] bg-white/40 italic">
						Không tìm thấy khóa học nào.
					</div>
				) : (
					filteredCourses.map(course => (
						<CourseItem key={course._id} course={course} categories={categories} />
					))
				)}
			</div>
		</div>
	);
}
