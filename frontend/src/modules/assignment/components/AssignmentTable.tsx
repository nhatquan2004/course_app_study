'use client';

import { useState } from 'react';
import type { Submission } from '../types';
import GradingModal from './GradingModal';

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
		const timePart = date.toLocaleTimeString('en-US', {
			hour: '2-digit',
			minute: '2-digit',
			hour12: false,
		});
		const datePart = date.toLocaleDateString('en-US', {
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

	return (
		<div className="w-full bg-white rounded-2xl border border-slate-200/60 overflow-hidden shadow-xs">
			<div className="p-6 border-b border-slate-100 bg-slate-50/20 flex flex-wrap gap-4 items-center">
				<div className="relative w-full md:w-64">
					<span className="absolute inset-y-0 left-3.5 flex items-center text-slate-400 pointer-events-none">
						<svg className="h-3.5 w-3.5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
						</svg>
					</span>
					<input
						type="text"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						placeholder="Search by student or assignment"
						className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-4 text-xs text-slate-700 outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-100 transition-all placeholder:text-slate-400"
					/>
				</div>

				<select
					value={programFilter}
					onChange={(e) => setProgramFilter(e.target.value)}
					className="rounded-lg border border-slate-200 bg-white py-2 px-3 text-xs font-semibold text-slate-600 outline-none focus:border-slate-400 transition cursor-pointer"
				>
					<option value="All">Program: All</option>
					<option value="IELTS">Program: IELTS</option>
				</select>

				<select
					value={teacherFilter}
					onChange={(e) => setTeacherFilter(e.target.value)}
					className="rounded-lg border border-slate-200 bg-white py-2 px-3 text-xs font-semibold text-slate-600 outline-none focus:border-slate-400 transition cursor-pointer"
				>
					<option value="All">Teacher: All</option>
					{teachers.map((name) => (
						<option key={name} value={name}>
							Teacher: {name}
						</option>
					))}
				</select>

				<select
					value={courseFilter}
					onChange={(e) => setCourseFilter(e.target.value)}
					className="rounded-lg border border-slate-200 bg-white py-2 px-3 text-xs font-semibold text-slate-600 outline-none focus:border-slate-400 transition cursor-pointer"
				>
					<option value="All">Course: All</option>
					{courses.map((name) => (
						<option key={name} value={name}>
							Course: {name}
						</option>
					))}
				</select>

				<select
					value={typeFilter}
					onChange={(e) => setTypeFilter(e.target.value)}
					className="rounded-lg border border-slate-200 bg-white py-2 px-3 text-xs font-semibold text-slate-600 outline-none focus:border-slate-400 transition cursor-pointer"
				>
					<option value="All">Type: All</option>
					<option value="Writing">Type: Writing</option>
					<option value="Speaking">Type: Speaking</option>
				</select>

				<select
					value={dateFilter}
					onChange={(e) => setDateFilter(e.target.value)}
					className="rounded-lg border border-slate-200 bg-white py-2 px-3 text-xs font-semibold text-slate-600 outline-none focus:border-slate-400 transition cursor-pointer"
				>
					<option value="All">Ngày TA nộp: All time</option>
					<option value="Today">Ngày TA nộp: Hôm nay</option>
					<option value="Week">Ngày TA nộp: Tuần này</option>
				</select>

				<select
					value={statusFilter}
					onChange={(e) => setStatusFilter(e.target.value)}
					className="rounded-lg border border-slate-200 bg-white py-2 px-3 text-xs font-semibold text-slate-600 outline-none focus:border-slate-400 transition cursor-pointer"
				>
					<option value="All">Trạng thái: Tất cả</option>
					<option value="pending">Trạng thái: Chờ duyệt</option>
					<option value="active">Trạng thái: Đã chấm</option>
					<option value="inactive">Trạng thái: Bị trả lại</option>
				</select>
			</div>

			<div className="w-full overflow-x-auto">
				<table className="w-full border-collapse text-left text-sm text-slate-700 min-w-[1450px]">
					<thead className="bg-slate-50/80 border-b border-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-400/90">
						<tr>
							<th className="px-6 py-4.5 whitespace-nowrap">Học viên</th>
							<th className="px-6 py-4.5 whitespace-nowrap">Khóa học</th>
							<th className="px-6 py-4.5 whitespace-nowrap">GV được assign</th>
							<th className="px-6 py-4.5 whitespace-nowrap">Bài tập</th>
							<th className="px-6 py-4.5 text-center whitespace-nowrap">Trạng thái chấm</th>
							<th className="px-6 py-4.5 whitespace-nowrap">Ngày chấm xong</th>
							<th className="px-6 py-4.5 whitespace-nowrap">Người chấm</th>
							<th className="px-6 py-4.5 text-center whitespace-nowrap">Điểm số</th>
							<th className="px-6 py-4.5 text-right pr-8 whitespace-nowrap">Hành động</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-slate-100">
						{filteredSubmissions.length === 0 ? (
							<tr>
								<td colSpan={9} className="px-6 py-16 text-center text-slate-400 font-medium whitespace-nowrap">
									Không tìm thấy bài làm nào khớp với bộ lọc.
								</td>
							</tr>
						) : (
							filteredSubmissions.map((sub) => (
								<tr key={sub._id} className="hover:bg-slate-50/20 transition-colors duration-150">
									<td className="px-6 py-5 whitespace-nowrap">
										<div>
											<p className="font-semibold text-slate-800 text-sm leading-snug">{sub.student.fullName}</p>
											<p className="text-xs text-slate-400 mt-1">{sub.student.email}</p>
										</div>
									</td>

									<td className="px-6 py-5 whitespace-nowrap">
										<div>
											<p className="font-semibold text-slate-700 text-xs leading-normal">{sub.course.name}</p>
											<span className="inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-semibold bg-slate-100 text-slate-500 mt-1.5">
												{sub.course.status}
											</span>
										</div>
									</td>

									<td className="px-6 py-5 whitespace-nowrap">
										<div className="flex items-center gap-2.5">
											<div className="h-7 w-7 rounded-full bg-blue-50/80 flex items-center justify-center text-[10px] font-bold text-blue-600 shrink-0">
												{sub.tutor.fullName.charAt(0).toUpperCase()}
											</div>
											<div className="min-w-0">
												<p className="font-medium text-slate-700 text-xs truncate">{sub.tutor.fullName}</p>
												<p className="text-[10px] text-slate-400 mt-0.5 truncate">{sub.tutor.email}</p>
											</div>
										</div>
									</td>

									<td className="px-6 py-5 whitespace-nowrap">
										<p className="font-medium text-slate-800 text-xs leading-relaxed">{sub.assignmentName}</p>
									</td>

									<td className="px-6 py-5 text-center whitespace-nowrap">
										{sub.status === 'pending' && (
											<span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700 border border-amber-100/50">
												● Chờ duyệt
											</span>
										)}
										{sub.status === 'active' && (
											<span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 border border-emerald-100/50">
												● Đã chấm
											</span>
										)}
										{sub.status === 'inactive' && (
											<span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-700 border border-rose-100/50">
												● Bị trả lại
											</span>
										)}
									</td>

									<td className="px-6 py-5 whitespace-nowrap">
										{sub.status !== 'pending' && sub.gradedAt ? (
											<div className="flex flex-col gap-0.5">
												<p className="font-bold text-slate-700 text-xs">
													{formatTurnaroundTime(sub.submittedAt, sub.gradedAt)}
												</p>
												<p className="text-[10px] text-slate-400">
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
												<div className="h-7 w-7 rounded-full bg-indigo-50/80 flex items-center justify-center text-[10px] font-bold text-indigo-600 shrink-0">
													{sub.grader.fullName.charAt(0).toUpperCase()}
												</div>
												<div className="min-w-0">
													<p className="font-semibold text-slate-700 text-xs truncate">{sub.grader.fullName}</p>
													<p className="text-[10px] text-slate-400 mt-0.5 truncate">{sub.grader.email}</p>
												</div>
											</div>
										) : (
											<span className="text-slate-300 font-medium">-</span>
										)}
									</td>

									<td className="px-6 py-5 text-center whitespace-nowrap">
										{sub.score !== undefined ? (
											<span className="font-bold text-slate-950 bg-slate-100 px-2.5 py-1 rounded-md text-xs whitespace-nowrap">
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
											className="rounded-lg border border-slate-200 bg-white hover:bg-slate-50 px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 shadow-2xs hover:border-slate-300 hover:shadow-xs transition duration-150 active:scale-95 cursor-pointer"
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

			{/* Grading Modal Overlay */}
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
