'use client';

import { useState } from 'react';
import type { Submission } from '../types';

type Props = {
	submission: Submission;
	onClose: () => void;
	onSave: (id: string, score: number, feedback: string, status: 'active' | 'inactive') => void;
};

export default function GradingModal({ submission, onClose, onSave }: Props) {
	const [score, setScore] = useState(submission.score ? String(submission.score) : '');
	const [feedback, setFeedback] = useState(submission.feedback || '');
	const [error, setError] = useState('');

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

		onSave(submission._id, numericScore, feedback, status);
		onClose();
	}

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs">
			<div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-150">
				<div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
					<div>
						<h2 className="text-lg font-bold text-slate-900">Chi tiết bài làm</h2>
						<p className="text-xs text-slate-400 mt-0.5">
							Học viên: {submission.student.fullName}
						</p>
					</div>
					<button
						onClick={onClose}
						className="text-slate-400 hover:text-slate-600 p-1.5 hover:bg-slate-50 rounded-lg transition"
					>
						✕
					</button>
				</div>

				<div className="space-y-3.5 mb-5 text-sm">
					<div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
						<div>
							<p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Khóa học</p>
							<p className="font-semibold text-slate-800 mt-0.5">{submission.course.name}</p>
						</div>
						<div>
							<p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Bài tập</p>
							<p className="font-semibold text-slate-800 mt-0.5">{submission.assignmentName}</p>
						</div>
					</div>

					<div>
						<p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Nội dung bài nộp</p>
						<div className="bg-white rounded-lg border border-slate-200 p-3 text-slate-700 max-h-32 overflow-y-auto leading-relaxed text-xs">
							[Bài làm tự luận] Kính gửi giáo viên, em đã hoàn thành bài tập Homework 4 về viết đoạn văn Sentence Building. Em gửi giáo viên xem và chấm điểm nhận xét giúp em. Em cảm ơn.
						</div>
					</div>
				</div>

				<div className="space-y-4 border-t border-slate-100 pt-4">
					<div>
						<label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
							Điểm số (Thang điểm 10)
						</label>
						<input
							type="number"
							value={score}
							onChange={(e) => setScore(e.target.value)}
							placeholder="Ví dụ: 8.5"
							min="0"
							max="10"
							step="0.1"
							className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm text-slate-800 outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-100 transition shadow-xs"
						/>
					</div>

					<div>
						<label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
							Nhận xét / Feedback
						</label>
						<textarea
							rows={3}
							value={feedback}
							onChange={(e) => setFeedback(e.target.value)}
							placeholder="Nhập nhận xét chi tiết, chỉ ra các lỗi sai..."
							className="w-full rounded-lg border border-slate-200 px-3.5 py-2 text-sm text-slate-800 outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-100 transition shadow-xs resize-none"
						/>
					</div>

					{error && <p className="text-xs text-red-500 text-center font-medium">{error}</p>}
				</div>

				<div className="mt-6 flex justify-end gap-2 border-t border-slate-100 pt-4">
					<button
						type="button"
						onClick={onClose}
						className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition active:scale-95"
					>
						Đóng
					</button>

					<button
						type="button"
						onClick={() => handleAction('inactive')}
						className="rounded-lg border border-red-200 bg-red-50/50 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 transition active:scale-95"
					>
						Trả lại bài
					</button>

					<button
						type="button"
						onClick={() => handleAction('active')}
						className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition shadow-sm shadow-blue-500/10 active:scale-95"
					>
						Duyệt & Đạt
					</button>
				</div>
			</div>
		</div>
	);
}
