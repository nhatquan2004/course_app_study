'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CourseItem from '@/features/courses/components/CourseItem';
import EditCourseModal from '@/features/courses/components/EditCourseModal';
import type { Course } from '@/features/courses/types';

export default function CourseList({ courseList }: { courseList: Course[] }) {
	const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
	const router = useRouter();

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
