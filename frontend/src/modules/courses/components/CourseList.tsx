'use client';

import { useState } from 'react';
import CourseItem from './CourseItem';
import EditCourseModal from './EditCourseModal';
import type { Course } from '../types';
import type { Category } from '@/modules/categories/types';

export default function CourseList({
	courseList,
	categories,
}: {
	courseList: Course[];
	categories: Category[];
}) {
	const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

	return (
		<div className="w-full">
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{courseList?.map(course => (
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
