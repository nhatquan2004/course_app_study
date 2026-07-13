'use client';

import { useState } from 'react';
import CourseItem from './CourseItem';
import EditCourseModal from './EditCourseModal';
import type { Course } from '../types';
import type { Category } from '@/modules/categories/types';

export default function CourseList({
	courses,
	categories,
}: {
	courses: Course[];
	categories: Category[];
}) {
	const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

	return (
		<div className="w-full">
			<div className="flex flex-col gap-4">
				{courses?.map(course => (
					<CourseItem key={course._id} course={course} onEdit={setSelectedCourse} />
				))}
			</div>

			{selectedCourse && (
				<EditCourseModal
					course={selectedCourse}
					categories={categories}
					onClose={() => setSelectedCourse(null)}
				/>
			)}
		</div>
	);
}
