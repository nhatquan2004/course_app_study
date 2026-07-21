'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import * as XLSX from 'xlsx';
import { createUserAction } from '../userActions';
import { toast } from 'react-toastify';
import { HiXMark } from 'react-icons/hi2';

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
				toast.success('Thành công!');
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
			toast.success('Nhập file thành công!');
			router.refresh();
			setTimeout(() => {
				onClose();
			}, 2500);
		} else {
			setStatusType('error');
			setStatusMessage('Gửi lời mời thất bại. Tất cả email có thể đã tồn tại.');
		}
	}

	const labelClassName = 'block text-[10px] font-black uppercase tracking-wider text-[var(--color-muted)] mb-1.5';
	const inputClassName =
		'w-full rounded-[var(--radius-input)] border border-[var(--color-rule)] bg-white px-3.5 py-2.5 text-xs text-[var(--color-ink)] outline-none transition placeholder:text-slate-400 focus:border-[var(--color-accent-2)] focus:ring-2 focus:ring-[var(--color-accent-2)]/20 shadow-2xs';

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-ink)]/50 backdrop-blur-md p-4">
			<div className="w-full max-w-2xl rounded-[24px] border border-[var(--color-rule)] bg-white shadow-2xl overflow-hidden relative text-[var(--color-ink)] font-sans">
				{/* Close button */}
				<button
					onClick={onClose}
					style={{ right: '1.5rem', top: '1.25rem' }}
					className="absolute btn-push btn-push-soft !p-1.5 !w-8 !h-8 text-[var(--color-muted)] flex items-center justify-center"
				>
					<HiXMark className="h-5 w-5" />
				</button>

				{/* Header */}
				<div className="border-b border-[var(--color-rule)] bg-[var(--color-paper-2)]/40 px-8 py-5.5">
					<h2 className="text-base font-black tracking-tight text-[var(--color-ink)] uppercase tracking-wider text-[var(--color-accent-2)]">Thêm người dùng</h2>
					<p className="mt-1 text-xs text-[var(--color-muted)] font-medium">
						Mời thành viên tham gia hệ thống bằng Form nhập hoặc file Excel.
					</p>
				</div>

				{/* Tabs Navigation */}
				<div className="flex border-b border-[var(--color-rule)] bg-[var(--color-paper-2)]/30">
					<button
						type="button"
						onClick={() => {
							if (!isSubmitting) setActiveTab('form');
						}}
						className={`flex-1 py-3.5 text-center text-xs font-bold transition-all cursor-pointer ${activeTab === 'form'
								? 'border-b-2 border-[var(--color-accent-2)] text-[var(--color-accent-2)] bg-white'
								: 'text-[var(--color-muted)] hover:text-[var(--color-ink)] hover:bg-[var(--color-paper-2)]/50'
							}`}
					>
						Nhập Form thủ công
					</button>
					<button
						type="button"
						onClick={() => {
							if (!isSubmitting) setActiveTab('file');
						}}
						className={`flex-1 py-3.5 text-center text-xs font-bold transition-all cursor-pointer ${activeTab === 'file'
								? 'border-b-2 border-[var(--color-accent-2)] text-[var(--color-accent-2)] bg-white'
								: 'text-[var(--color-muted)] hover:text-[var(--color-ink)] hover:bg-[var(--color-paper-2)]/50'
							}`}
					>
						Tải lên File Excel / CSV
					</button>
				</div>

				{activeTab === 'form' ? (
					<form onSubmit={handleFormSubmit} className="space-y-5 p-8 bg-white">
						<div className="grid gap-4 md:grid-cols-2">
							<div className="md:col-span-2">
								<label className={labelClassName}>Họ và tên</label>
								<input
									type="text"
									value={fullName}
									onChange={e => setFullName(e.target.value)}
									placeholder="Ví dụ: Nguyễn Văn A"
									className={inputClassName}
									required
									disabled={isSubmitting}
								/>
							</div>

							<div>
								<label className={labelClassName}>Email</label>
								<input
									type="email"
									value={email}
									onChange={e => setEmail(e.target.value)}
									placeholder="example@email.com"
									className={inputClassName}
									required
									disabled={isSubmitting}
								/>
							</div>

							<div>
								<label className={labelClassName}>Vai trò</label>
								<select
									value={role}
									onChange={e => setRole(e.target.value)}
									className="w-full rounded-[var(--radius-input)] border border-[var(--color-rule)] bg-white px-3.5 py-2.5 text-xs text-[var(--color-ink)] outline-none transition focus:border-[var(--color-accent-2)] cursor-pointer shadow-2xs"
									disabled={isSubmitting}
								>
									<option value="user">User</option>
									<option value="admin">Admin</option>
								</select>
							</div>
						</div>

						{statusMessage && (
							<p
								className={`text-center text-xs font-bold ${statusType === 'success' ? 'text-emerald-600' : 'text-rose-500'}`}
							>
								{statusMessage}
							</p>
						)}

						<div className="flex justify-end gap-3.5 border-t border-[var(--color-rule)] pt-5 mt-4">
							<button
								type="button"
								onClick={onClose}
								className="btn-push btn-push-soft text-xs"
								disabled={isSubmitting}
							>
								Hủy
							</button>

							<button
								type="submit"
								className="btn-push btn-push-cyan text-xs"
								disabled={isSubmitting}
							>
								{isSubmitting ? 'Đang xử lý...' : 'Tạo người dùng'}
							</button>
						</div>
					</form>
				) : (
					<div className="p-8 space-y-5 bg-white">
						<div className="border-2 border-dashed border-[var(--color-rule)] rounded-[var(--radius-card)] p-8 text-center bg-[var(--color-paper-2)]/20 hover:bg-[var(--color-paper-2)]/40 transition">
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
								className="cursor-pointer flex flex-col items-center justify-center"
							>
								<svg
									className="h-8 w-8 text-[var(--color-accent-2)] mb-2"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
									/>
								</svg>
								<span className="text-xs font-bold text-[var(--color-ink)]">
									Nhấp để tải lên tệp tin
								</span>
								<span className="text-[10px] text-[var(--color-muted)] mt-1.5 font-bold">
									Hỗ trợ định dạng .xlsx, .xls, .csv
								</span>
							</label>
						</div>

						{fileError && (
							<p className="text-center text-xs font-bold text-rose-500">{fileError}</p>
						)}

						{parsedUsers.length > 0 && (
							<div className="space-y-3">
								<h3 className="text-[10px] font-black text-[var(--color-muted)] uppercase tracking-wider">
									Danh sách xem trước ({parsedUsers.length} người dùng)
								</h3>
								<div className="max-h-52 overflow-y-auto border border-[var(--color-rule)] rounded-xl divide-y divide-[var(--color-rule)] bg-[var(--color-paper-2)]/20 shadow-2xs">
									{parsedUsers.map((u, i) => (
										<div
											key={i}
											className="flex justify-between items-center px-4 py-3.5 text-xs"
										>
											<div>
												<p className="font-bold text-[var(--color-ink)]">{u.fullName}</p>
												<p className="text-[10px] text-[var(--color-muted)] mt-0.5 font-bold">{u.email}</p>
											</div>
											<span className="inline-flex items-center rounded-lg bg-[var(--color-accent-2)]/10 border border-[var(--color-accent-2)]/20 px-2 py-0.5 text-[9px] font-black text-[var(--color-accent-2)] uppercase tracking-wider">
												{u.role}
											</span>
										</div>
									))}
								</div>
							</div>
						)}

						{isSubmitting && submitProgress.total > 0 && (
							<div className="space-y-2">
								<div className="flex justify-between text-[10px] font-black text-[var(--color-muted)] uppercase tracking-wider">
									<span>Đang xử lý gửi thư mời...</span>
									<span>
										{submitProgress.current} / {submitProgress.total}
									</span>
								</div>
								<div className="h-2 w-full bg-[var(--color-paper-2)] border border-[var(--color-rule)] rounded-full overflow-hidden">
									<div
										className="h-full bg-[var(--color-accent-2)] transition-all duration-200"
										style={{
											width: `${(submitProgress.current / submitProgress.total) * 100}%`,
										}}
									></div>
								</div>
							</div>
						)}

						{statusMessage && (
							<p
								className={`text-center text-xs font-bold ${statusType === 'success' ? 'text-emerald-600' : 'text-rose-500'}`}
							>
								{statusMessage}
							</p>
						)}

						<div className="flex justify-end gap-3.5 border-t border-[var(--color-rule)] pt-5">
							<button
								type="button"
								onClick={onClose}
								className="btn-push btn-push-soft text-xs"
								disabled={isSubmitting}
							>
								Hủy
							</button>

							<button
								type="button"
								onClick={handleFileSubmit}
								className="btn-push btn-push-cyan text-xs"
								disabled={parsedUsers.length === 0 || isSubmitting}
							>
								{isSubmitting ? 'Đang gửi mời...' : 'Gửi toàn bộ lời mời'}
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
