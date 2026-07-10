'use client';

import { useState } from 'react';
import Link from 'next/link';
import { registerUser } from '@/services/userService';
import { useRouter } from 'next/router';

export default function RegisterClientPage() {
	const [form, setForm] = useState({
		fullName: '',
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
	});

	const [message, setMessage] = useState('');

	function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
		const { name, value } = event.target;
		setForm({
			...form,
			[name]: value,
		});
	}

	async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setMessage('');

		if (form.password !== form.confirmPassword) {
			setMessage('Mật khẩu xác nhận không khớp');
			return;
		}

		const response = await registerUser({
			fullName: form.fullName,
			username: form.username,
			email: form.email,
			password: form.password,
		});

		if (response.status === 200) {
			setMessage(response.message);
			setForm({
				fullName: '',
				username: '',
				email: '',
				password: '',
				confirmPassword: '',
			});
		} else {
			setMessage(response.message);
		}
	}

	const inputClassName =
		'w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 shadow-sm';

	return (
		<div className="min-h-screen w-full bg-gradient-to-tr from-slate-50 via-blue-50/20 to-slate-100 px-6 py-6 md:py-0 md:h-screen md:overflow-hidden flex items-center justify-center text-slate-800">
			<div className="w-full max-w-5xl mx-auto flex items-center justify-center">
				<div className="grid w-full overflow-hidden rounded-[32px] border border-slate-200/60 bg-white/70 shadow-[0_20px_50px_rgba(0,0,0,0.05)] backdrop-blur-md md:grid-cols-2">
					{/* Left panel */}
					<div className="flex flex-col justify-center p-8 md:p-12 lg:p-16">
						<p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-blue-600">
							Course App
						</p>
						<h1 className="text-4xl font-light tracking-tight md:text-5xl lg:text-6xl text-slate-900">
							Đăng ký
						</h1>
						<p className="mt-6 max-w-sm text-sm md:text-base leading-relaxed text-slate-500">
							Đăng ký tài khoản để bắt đầu học các khóa học và khám phá những kiến thức mới cùng
							Course App.
						</p>
					</div>

					{/* Right form panel */}
					<div className="m-4 md:m-6 rounded-[28px] border border-slate-100 bg-slate-50/50 p-8 lg:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.02)] backdrop-blur-sm flex flex-col justify-center">
						<div className="mb-6">
							<p className="text-xs font-bold text-blue-600 uppercase tracking-wider">
								Chào mừng bạn
							</p>
							<h2 className="mt-1 text-2xl font-semibold text-slate-900">Tạo tài khoản mới</h2>
							<p className="mt-2 text-xs text-slate-400">Nhập đầy đủ thông tin để đăng ký.</p>
						</div>

						<form onSubmit={handleRegister} className="space-y-4">
							<input
								name="fullName"
								value={form.fullName}
								onChange={handleChange}
								placeholder="Họ và tên"
								className={inputClassName}
								required
							/>

							<input
								name="username"
								value={form.username}
								onChange={handleChange}
								placeholder="Tên đăng nhập"
								className={inputClassName}
								required
							/>

							<input
								name="email"
								type="email"
								value={form.email}
								onChange={handleChange}
								placeholder="Email"
								className={inputClassName}
								required
							/>

							<input
								name="password"
								type="password"
								value={form.password}
								onChange={handleChange}
								placeholder="Mật khẩu"
								className={inputClassName}
								required
							/>

							<input
								name="confirmPassword"
								type="password"
								value={form.confirmPassword}
								onChange={handleChange}
								placeholder="Xác nhận mật khẩu"
								className={inputClassName}
								required
							/>

							{message && <p className="text-center text-sm text-cyan-700">{message}</p>}

							<button
								type="submit"
								className="mt-2 w-full rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 shadow-md shadow-blue-500/10 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-200 active:scale-[0.98]">
								Đăng ký
							</button>

							<p className="mt-4 text-center text-xs text-slate-400">
								Đã có tài khoản?{' '}
								<Link
									href="/auth/login"
									className="text-blue-600 hover:text-blue-700 font-semibold hover:underline">
									Đăng nhập ngay
								</Link>
							</p>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
