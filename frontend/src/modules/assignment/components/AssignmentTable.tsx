'use client';

import { useState } from 'react';
import type { Submission } from '../types';
import GradingModal from './GradingModal';
import SearchBar from '@/common/components/SearchBar';

type Props = {
	initialSubmissions: Submission[];
};

export default function AssignmentTable({ initialSubmissions }: Props) {
	const [submissions, setSubmissions] = useState<Submission[]>(initialSubmissions);
	const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);

	const [searchQuery, setSearchQuery] = useState('');
	const [programFilter, setProgramFilter] = useState('All');
	const [teacherFilter, setTeacherFilter] = useState('All');
	const [courseFilter, setCourseFilter] = useState('All');
	const [typeFilter, setTypeFilter] = useState('All');
	const [dateFilter, setDateFilter] = useState('All');
	const [statusFilter, setStatusFilter] = useState('All');

	const courses = Array.from(new Set(submissions.map((s) => s.course.name)));
	const teachers = Array.from(new Set(submissions.map((s) => s.tutor.fullName)));

	function formatTurnaroundTime(startStr: string, endStr?: string) {
		if (!endStr) return null;
		const start = new Date(startStr);
		const end = new Date(endStr);
		const diffMs = end.getTime() - start.getTime();
		if (diffMs <= 0) return '0m';

		const diffMins = Math.floor(diffMs / (1000 * 60));
		const mins = diffMins % 60;
		const diffHours = Math.floor(diffMins / 60);
		const hours = diffHours % 24;
		const days = Math.floor(diffHours / 24);

		const parts = [];
		if (days > 0) parts.push(`${days}d`);
		if (hours > 0) parts.push(`${hours}h`);
		if (days === 0 && hours === 0 && mins > 0) parts.push(`${mins}m`);
		return parts.join(' ');
	}

	function formatDateTime(dateStr: string) {
		const date = new Date(dateStr);
		const timePart = date.toLocaleTimeString('vi-VN', {
			hour: '2-digit',
			minute: '2-digit',
			hour12: false,
		});
		const datePart = date.toLocaleDateString('vi-VN', {
			month: 'short',
			day: '2-digit',
			year: 'numeric',
		});
		return `${timePart}, ${datePart}`;
	}

	const handleGradeSave = (id: string, score: number, feedback: string, status: 'active' | 'inactive') => {
		setSubmissions((prev) =>
			prev.map((sub) =>
				sub._id === id
					? {
						...sub,
						score,
						feedback,
						status,
						gradedAt: new Date().toISOString(),
						grader: {
							fullName: 'DOL Intelligence',
							email: 'dol-intelligence@dolenglish.vn',
						},
					}
					: sub
			)
		);
	};

	const filteredSubmissions = submissions.filter((sub) => {
		const matchesSearch =
			sub.student.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
			sub.assignmentName.toLowerCase().includes(searchQuery.toLowerCase());

		const matchesProgram =
			programFilter === 'All' ||
			(programFilter === 'IELTS' && sub.course.name.toUpperCase().includes('IELTS'));

		const matchesTeacher = teacherFilter === 'All' || sub.tutor.fullName === teacherFilter;

		const matchesCourse = courseFilter === 'All' || sub.course.name === courseFilter;

		const isWriting = sub.assignmentName.toLowerCase().includes('writing') ||
			sub.assignmentName.toLowerCase().includes('sentence') ||
			sub.assignmentName.toLowerCase().includes('paragraph');
		const isSpeaking = sub.assignmentName.toLowerCase().includes('speaking');

		const matchesType =
			typeFilter === 'All' ||
			(typeFilter === 'Writing' && isWriting) ||
			(typeFilter === 'Speaking' && isSpeaking);

		let matchesDate = true;
		if (dateFilter !== 'All') {
			const submittedDate = new Date(sub.submittedAt);
			const now = new Date();
			const diffTime = Math.abs(now.getTime() - submittedDate.getTime());
			const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
			if (dateFilter === 'Today' && diffDays > 1) {
				matchesDate = false;
			} else if (dateFilter === 'Week' && diffDays > 7) {
				matchesDate = false;
			}
		}

		const matchesStatus =
			statusFilter === 'All' || sub.status === statusFilter;

		return matchesSearch && matchesProgram && matchesTeacher && matchesCourse && matchesType && matchesDate && matchesStatus;
	});

	const selectClassName =
		'rounded-[var(--radius-input)] border border-[var(--color-rule)] bg-white py-2 px-3.5 text-xs font-bold text-[var(--color-ink)] outline-none focus:border-[var(--color-accent-2)] focus:ring-2 focus:ring-[var(--color-accent-2)]/20 shadow-2xs transition cursor-pointer';

	return (
		<div className="w-full flex flex-col gap-4">
			{/* Filters toolbar */}
			<div className="flex flex-wrap gap-3 items-center">
				<SearchBar
					value={searchQuery}
					onChange={setSearchQuery}
					placeholder="Tìm học viên hoặc bài nộp..."
					className="w-full md:w-64"
				/>

				<select
					value={programFilter}
					onChange={(e) => setProgramFilter(e.target.value)}
					className={selectClassName}
				>
					<option value="All">Chương trình: Tất cả</option>
					<option value="IELTS">Chương trình: IELTS</option>
				</select>

				<select
					value={teacherFilter}
					onChange={(e) => setTeacherFilter(e.target.value)}
					className={selectClassName}
				>
					<option value="All">Giáo viên: Tất cả</option>
					{teachers.map((name) => (
						<option key={name} value={name}>
							Giáo viên: {name}
						</option>
					))}
				</select>

				<select
					value={courseFilter}
					onChange={(e) => setCourseFilter(e.target.value)}
					className={selectClassName}
				>
					<option value="All">Khóa học: Tất cả</option>
					{courses.map((name) => (
						<option key={name} value={name}>
							{name}
						</option>
					))}
				</select>

				<select
					value={typeFilter}
					onChange={(e) => setTypeFilter(e.target.value)}
					className={selectClassName}
				>
					<option value="All">Dạng bài: Tất cả</option>
					<option value="Writing">Dạng bài: Writing</option>
					<option value="Speaking">Dạng bài: Speaking</option>
				</select>

				<select
					value={dateFilter}
					onChange={(e) => setDateFilter(e.target.value)}
					className={selectClassName}
				>
					<option value="All">Ngày nộp: Tất cả</option>
					<option value="Today">Ngày nộp: Hôm nay</option>
					<option value="Week">Ngày nộp: Tuần này</option>
				</select>

				<select
					value={statusFilter}
					onChange={(e) => setStatusFilter(e.target.value)}
					className={selectClassName}
				>
					<option value="All">Trạng thái chấm: Tất cả</option>
					<option value="pending">Trạng thái: Chờ duyệt</option>
					<option value="active">Trạng thái: Đã chấm</option>
					<option value="inactive">Trạng thái: Bị trả lại</option>
				</select>
			</div>

			{/* Submissions table card */}
			<div className="tactile-card overflow-hidden bg-white border border-[var(--color-rule)]">
				<div className="w-full overflow-x-auto">
					<table className="w-full border-collapse text-left text-xs text-[var(--color-ink)] min-w-[1450px]">
						<thead className="bg-[var(--color-paper-2)]/60 border-b border-[var(--color-rule)] text-[10px] font-black uppercase tracking-wider text-[var(--color-muted)]">
							<tr>
								<th className="px-6 py-4.5 whitespace-nowrap">Học viên</th>
								<th className="px-6 py-4.5 whitespace-nowrap">Khóa học</th>
								<th className="px-6 py-4.5 whitespace-nowrap">GV được assign</th>
								<th className="px-6 py-4.5 whitespace-nowrap">Bài tập</th>
								<th className="px-6 py-4.5 text-center whitespace-nowrap">Trạng thái chấm</th>
								<th className="px-6 py-4.5 whitespace-nowrap">Thời gian xử lý</th>
								<th className="px-6 py-4.5 whitespace-nowrap">Người chấm</th>
								<th className="px-6 py-4.5 text-center whitespace-nowrap">Điểm số</th>
								<th className="px-6 py-4.5 text-right pr-8 whitespace-nowrap">Hành động</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-[var(--color-rule)]/60 bg-white">
							{filteredSubmissions.length === 0 ? (
								<tr>
									<td colSpan={9} className="px-6 py-16 text-center text-[var(--color-muted)] font-bold italic whitespace-nowrap">
										Không tìm thấy bài làm nào khớp với bộ lọc.
									</td>
								</tr>
							) : (
								filteredSubmissions.map((sub) => (
									<tr key={sub._id} className="hover:bg-[var(--color-paper-2)]/20 transition-colors">
										<td className="px-6 py-5 whitespace-nowrap">
											<div>
												<p className="font-bold text-[var(--color-ink)] text-xs leading-snug">{sub.student.fullName}</p>
												<p className="text-[10px] text-[var(--color-muted)] mt-1 font-bold">{sub.student.email}</p>
											</div>
										</td>

										<td className="px-6 py-5 whitespace-nowrap">
											<div>
												<p className="font-bold text-[var(--color-ink)] text-[11px] leading-normal">{sub.course.name}</p>
												<span className="inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[9px] font-black bg-[var(--color-paper-2)] text-[var(--color-muted)] border border-[var(--color-rule)] mt-1.5 uppercase tracking-wider">
													{sub.course.status}
												</span>
											</div>
										</td>

										<td className="px-6 py-5 whitespace-nowrap">
											<div className="flex items-center gap-2.5">
												<div className="h-8 w-8 rounded-xl bg-[var(--color-accent)] border border-[var(--color-accent-deep)] flex items-center justify-center text-[10px] font-black text-[var(--color-ink)] shrink-0 shadow-2xs">
													{sub.tutor.fullName.charAt(0).toUpperCase()}
												</div>
												<div className="min-w-0">
													<p className="font-bold text-[var(--color-ink)] text-xs truncate">{sub.tutor.fullName}</p>
													<p className="text-[10px] text-[var(--color-muted)] mt-0.5 truncate font-bold">{sub.tutor.email}</p>
												</div>
											</div>
										</td>

										<td className="px-6 py-5 whitespace-nowrap">
											<p className="font-bold text-[var(--color-ink)] text-xs leading-relaxed max-w-sm truncate">{sub.assignmentName}</p>
										</td>

										<td className="px-6 py-5 text-center whitespace-nowrap">
											{sub.status === 'pending' && (
												<span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 text-amber-800 border border-amber-500/20 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider">
													● Chờ duyệt
												</span>
											)}
											{sub.status === 'active' && (
												<span className="inline-flex items-center gap-1 rounded-full bg-[var(--color-mint)]/35 text-emerald-800 border border-emerald-600/20 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider">
													● Đã chấm
												</span>
											)}
											{sub.status === 'inactive' && (
												<span className="inline-flex items-center gap-1 rounded-full bg-[var(--color-accent-3)]/15 text-rose-800 border border-[var(--color-accent-3)]/20 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider">
													● Bị trả lại
												</span>
											)}
										</td>

										<td className="px-6 py-5 whitespace-nowrap">
											{sub.status !== 'pending' && sub.gradedAt ? (
												<div className="flex flex-col gap-0.5">
													<p className="font-black text-[var(--color-ink)] text-xs">
														{formatTurnaroundTime(sub.submittedAt, sub.gradedAt)}
													</p>
													<p className="text-[10px] text-[var(--color-muted)] font-bold">
														{formatDateTime(sub.gradedAt)}
													</p>
												</div>
											) : (
												<span className="text-slate-300 font-medium">-</span>
											)}
										</td>

										<td className="px-6 py-5 whitespace-nowrap">
											{sub.status !== 'pending' && sub.grader ? (
												<div className="flex items-center gap-2.5">
													<div className="h-8 w-8 rounded-xl bg-[var(--color-accent-2)]/10 border border-[var(--color-accent-2)]/20 flex items-center justify-center text-[10px] font-black text-[var(--color-accent-2)] shrink-0 shadow-2xs">
														{sub.grader.fullName.charAt(0).toUpperCase()}
													</div>
													<div className="min-w-0">
														<p className="font-bold text-[var(--color-ink)] text-xs truncate">{sub.grader.fullName}</p>
														<p className="text-[10px] text-[var(--color-muted)] mt-0.5 truncate font-bold">{sub.grader.email}</p>
													</div>
												</div>
											) : (
												<span className="text-slate-300 font-medium">-</span>
											)}
										</td>

										<td className="px-6 py-5 text-center whitespace-nowrap">
											{sub.score !== undefined ? (
												<span className="font-black text-[var(--color-ink)] bg-[var(--color-paper-2)] border border-[var(--color-rule)] px-2.5 py-1 rounded-lg text-xs font-mono">
													{sub.score} / 10
												</span>
											) : (
												<span className="text-slate-300">-</span>
											)}
										</td>

										<td className="px-6 py-5 text-right pr-8 whitespace-nowrap">
											<button
												type="button"
												onClick={() => setSelectedSubmission(sub)}
												className="btn-push btn-push-soft !py-1.5 !px-3.5 text-xs"
											>
												Xem bài
											</button>
										</td>
									</tr>
								))
							)}
						</tbody>
					</table>
				</div>
			</div>

			{selectedSubmission && (
				<GradingModal
					submission={selectedSubmission}
					onClose={() => setSelectedSubmission(null)}
					onSave={handleGradeSave}
				/>
			)}
		</div>
	);
}
