'use client';

import { useState } from 'react';

type Lesson = {
	_id: string;
	lessonName: string;
	duration: number;
	isPreviewable: boolean;
	chapterId: string;
	courseId: string;
};

type LessonItemProps = {
	lesson: Lesson;
	lessonIdx: number;
	onDelete: (lessonId: string) => void;
	onEdit: (lessonId: string, name: string, isPreviewable: boolean) => void;
};

export default function LessonItem({ lesson, lessonIdx, onDelete, onEdit }: LessonItemProps) {
	const [isEditing, setIsEditing] = useState(false);
	const [editName, setEditName] = useState(lesson.lessonName);
	const [editPreviewable, setEditPreviewable] = useState(lesson.isPreviewable);

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		if (!editName.trim()) return;
		onEdit(lesson._id, editName.trim(), editPreviewable);
		setIsEditing(false);
	}

	return (
		<div className="p-4 bg-white border border-[var(--color-rule)] rounded-xl hover:border-slate-300 transition-colors shadow-2xs">
			{isEditing ? (
				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="flex items-center gap-2">
						<input
							type="text"
							value={editName}
							onChange={e => setEditName(e.target.value)}
							className="flex-1 rounded-[var(--radius-input)] border border-[var(--color-rule)] px-3 py-2.5 text-xs text-[var(--color-ink)] outline-none focus:border-[var(--color-accent-2)]"
							required
							autoFocus
						/>
					</div>
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<input
								type="checkbox"
								id={`edit-preview-${lesson._id}`}
								checked={editPreviewable}
								onChange={e => setEditPreviewable(e.target.checked)}
								className="h-4 w-4 rounded-sm border-[var(--color-rule)] text-[var(--color-accent-2)] focus:ring-[var(--color-accent-2)] cursor-pointer"
							/>
							<label htmlFor={`edit-preview-${lesson._id}`} className="text-xs text-[var(--color-muted)] font-bold select-none cursor-pointer">
								Cho phép xem trước (Học thử)
							</label>
						</div>
						<div className="flex gap-2">
							<button
								type="submit"
								className="btn-push btn-push-cyan !py-1.5 !px-3 text-xs"
							>
								OK
							</button>
							<button
								type="button"
								onClick={() => {
									setEditName(lesson.lessonName);
									setEditPreviewable(lesson.isPreviewable);
									setIsEditing(false);
								}}
								className="btn-push btn-push-soft !py-1.5 !px-3 text-xs"
							>
								Hủy
							</button>
						</div>
					</div>
				</form>
			) : (
				<div className="flex items-center justify-between text-xs">
					<div className="flex items-center gap-2.5 text-[var(--color-ink)] font-medium">
						<span className="text-[var(--color-accent-2)] font-black">✔</span>
						<span className="text-xs">Bài giảng {lessonIdx + 1}: 📄 {lesson.lessonName}</span>
						{lesson._id.startsWith('temp_') && (
							<span className="px-1.5 py-0.5 bg-rose-50 text-rose-500 border border-rose-100 text-[8px] font-black uppercase tracking-wider rounded-md">mới</span>
						)}
						{lesson.isPreviewable && (
							<span className="px-2 py-0.5 bg-[var(--color-accent-2)]/10 text-[var(--color-accent-2)] border border-[var(--color-accent-2)]/20 text-[9px] font-black uppercase tracking-wider rounded-md">
								Học thử
							</span>
						)}
					</div>
					<div className="flex items-center gap-3">
						<button
							type="button"
							onClick={() => {
								setEditName(lesson.lessonName);
								setEditPreviewable(lesson.isPreviewable);
								setIsEditing(true);
							}}
							className="text-[var(--color-accent-2)] hover:text-blue-800 font-bold text-[10px] cursor-pointer uppercase tracking-wider"
						>
							Sửa
						</button>
						<button
							type="button"
							onClick={() => onDelete(lesson._id)}
							className="text-[var(--color-muted)] hover:text-rose-500 font-bold text-[10px] transition cursor-pointer uppercase tracking-wider"
						>
							Xóa
						</button>
						<span className="text-slate-300">▼</span>
					</div>
				</div>
			)}
		</div>
	);
}
