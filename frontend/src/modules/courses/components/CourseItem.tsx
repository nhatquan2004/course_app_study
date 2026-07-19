'use client';

import type { Course } from '../types';
import { deleteCourseAction } from '../actions/courseActions';
import { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import Modal from '@/common/components/Modal';
import EditCourseModal from './EditCourseModal';
import type { Category } from '@/modules/categories/types';

type CourseItemProps = {
	course: Course;
	categories: Category[];
};

export default function CourseItem({ course, categories }: CourseItemProps) {
	const router = useRouter();
	const [openMenu, setOpenMenu] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function handleClickOutside(e: MouseEvent) {
			if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
				setOpenMenu(false);
			}
		}

		document.addEventListener('mousedown', handleClickOutside);

		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	async function handleDeleteCourse() {
		setOpenMenu(false);
		const data = await deleteCourseAction(course._id);
		toast.success(data.message);
	}

	return (
		<div className="flex bg-white rounded-xl border border-slate-200/80 overflow-visible hover:border-slate-300 hover:shadow-xs transition-all duration-200 items-center pr-4 h-20">
			<div className="h-full w-32 bg-slate-100 relative overflow-hidden flex items-center justify-center shrink-0 border-r border-slate-100">
				{course.coverImage ? (
					<img src={course.coverImage} alt={course.name} className="object-cover h-full w-full" />
				) : (
					<div className="w-full h-full bg-linear-to-tr from-blue-500/10 to-indigo-500/10 flex items-center justify-center">
						<span className="text-blue-500 text-[9px] font-bold uppercase tracking-wider">
							Course App
						</span>
					</div>
				)}
			</div>

			<div className="px-4 py-2 flex-1 min-w-0 flex flex-col justify-center">
				<h3 className="text-xs font-bold text-slate-800 truncate">{course.name}</h3>
				<p className="mt-0.5 text-[11px] text-slate-400 truncate max-w-md">
					{course.description || 'Không có mô tả'}
				</p>
			</div>

			<div className="flex items-center gap-4 shrink-0">
				<span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
					{course.price ? Number(course.price).toLocaleString('vi-VN') + ' VNĐ' : 'Miễn phí'}
				</span>

				{/* Menu Pop-up with Modal context */}
				<Modal>
					<div className="relative" ref={menuRef}>
						<button
							type="button"
							onClick={() => {
								setOpenMenu(prev => !prev);
							}}
							className="rounded-lg p-2 hover:bg-slate-100 transition cursor-pointer">
							{' '}
							⋮
						</button>

						{openMenu && (
							<div className="absolute right-0 mt-2 w-36 rounded-lg border border-slate-200 bg-white shadow-lg z-20">
								<Modal.Open openWindowName="edit-course">
									<button
										type="button"
										className="w-full px-4 py-2 text-left text-sm hover:bg-slate-50">
										Sửa thông tin khóa
									</button>
								</Modal.Open>

								<button
									type="button"
									onClick={() => {
										router.push(`/admin/course/${course._id}/syllabus_management`);
									}}
									className="w-full px-4 py-2 text-left text-sm hover:bg-slate-50">
									Chỉnh sửa chương trình
								</button>

								<button
									type="button"
									onClick={handleDeleteCourse}
									className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50">
									Xóa
								</button>
							</div>
						)}
					</div>

					<Modal.Window name="edit-course">
						<EditCourseModal course={course} categories={categories} />
					</Modal.Window>
				</Modal>
			</div>
		</div>
	);
}
