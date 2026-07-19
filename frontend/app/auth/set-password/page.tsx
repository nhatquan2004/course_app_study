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

	if (loading) {
		return (
			<div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 text-slate-600">
				<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4 animate-duration-500 animate-infinite"></div>
				<p className="text-sm font-medium">Đang xác thực liên kết...</p>
			</div>
		);
	}

	if (!isValidToken) {
		return (
			<div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 px-6 text-center text-slate-800">
				<div className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center text-rose-500 mb-4 border border-rose-100 font-bold text-lg">
					✕
				</div>
				<h2 className="text-xl font-bold text-slate-900">Liên kết không hợp lệ</h2>
				<p className="text-sm text-slate-400 mt-2 max-w-sm">
					Đường dẫn kích hoạt này đã hết hạn hoặc không tồn tại. Vui lòng liên hệ quản trị viên để nhận mã mời mới.
				</p>
			</div>
		);
	}

	return (
		<div className="min-h-screen w-full bg-linear-to-tr from-slate-50 via-blue-50/20 to-slate-100 px-6 py-6 flex items-center justify-center text-slate-800">
			<div className="w-full max-w-md bg-white rounded-3xl border border-slate-200/60 p-8 shadow-xl">
				<div className="mb-6 text-center">
					<p className="text-xs font-bold text-blue-600 uppercase tracking-wider">Xác nhận kích hoạt</p>
					<h2 className="mt-1.5 text-2xl font-bold text-slate-900">Thiết lập mật khẩu</h2>
					<p className="mt-2 text-xs text-slate-400 leading-relaxed">
						Chào mừng <strong>{userData?.fullName}</strong> ({userData?.email})! Hãy tạo mật khẩu cho tài khoản của bạn.
					</p>
				</div>

				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="Mật khẩu mới"
							className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 shadow-sm"
							required
						/>
					</div>

					<div>
						<input
							type="password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							placeholder="Xác nhận mật khẩu mới"
							className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 shadow-sm"
							required
						/>
					</div>

					{message && (
						<p className={`text-center text-xs font-semibold ${success ? 'text-green-600' : 'text-red-500'}`}>
							{message}
						</p>
					)}

					<button
						type="submit"
						disabled={success}
						className="w-full rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 shadow-md shadow-blue-500/10 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-200 active:scale-[0.98] disabled:opacity-50 cursor-pointer"
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
			<div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 text-slate-600">
				<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4 animate-duration-500 animate-infinite"></div>
				<p className="text-sm font-medium">Đang tải...</p>
			</div>
		}>
			<SetPasswordForm />
		</Suspense>
	);
}
