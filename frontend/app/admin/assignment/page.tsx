import DashboardLayout from '@/modules/dashboard/DashboardLayout';
import AssignmentTable from '@/modules/assignment/components/AssignmentTable';
import type { Submission } from '@/modules/assignment/types';

export const metadata = {
	title: 'Bài tập | Course App',
	description: 'Quản lý bài nộp và trạng thái chấm bài tập học viên.',
};

const mockSubmissions: Submission[] = [
	{
		_id: 'sub_1',
		student: {
			fullName: 'Thạch Thị Bích Hiền',
			email: 'tothebh7@gmail.com',
			phone: '208087944802',
		},
		course: {
			name: 'Online-IELTS-PRE-05.05.2026-17:30',
			status: 'Completed',
		},
		tutor: {
			fullName: 'Dương Thiện Thanh',
			email: 'trung.duong@dolenglish.vn',
		},
		assignmentName: 'IELTS PRE - Assignment 4: Build A Sentence/Paragraph',
		status: 'active',
		submittedAt: '2026-07-01T17:00:00Z',
		gradedAt: '2026-07-03T18:19:00Z',
		grader: {
			fullName: 'DOL Intelligence',
			email: 'dol-intelligence@dolenglish.vn',
		},
		score: 8.0,
		feedback: 'Đoạn văn viết mạch lạc, sử dụng từ vựng đa dạng.',
	},
	{
		_id: 'sub_2',
		student: {
			fullName: 'Nguyễn Thị Ngọc Yến',
			email: 'nguyenthigocyen0712@gmail.com',
			phone: '157631821898',
		},
		course: {
			name: 'TD.VVN-IELTS-PRE-04.05.2026-17:30',
			status: 'In progress',
		},
		tutor: {
			fullName: 'Dương Thiện Thanh',
			email: 'trung.duong@dolenglish.vn',
		},
		assignmentName: 'IELTS PRE - Assignment 4: Build A Sentence/Paragraph',
		status: 'active',
		submittedAt: '2026-07-02T15:00:00Z',
		gradedAt: '2026-07-03T20:17:00Z',
		grader: {
			fullName: 'DOL Intelligence',
			email: 'dol-intelligence@dolenglish.vn',
		},
		score: 7.5,
		feedback: 'Cấu trúc câu tốt, cần hạn chế lỗi chính tả nhỏ.',
	},
	{
		_id: 'sub_3',
		student: {
			fullName: 'Hoàng Võ Mỹ Ngân',
			email: 'hvmyngan7708@gmail.com',
			phone: '198173219245',
		},
		course: {
			name: 'Online-IELTS-PRE-05.05.2026-17:30',
			status: 'Completed',
		},
		tutor: {
			fullName: 'Dương Thiện Thanh',
			email: 'trung.duong@dolenglish.vn',
		},
		assignmentName: 'IELTS PRE - Assignment 4: Build A Sentence/Paragraph',
		status: 'pending',
		submittedAt: '2026-07-04T12:00:00Z',
	},
	{
		_id: 'sub_4',
		student: {
			fullName: 'Lê Nguyễn Bảo Kim',
			email: 'kiminbvn@gmail.com',
			phone: '37923447335',
		},
		course: {
			name: 'BTD3-IELTS-13.06.2026-13:30',
			status: 'In progress',
		},
		tutor: {
			fullName: 'Phùng Minh Trí',
			email: 'tri.phung@dolenglish.vn',
		},
		assignmentName: 'IELTS 7.0 - Writing Task 2 Academic',
		status: 'pending',
		submittedAt: '2026-07-05T09:30:00Z',
	},
	{
		_id: 'sub_5',
		student: {
			fullName: 'Nguyễn Nam Khánh',
			email: 'nnamkhanh1234@gmail.com',
			phone: '171920261412',
		},
		course: {
			name: '3/2-IELTS-5.0-29.06.2026-17:30',
			status: 'In progress',
		},
		tutor: {
			fullName: 'Nguyễn Bình Minh',
			email: 'minh.nb@dolenglish.vn',
		},
		assignmentName: 'IELTS 5.0 - Build a sentence',
		status: 'inactive',
		submittedAt: '2026-07-05T13:00:00Z',
		gradedAt: '2026-07-06T15:20:00Z',
		grader: {
			fullName: 'Nguyễn Bình Minh',
			email: 'minh.nb@dolenglish.vn',
		},
		score: 4.5,
		feedback: 'Viết câu chưa đúng ngữ pháp thì quá khứ đơn, vui lòng sửa lại.',
	},
	{
		_id: 'sub_6',
		student: {
			fullName: 'Võ Ngọc Phương Quỳnh',
			email: 'phuongquynh1012201@gmail.com',
			phone: '217088153657',
		},
		course: {
			name: 'Q7-IELTS-5.0-20.06.2026-13:30',
			status: 'Completed',
		},
		tutor: {
			fullName: 'Nguyễn Bình Minh',
			email: 'minh.nb@dolenglish.vn',
		},
		assignmentName: 'IELTS 5.0 - Speaking part 1',
		status: 'pending',
		submittedAt: '2026-07-07T11:15:00Z',
	},
];

export default function AssignmentPage() {
	return (
		<DashboardLayout
			title="Bài tập"
			description="Danh sách học viên nộp bài và trạng thái chấm bài">
			<AssignmentTable initialSubmissions={mockSubmissions} />
		</DashboardLayout>
	);
}
