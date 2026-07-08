import type { Course } from '../types';
import { deleteCourseAction } from '../actions/courseActions';

type CourseItemProps = {
	course: Course;
	onEdit: (course: Course) => void;
};

export default function CourseItem({ course, onEdit }: CourseItemProps) {
	return (
		<li className="rounded-lg border border-stone-200 bg-stone-50 p-4 text-stone-700 shadow-sm transition hover:border-stone-300 hover:shadow-md">
			<div className="flex items-start justify-between gap-4">
				<div className="min-w-0">
					<h3 className="text-lg font-semibold text-stone-900">{course.name}</h3>
					<p className="mt-1 text-sm leading-6 text-stone-600">{course.description}</p>
					<p className="mt-3 text-sm font-medium text-emerald-700">{course.price}</p>
				</div>
				<div className="flex shrink-0 gap-2">
					<button
						type="button"
						onClick={() => onEdit(course)}
						className="rounded-md border border-stone-300 px-3 py-1.5 text-sm font-medium text-stone-700 transition hover:bg-stone-100">
						Sửa
					</button>

					<button
						type="button"
						onClick={async () => await deleteCourseAction(course._id)}
						className="rounded-md bg-red-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-red-700">
						Xóa
					</button>
				</div>
			</div>
		</li>
	);
}
