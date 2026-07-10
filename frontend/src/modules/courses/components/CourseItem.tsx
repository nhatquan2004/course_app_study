import type { Course } from '../types';
import { deleteCourseAction } from '../actions/courseActions';

type CourseItemProps = {
	course: Course;
	onEdit: (course: Course) => void;
};

export default function CourseItem({ course, onEdit }: CourseItemProps) {
	return (
		<div className="flex flex-col bg-white rounded-xl border border-slate-200 overflow-hidden hover:border-blue-300 hover:shadow-[0_10px_30px_rgba(59,130,246,0.04)] transition-all duration-200">
			{/* Cover Image or Fallback Gradient */}
			<div className="h-40 w-full bg-slate-100 relative overflow-hidden flex items-center justify-center">
				{course.coverImage ? (
					// eslint-disable-next-line @next/next/no-img-element
					<img
						src={course.coverImage}
						alt={course.name}
						className="object-cover h-full w-full"
					/>
				) : (
					<div className="w-full h-full bg-gradient-to-tr from-blue-500/10 to-indigo-500/10 flex items-center justify-center">
						<span className="text-blue-500 text-xs font-semibold uppercase tracking-wider">Course App</span>
					</div>
				)}
			</div>

			{/* Details */}
			<div className="p-5 flex-1 flex flex-col justify-between">
				<div>
					<h3 className="text-base font-bold text-slate-900 line-clamp-1">{course.name}</h3>
					<p className="mt-1.5 text-xs text-slate-500 leading-relaxed line-clamp-2 h-8">{course.description}</p>
				</div>

				<div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
					<span className="text-sm font-bold text-blue-600">
						{course.price ? Number(course.price).toLocaleString('vi-VN') + ' VNĐ' : 'Miễn phí'}
					</span>
					
					<div className="flex gap-1.5">
						<button
							type="button"
							onClick={() => onEdit(course)}
							className="rounded-lg border border-slate-200 hover:bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-800 transition active:scale-95"
						>
							Sửa
						</button>
						<button
							type="button"
							onClick={async () => await deleteCourseAction(course._id)}
							className="rounded-lg border border-red-100 bg-red-50/50 hover:bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 hover:text-red-700 transition active:scale-95"
						>
							Xóa
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
