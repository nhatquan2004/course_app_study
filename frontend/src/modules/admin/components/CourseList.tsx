'use client';

import { useState } from 'react';
import CourseItem from './CourseItem';
import EditCourseModal from './EditCourseModal';
import type { Course } from '../types';

export default function CourseList({ courseList }: { courseList: Course[] }) {
	const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

	return (
		<div className="w-full max-w-3xl">
			<ul className="flex flex-col gap-3">
				{courseList?.map(course => (
					<CourseItem key={course._id} course={course} onEdit={setSelectedCourse} />
				))}
			</ul>

			{selectedCourse && (
				<EditCourseModal course={selectedCourse} onClose={() => setSelectedCourse(null)} />
			)}
		</div>
	);
}
