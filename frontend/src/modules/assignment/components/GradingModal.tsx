'use client';

import { useState } from 'react';
import type { Submission } from '../types';
import { HiXMark } from 'react-icons/hi2';

type Props = {
	submission: Submission;
	onClose: () => void;
	onSave: (id: string, score: number, feedback: string, status: 'active' | 'inactive') => void;
};

export default function GradingModal({ submission, onClose, onSave }: Props) {
	const [score, setScore] = useState(submission.score ? String(submission.score) : '');
	const [feedback, setFeedback] = useState(submission.feedback || '');
	const [error, setError] = useState('');

	const [isSubmitting, setIsSubmitting] = useState(false);

	function handleAction(status: 'active' | 'inactive') {
		setError('');
		const numericScore = Number(score);

		if (isNaN(numericScore) || score.trim() === '') {
			setError('Vui lòng nhập điểm số hợp lệ.');
			return;
		}

		if (numericScore < 0 || numericScore > 10) {
			setError('Điểm số phải nằm trong khoảng từ 0 đến 10.');
			return;
		}

		if (status === 'inactive' && !feedback.trim()) {
			setError('Vui lòng nhập nhận xét/lý do khi trả lại bài.');
			return;
		}

		setIsSubmitting(true);
		try {
			onSave(submission._id, numericScore, feedback, status);
			onClose();
		} catch (err) {
			setError('Lỗi khi chấm bài.');
		} finally {
			setIsSubmitting(false);
		}
	}

	const labelClassName = 'block text-[10px] font-black uppercase tracking-wider text-[var(--color-muted)] mb-1.5';
	const inputClassName =
		'w-full rounded-[var(--radius-input)] border border-[var(--color-rule)] bg-white px-3.5 py-2.5 text-xs text-[var(--color-ink)] outline-none transition placeholder:text-slate-400 focus:border-[var(--color-accent-2)] focus:ring-2 focus:ring-[var(--color-accent-2)]/20 shadow-2xs';

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-ink)]/50 backdrop-blur-md p-4">
			<div className="w-full max-w-lg rounded-[24px] bg-white p-7 shadow-2xl border border-[var(--color-rule)] relative text-[var(--color-ink)] font-sans">
				{/* Close button with explicit positioning */}
				<button
					onClick={onClose}
					style={{ right: '1.5rem', top: '1.25rem' }}
					className="absolute btn-push btn-push-soft !p-1.5 !w-8 !h-8 text-[var(--color-muted)] flex items-center justify-center"
				>
					<HiXMark className="h-5 w-5" />
				</button>

				{/* Header */}
				<div className="flex items-center justify-between border-b border-[var(--color-rule)] pb-4 mb-4">
					<div>
						<h2 className="text-base font-black tracking-tight text-[var(--color-ink)] uppercase tracking-wider text-[var(--color-accent-2)]">Chi tiết bài làm</h2>
						<p className="text-xs text-[var(--color-muted)] mt-1 font-bold">
							Học viên: <span className="text-[var(--color-ink)] font-black">{submission.student.fullName}</span>
						</p>
					</div>
				</div>

				<div className="space-y-4 mb-5">
					<div className="grid grid-cols-2 gap-4 bg-[var(--color-paper-2)]/40 p-4 rounded-xl border border-[var(--color-rule)]">
						<div>
							<p className={labelClassName}>Khóa học</p>
							<p className="font-bold text-slate-800 text-[11px] leading-snug">{submission.course.name}</p>
						</div>
						<div>
							<p className={labelClassName}>Bài tập</p>
							<p className="font-bold text-slate-800 text-[11px] leading-snug">{submission.assignmentName}</p>
						</div>
					</div>

					<div>
						<p className={labelClassName}>Nội dung bài nộp</p>
						<div className="bg-[var(--color-paper-2)]/25 rounded-xl border border-[var(--color-rule)] p-4 text-[var(--color-ink)] max-h-32 overflow-y-auto leading-relaxed text-xs font-medium shadow-2xs">
							[Bài làm tự luận] Kính gửi giáo viên, em đã hoàn thành bài tập Homework 4 về viết đoạn văn Sentence Building. Em gửi giáo viên xem và chấm điểm nhận xét giúp em. Em cảm ơn.
						</div>
					</div>
				</div>

				<div className="space-y-4 border-t border-[var(--color-rule)] pt-4">
					<div>
						<label className={labelClassName}>Điểm số (Thang điểm 10)</label>
						<input
							type="number"
							value={score}
							onChange={(e) => setScore(e.target.value)}
							placeholder="Ví dụ: 8.5"
							min="0"
							max="10"
							step="0.1"
							className={inputClassName}
							disabled={isSubmitting}
						/>
					</div>

					<div>
						<label className={labelClassName}>Nhận xét / Feedback</label>
						<textarea
							rows={3}
							value={feedback}
							onChange={(e) => setFeedback(e.target.value)}
							placeholder="Nhập ý kiến đánh giá học viên..."
							className={`${inputClassName} resize-none`}
							disabled={isSubmitting}
						/>
					</div>

					{error && <p className="text-center text-xs font-bold text-rose-500">{error}</p>}

					<div className="flex justify-end gap-2.5 pt-2">
						<button
							type="button"
							onClick={onClose}
							className="btn-push btn-push-soft text-xs"
							disabled={isSubmitting}
						>
							Đóng
						</button>
						<button
							type="button"
							onClick={() => handleAction('inactive')}
							className="btn-push btn-push-coral text-xs"
							disabled={isSubmitting}
						>
							Trả lại bài
						</button>
						<button
							type="button"
							onClick={() => handleAction('active')}
							className="btn-push btn-push-cyan text-xs"
							disabled={isSubmitting}
						>
							Duyệt & Chấm điểm
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
