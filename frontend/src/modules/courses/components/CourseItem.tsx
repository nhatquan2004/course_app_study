'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { Course } from '../types';
import type { Category } from '@/modules/categories/types';
import { deleteCourseAction } from '../actions/courseActions';
import EditCourseModal from './EditCourseModal';
import Modal from '@/common/components/Modal';
import { toast } from 'react-toastify';
import { HiOutlinePencilSquare, HiOutlineTrash, HiOutlineBookOpen, HiOutlineEllipsisVertical } from 'react-icons/hi2';

type Props = {
	course: Course;
	categories: Category[];
};

export default function CourseItem({ course, categories }: Props) {
	const router = useRouter();
	const [openMenu, setOpenMenu] = useState(false);
	const [imageError, setImageError] = useState(false);
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
		if (!confirm(`Bạn có chắc chắn muốn xóa khóa học "${course.name}"?`)) return;

		try {
			const data = await deleteCourseAction(course._id);
			if (data && data.success !== false) {
				toast.success(data.message || 'Xóa khóa học thành công');
				router.refresh();
			} else {
				toast.error(data.message || 'Xóa khóa học thất bại');
			}
		} catch (err) {
			toast.error('Lỗi kết nối mạng.');
		}
	}

	return (
		<div className={`tactile-card w-full h-24 overflow-visible flex items-center pr-5 relative bg-white ${openMenu ? 'z-45' : 'z-0'}`}>
			{/* Cover image area */}
			<div className="h-full w-36 bg-[var(--color-paper)] relative overflow-hidden flex items-center justify-center shrink-0 border-r border-[var(--color-rule)] rounded-l-[11px]">
				{course.coverImage && !imageError ? (
					<img
						src={course.coverImage}
						alt={course.name}
						onError={() => setImageError(true)}
						className="object-cover h-full w-full transition-transform duration-300 hover:scale-105"
					/>
				) : (
					<div className="w-full h-full bg-gradient-to-tr from-[var(--color-accent)]/5 to-[var(--color-accent-3)]/5 flex flex-col items-center justify-center p-2 text-center select-none">
						<span className="text-[var(--color-muted)] text-[8px] font-bold font-mono uppercase tracking-widest leading-none">
							course
						</span>
						<span className="text-[var(--color-ink)] text-xs font-black uppercase tracking-tight mt-1 truncate max-w-full font-mono">
							{course.name.substring(0, 3)}
						</span>
					</div>
				)}
			</div>

			{/* Info Area */}
			<div className="px-5 py-2 flex-1 min-w-0 flex flex-col justify-center">
				<div className="flex flex-wrap gap-1.5 mb-1">
					{course.categoryIds && course.categoryIds.length > 0 ? (
						course.categoryIds.map(id => {
							const cat = categories.find(c => c._id === id);
							if (!cat) return null;
							return (
								<span
									key={id}
									className="inline-flex items-center rounded bg-[var(--color-accent)]/5 px-2 py-0.5 text-[8px] font-bold font-mono text-[var(--color-accent)] border border-[var(--color-accent)]/10 uppercase tracking-wider"
								>
									{cat.categoryName}
								</span>
							);
						})
					) : (
						<span className="inline-flex items-center rounded bg-[var(--color-paper-3)] px-2 py-0.5 text-[8px] font-bold font-mono text-[var(--color-muted)] border border-[var(--color-rule)] uppercase tracking-wider">
							Chưa phân loại
						</span>
					)}
				</div>
				<h3 className="text-xs font-extrabold text-[var(--color-ink)] tracking-tight truncate leading-snug">{course.name}</h3>
				<p className="mt-0.5 text-[10px] text-[var(--color-muted)] line-clamp-1 leading-normal font-medium">
					{course.description || 'Không có mô tả chi tiết cho khóa học này.'}
				</p>
			</div>

			{/* Price and Status Tags */}
			<div className="flex items-center gap-4 shrink-0">
				<span className="text-[10px] font-bold text-[var(--color-accent)] bg-[var(--color-accent)]/5 px-2.5 py-1 rounded-md border border-[var(--color-accent)]/10 font-mono shadow-3xs">
					{course.price ? Number(course.price).toLocaleString('vi-VN') + ' VNĐ' : 'Miễn phí'}
				</span>

				{course.status === 'published' ? (
					<span className="text-[9px] font-bold text-emerald-800 bg-[var(--color-mint)] border border-emerald-600/10 px-2 py-0.5 rounded-md uppercase tracking-wider">
						Đã xuất bản
					</span>
				) : (
					<span className="text-[9px] font-bold text-amber-800 bg-[var(--color-paper-3)] border border-[var(--color-rule)] px-2 py-0.5 rounded-md uppercase tracking-wider">
						Nháp
					</span>
				)}

				{/* Options Actions Dropdown */}
				<Modal>
					<div className="relative" ref={menuRef}>
						<button
							type="button"
							onClick={() => setOpenMenu(prev => !prev)}
							className="btn-push btn-push-soft !p-1.5 !w-8 !h-8 text-[var(--color-muted)] flex items-center justify-center rounded-lg"
						>
							<HiOutlineEllipsisVertical className="h-4.5 w-4.5" />
						</button>

						{openMenu && (
							<div className="absolute right-0 mt-2.5 w-44 rounded-xl border border-[var(--color-rule)] bg-white shadow-lg z-30 overflow-hidden py-1">
								<Modal.Open openWindowName="edit-course">
									<button
										type="button"
										onClick={() => setOpenMenu(false)}
										className="w-full px-4 py-2 text-left text-xs font-bold text-[var(--color-ink)] hover:bg-[var(--color-paper-2)] transition flex items-center gap-2.5 uppercase tracking-wider cursor-pointer font-mono"
									>
										<HiOutlinePencilSquare className="h-4 w-4 text-[var(--color-muted)]" />
										<span>Sửa thông tin</span>
									</button>
								</Modal.Open>

								<button
									type="button"
									onClick={() => {
										setOpenMenu(false);
										router.push(`/admin/course/${course._id}/syllabus_management`);
									}}
									className="w-full px-4 py-2 text-left text-xs font-bold text-[var(--color-ink)] hover:bg-[var(--color-paper-2)] transition flex items-center gap-2.5 uppercase tracking-wider cursor-pointer font-mono"
								>
									<HiOutlineBookOpen className="h-4 w-4 text-[var(--color-muted)]" />
									<span>Quản lý giáo trình</span>
								</button>

								<button
									type="button"
									onClick={handleDeleteCourse}
									className="w-full px-4 py-2 text-left text-xs font-bold text-rose-600 hover:bg-rose-50 transition border-t border-[var(--color-rule)] flex items-center gap-2.5 uppercase tracking-wider cursor-pointer font-mono"
								>
									<HiOutlineTrash className="h-4 w-4 text-rose-500" />
									<span>Xóa khóa học</span>
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
