'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import * as XLSX from 'xlsx';
import { createUserAction } from '../userActions';

type ParsedUser = {
	fullName: string;
	email: string;
	role: string;
};

type Props = {
	onClose: () => void;
};

export default function AddUserForm({ onClose }: Props) {
	const router = useRouter();
	const [activeTab, setActiveTab] = useState<'form' | 'file'>('form');

	const [fullName, setFullName] = useState('');
	const [email, setEmail] = useState('');
	const [role, setRole] = useState('user');

	const [parsedUsers, setParsedUsers] = useState<ParsedUser[]>([]);
	const [fileError, setFileError] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitProgress, setSubmitProgress] = useState({ current: 0, total: 0 });
	const [statusMessage, setStatusMessage] = useState('');
	const [statusType, setStatusType] = useState<'success' | 'error' | ''>('');

	function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.[0];
		if (!file) return;

		setFileError('');
		setParsedUsers([]);

		const reader = new FileReader();
		reader.onload = event => {
			try {
				const bstr = event.target?.result;
				const workbook = XLSX.read(bstr, { type: 'binary' });
				const sheetName = workbook.SheetNames[0];
				const worksheet = workbook.Sheets[sheetName];
				const json = XLSX.utils.sheet_to_json<any>(worksheet);

				const validated: ParsedUser[] = [];
				for (let i = 0; i < json.length; i++) {
					const row = json[i];
					const nameVal = row.fullName || row.name || row['Họ và tên'] || row['Họ tên'];
					const emailVal = row.email || row.Email || row['Thư điện tử'];
					const roleVal = row.role || row.Role || row['Vai trò'] || 'user';

					if (!nameVal || !emailVal) {
						continue;
					}
					validated.push({
						fullName: String(nameVal).trim(),
						email: String(emailVal).trim().toLowerCase(),
						role: String(roleVal).trim().toLowerCase() === 'admin' ? 'admin' : 'user',
					});
				}

				if (validated.length === 0) {
					setFileError(
						'Không tìm thấy dữ liệu hợp lệ trong file. Vui lòng kiểm tra lại cột Họ tên và Email.',
					);
				} else {
					setParsedUsers(validated);
				}
			} catch (err) {
				setFileError(
					'Lỗi khi phân tích file. Vui lòng tải file đúng định dạng Excel (.xlsx, .xls) hoặc CSV.',
				);
			}
		};
		reader.readAsBinaryString(file);
	}

	async function handleFormSubmit(e: React.FormEvent) {
		e.preventDefault();
		if (isSubmitting) return;

		setIsSubmitting(true);
		setStatusMessage('');
		setStatusType('');

		try {
			const res = await createUserAction({
				fullName,
				email,
				role,
			});

			if (res.status === 200) {
				setStatusType('success');
				setStatusMessage('Đã tạo người dùng và gửi email mời kích hoạt!');
				router.refresh();
				setTimeout(() => {
					onClose();
				}, 1500);
			} else {
				setStatusType('error');
				setStatusMessage(res.message || 'Tạo người dùng thất bại.');
				setIsSubmitting(false);
			}
		} catch (err: any) {
			setStatusType('error');
			setStatusMessage(err.message || 'Đã có lỗi xảy ra.');
			setIsSubmitting(false);
		}
	}

	async function handleFileSubmit() {
		if (parsedUsers.length === 0 || isSubmitting) return;

		setIsSubmitting(true);
		setStatusMessage('');
		setStatusType('');
		setSubmitProgress({ current: 0, total: parsedUsers.length });

		let successCount = 0;
		let failCount = 0;

		for (let i = 0; i < parsedUsers.length; i++) {
			setSubmitProgress(prev => ({ ...prev, current: i + 1 }));
			try {
				const res = await createUserAction({
					fullName: parsedUsers[i].fullName,
					email: parsedUsers[i].email,
					role: parsedUsers[i].role,
				});

				if (res.status === 200) {
					successCount++;
				} else {
					failCount++;
				}
			} catch (err) {
				failCount++;
			}
		}

		setIsSubmitting(false);
		if (successCount > 0) {
			setStatusType('success');
			setStatusMessage(
				`Đã gửi lời mời thành công cho ${successCount} người dùng. Thất bại: ${failCount}`,
			);
			router.refresh();
			setTimeout(() => {
				onClose();
			}, 2500);
		} else {
			setStatusType('error');
			setStatusMessage('Gửi lời mời thất bại. Tất cả email có thể đã tồn tại.');
		}
	}

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
			<div className="w-full max-w-2xl rounded-2xl border border-slate-200/60 bg-white shadow-2xl overflow-hidden relative animate-in fade-in zoom-in-95 duration-150 text-slate-800">
				<div className="border-b border-slate-100 bg-slate-50/20 px-6 py-5 flex items-center justify-between">
					<div>
						<h2 className="text-lg font-bold text-slate-900">Thêm người dùng</h2>
						<p className="mt-1 text-xs text-slate-500">
							Mời thành viên tham gia hệ thống bằng Form nhập hoặc file Excel.
						</p>
					</div>
					<button
						onClick={onClose}
						className="h-8 w-8 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-600 transition cursor-pointer">
						✕
					</button>
				</div>

				<div className="flex border-b border-slate-100">
					<button
						type="button"
						onClick={() => {
							if (!isSubmitting) setActiveTab('form');
						}}
						className={`flex-1 py-3 text-center text-xs font-semibold transition-all cursor-pointer ${
							activeTab === 'form'
								? 'border-b-2 border-blue-600 text-blue-600'
								: 'text-slate-500 hover:text-slate-800'
						}`}>
						Nhập Form thủ công
					</button>
					<button
						type="button"
						onClick={() => {
							if (!isSubmitting) setActiveTab('file');
						}}
						className={`flex-1 py-3 text-center text-xs font-semibold transition-all cursor-pointer ${
							activeTab === 'file'
								? 'border-b-2 border-blue-600 text-blue-600'
								: 'text-slate-500 hover:text-slate-800'
						}`}>
						Tải lên File Excel / CSV
					</button>
				</div>

				{activeTab === 'form' ? (
					<form onSubmit={handleFormSubmit} className="space-y-5 p-6">
						<div className="grid gap-4 md:grid-cols-2">
							<div className="md:col-span-2">
								<label className="mb-1.5 block text-xs font-semibold text-slate-700 uppercase tracking-wider">
									Họ và tên
								</label>
								<input
									type="text"
									value={fullName}
									onChange={e => setFullName(e.target.value)}
									placeholder="Nguyễn Văn A"
									className="w-full rounded-lg border border-slate-200 px-3.5 py-2 text-xs text-slate-800 outline-none transition focus:border-slate-400 focus:ring-1 focus:ring-slate-100"
									required
									disabled={isSubmitting}
								/>
							</div>

							<div>
								<label className="mb-1.5 block text-xs font-semibold text-slate-700 uppercase tracking-wider">
									Email
								</label>
								<input
									type="email"
									value={email}
									onChange={e => setEmail(e.target.value)}
									placeholder="example@email.com"
									className="w-full rounded-lg border border-slate-200 px-3.5 py-2 text-xs text-slate-800 outline-none transition focus:border-slate-400 focus:ring-1 focus:ring-slate-100"
									required
									disabled={isSubmitting}
								/>
							</div>

							<div>
								<label className="mb-1.5 block text-xs font-semibold text-slate-700 uppercase tracking-wider">
									Vai trò
								</label>
								<select
									value={role}
									onChange={e => setRole(e.target.value)}
									className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs text-slate-800 outline-none transition focus:border-slate-400 cursor-pointer"
									disabled={isSubmitting}>
									<option value="user">User</option>
									<option value="admin">Admin</option>
								</select>
							</div>
						</div>

						{statusMessage && (
							<p
								className={`text-center text-xs font-semibold ${statusType === 'success' ? 'text-green-600' : 'text-red-500'}`}>
								{statusMessage}
							</p>
						)}

						<div className="flex justify-end gap-3 border-t border-slate-100 pt-5 mt-4">
							<button
								type="button"
								onClick={onClose}
								className="rounded-lg border border-slate-200 px-4.5 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-50 transition active:scale-95 cursor-pointer"
								disabled={isSubmitting}>
								Hủy
							</button>

							<button
								type="submit"
								className="rounded-lg bg-blue-600 px-4.5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-blue-700 transition active:scale-95 cursor-pointer disabled:opacity-50"
								disabled={isSubmitting}>
								{isSubmitting ? 'Đang xử lý...' : 'Tạo người dùng'}
							</button>
						</div>
					</form>
				) : (
					<div className="p-6 space-y-5">
						<div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center bg-slate-50/50 hover:bg-slate-50 transition">
							<input
								type="file"
								accept=".xlsx, .xls, .csv"
								onChange={handleFileChange}
								className="hidden"
								id="file-upload"
								disabled={isSubmitting}
							/>
							<label
								htmlFor="file-upload"
								className="cursor-pointer flex flex-col items-center justify-center">
								<svg
									className="h-8 w-8 text-slate-400 mb-2"
									fill="none"
									stroke="currentColor"
									strokeWidth="1.5"
									viewBox="0 0 24 24">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
									/>
								</svg>
								<span className="text-xs font-semibold text-slate-700">
									Nhấp để tải lên tệp tin
								</span>
								<span className="text-[10px] text-slate-400 mt-1">
									Hỗ trợ định dạng .xlsx, .xls, .csv
								</span>
							</label>
						</div>

						{fileError && (
							<p className="text-center text-xs font-medium text-red-500">{fileError}</p>
						)}

						{parsedUsers.length > 0 && (
							<div className="space-y-3">
								<h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
									Danh sách xem trước ({parsedUsers.length} người dùng)
								</h3>
								<div className="max-h-56 overflow-y-auto border border-slate-100 rounded-lg divide-y divide-slate-100">
									{parsedUsers.map((u, i) => (
										<div
											key={i}
											className="flex justify-between items-center px-3.5 py-2.5 text-xs">
											<div>
												<p className="font-semibold text-slate-800">{u.fullName}</p>
												<p className="text-[10px] text-slate-400 mt-0.5">{u.email}</p>
											</div>
											<span className="inline-flex items-center rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-bold text-slate-600 uppercase">
												{u.role}
											</span>
										</div>
									))}
								</div>
							</div>
						)}

						{isSubmitting && submitProgress.total > 0 && (
							<div className="space-y-1.5">
								<div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase tracking-wider">
									<span>Đang xử lý gửi thư mời...</span>
									<span>
										{submitProgress.current} / {submitProgress.total}
									</span>
								</div>
								<div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
									<div
										className="h-full bg-blue-600 transition-all duration-200"
										style={{
											width: `${(submitProgress.current / submitProgress.total) * 100}%`,
										}}></div>
								</div>
							</div>
						)}

						{statusMessage && (
							<p
								className={`text-center text-xs font-semibold ${statusType === 'success' ? 'text-green-600' : 'text-red-500'}`}>
								{statusMessage}
							</p>
						)}

						<div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
							<button
								type="button"
								onClick={onClose}
								className="rounded-lg border border-slate-200 px-4.5 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-50 transition active:scale-95 cursor-pointer"
								disabled={isSubmitting}>
								Hủy
							</button>

							<button
								type="button"
								onClick={handleFileSubmit}
								className="rounded-lg bg-blue-600 px-4.5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-blue-700 transition active:scale-95 cursor-pointer disabled:opacity-50"
								disabled={parsedUsers.length === 0 || isSubmitting}>
								{isSubmitting ? 'Đang gửi mời...' : 'Gửi toàn bộ lời mời'}
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
