'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { API_BASE_URL } from '@/config/api';
import axios from 'axios';

function SetPasswordForm() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const token = searchParams.get('token');

	const [isValidToken, setIsValidToken] = useState<boolean | null>(null);
	const [userData, setUserData] = useState<{ email: string; fullName: string } | null>(null);
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [message, setMessage] = useState('');
	const [success, setSuccess] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (!token) {
			setIsValidToken(false);
			setLoading(false);
			return;
		}

		axios
			.get(`${API_BASE_URL}/auth/verify-invite?token=${token}`)
			.then((res) => {
				setIsValidToken(true);
				setUserData({ email: res.data.email, fullName: res.data.fullName });
			})
			.catch(() => {
				setIsValidToken(false);
			})
			.finally(() => {
				setLoading(false);
			});
	}, [token]);

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		if (password !== confirmPassword) {
			setMessage('Mật khẩu xác nhận không khớp.');
			return;
		}
		if (password.length < 6) {
			setMessage('Mật khẩu phải chứa ít nhất 6 ký tự.');
			return;
		}

		try {
			await axios.post(`${API_BASE_URL}/auth/set-password`, { token, password });
			setSuccess(true);
			setMessage('Thiết lập mật khẩu thành công! Đang chuyển hướng...');
			setTimeout(() => {
				router.push('/auth/login');
			}, 3000);
		} catch (err: any) {
			setMessage(err.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại.');
		}
	}

	const inputClassName =
		'w-full rounded-[var(--radius-input)] border border-[var(--color-rule)] bg-white px-4 py-3.5 text-xs text-[var(--color-ink)] outline-none transition placeholder:text-slate-400 focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/15 shadow-3xs';

	if (loading) {
		return (
			<div className="flex flex-col items-center justify-center min-h-screen bg-[var(--color-paper)] text-[var(--color-muted)] font-sans">
				<div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[var(--color-accent)] mb-4"></div>
				<p className="text-[10px] font-bold font-mono uppercase tracking-wider">Đang xác thực liên kết...</p>
			</div>
		);
	}

	if (!isValidToken) {
		return (
			<div className="flex flex-col items-center justify-center min-h-screen bg-[var(--color-paper)] px-6 text-center text-[var(--color-ink)] font-sans">
				<div className="w-12 h-12 rounded-xl bg-rose-50 flex items-center justify-center text-[var(--color-accent-3)] mb-4 border border-rose-100 font-bold text-sm">
					✕
				</div>
				<h2 className="text-base font-extrabold uppercase tracking-widest text-[var(--color-ink)]">Liên kết không hợp lệ</h2>
				<p className="text-xs text-[var(--color-muted)] mt-2 max-w-xs font-medium leading-relaxed">
					Đường dẫn kích hoạt này đã hết hạn hoặc không tồn tại. Vui lòng liên hệ quản trị viên để nhận mã mời mới.
				</p>
			</div>
		);
	}

	return (
		<div className="min-h-screen w-full bg-[var(--color-paper)] px-6 py-6 flex items-center justify-center text-[var(--color-ink)] font-sans">
			<div className="w-full max-w-md bg-white rounded-[20px] border border-[var(--color-rule)] p-8 shadow-md">
				<div className="mb-6 text-center">
					<p className="text-[9px] font-bold font-mono text-[var(--color-accent)] uppercase tracking-widest">INVITE / VERIFY</p>
					<h2 className="mt-1 text-lg font-extrabold text-[var(--color-ink)] tracking-tight">Thiết lập mật khẩu</h2>
					<p className="mt-2 text-xs text-[var(--color-muted)] leading-relaxed font-medium">
						Chào mừng <strong className="text-[var(--color-ink)]">{userData?.fullName}</strong> ({userData?.email})! Hãy tạo mật khẩu cho tài khoản của bạn.
					</p>
				</div>

				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="Mật khẩu mới"
							className={inputClassName}
							required
						/>
					</div>

					<div>
						<input
							type="password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							placeholder="Xác nhận mật khẩu mới"
							className={inputClassName}
							required
						/>
					</div>

					{message && (
						<p className={`text-center text-xs font-bold ${success ? 'text-green-600' : 'text-[var(--color-accent-3)]'}`}>
							{message}
						</p>
					)}

					<button
						type="submit"
						disabled={success}
						className="btn-push btn-push-cyan w-full text-xs py-3.5 mt-2 font-bold"
					>
						Kích hoạt tài khoản
					</button>
				</form>
			</div>
		</div>
	);
}

export default function SetPasswordPage() {
	return (
		<Suspense fallback={
			<div className="flex flex-col items-center justify-center min-h-screen bg-[var(--color-paper)] text-[var(--color-muted)] font-sans">
				<div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[var(--color-accent)] mb-4"></div>
				<p className="text-[10px] font-bold font-mono uppercase tracking-wider">Đang tải...</p>
			</div>
		}>
			<SetPasswordForm />
		</Suspense>
	);
}
