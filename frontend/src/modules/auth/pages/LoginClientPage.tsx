'use client';

import { useState } from 'react';
import Link from 'next/link';
import { login } from '../../../../app/auth/login/action';

export default function LoginClientPage() {
	const [isVisiblePassword, setIsVisiblePassword] = useState(false);
	const [message] = useState('');
	const [form, setForm] = useState({ email: '', password: '' });

	function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
		const { name, value } = event.target;
		setForm({
			...form,
			[name]: value,
		});
	}

	const inputClassName =
		'w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 shadow-sm';

	return (
		<div className="min-h-screen w-full bg-linear-to-tr from-slate-50 via-blue-50/20 to-slate-100 px-6 py-6 md:py-0 md:h-screen md:overflow-hidden flex items-center justify-center text-slate-800">
			<div className="w-full max-w-5xl mx-auto flex items-center justify-center">
				<div className="grid w-full overflow-hidden rounded-4xl border border-slate-200/60 bg-white/70 shadow-[0_20px_50px_rgba(0,0,0,0.05)] backdrop-blur-md md:grid-cols-2">
					<div className="flex flex-col justify-center p-8 md:p-12 lg:p-16">
						<p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-blue-600">
							Course App
						</p>
						<h1 className="text-4xl font-light tracking-tight md:text-5xl lg:text-6xl text-slate-900">
							Đăng nhập
						</h1>
						<p className="mt-6 max-w-sm text-sm md:text-base leading-relaxed text-slate-500">
							Đăng nhập để truy cập các khóa học, quản lý tài khoản và tiếp tục hành trình học tập cùng Course App.
						</p>
					</div>

					<div className="m-4 md:m-6 rounded-[28px] border border-slate-100 bg-slate-50/50 p-8 lg:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.02)] backdrop-blur-sm flex flex-col justify-center">
						<div className="mb-6">
							<p className="text-xs font-bold text-blue-600 uppercase tracking-wider">
								Chào mừng trở lại
							</p>
							<h2 className="mt-1 text-2xl font-semibold text-slate-900">
								Đăng nhập vào tài khoản
							</h2>
							<p className="mt-2 text-xs text-slate-400">
								Nhập địa chỉ email và mật khẩu để tiếp tục.
							</p>
						</div>

						<form action={login} className="space-y-4">
							<div>
								<input
									name="email"
									type="email"
									value={form.email}
									onChange={handleChange}
									placeholder="Địa chỉ Email"
									className={inputClassName}
									required
								/>
							</div>

							<div className="relative">
								<input
									name="password"
									type={isVisiblePassword ? 'text' : 'password'}
									value={form.password}
									onChange={handleChange}
									placeholder="Mật khẩu"
									className={inputClassName}
									required
								/>
								<button
									type="button"
									onClick={() => setIsVisiblePassword(!isVisiblePassword)}
									className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400 hover:text-blue-600 transition">
									{isVisiblePassword ? 'Ẩn' : 'Hiện'}
								</button>
							</div>

							{message && <p className="text-center text-sm text-red-500">{message}</p>}

							<button
								type="submit"
								className="mt-2 w-full rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 shadow-md shadow-blue-500/10 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-200 active:scale-[0.98]">
								Đăng nhập
							</button>

							<p className="mt-4 text-center text-xs text-slate-400">
								Chưa có tài khoản?{' '}
								<Link
									href="/auth/register"
									className="text-blue-600 hover:text-blue-700 font-semibold hover:underline">
									Đăng ký ngay
								</Link>
							</p>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
