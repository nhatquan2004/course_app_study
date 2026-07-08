'use client';

import { useState } from 'react';
import { login } from '../../../../app/auth/login/action';

export default function LoginClientPage() {
	const [isVisiblePassword, setIsVisiblePassword] = useState(false);
	const [message] = useState('');

	const [form, setForm] = useState({ username: '', password: '' });

	function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
		const { name, value } = event.target;

		setForm({
			...form,
			[name]: value,
		});
	}

	const inputClassName =
		'w-full rounded-2xl border border-cyan-400/20 bg-white/10 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300 focus:ring-4 focus:ring-cyan-400/20';

	return (
		<div className="min-h-screen w-full bg-[radial-gradient(circle_at_top,#0ea5e9_0%,#020617_35%,#020617_100%)] px-6 py-10 text-white">
			<div className="mx-auto flex min-h-[calc(100vh-80px)] max-w-5xl items-center justify-center">
				<div className="grid w-full overflow-hidden rounded-4xl border border-cyan-400/20 bg-white/10 shadow-[0_0_60px_rgba(14,165,233,0.25)] backdrop-blur-xl md:grid-cols-2">
					<div className="flex flex-col justify-center p-8 md:p-12">
						<p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">
							Course App
						</p>

						<h1 className="text-4xl font-bold leading-tight md:text-5xl">Đăng nhập</h1>

						<p className="mt-6 max-w-md text-base leading-7 text-slate-300">
							Đăng nhập để truy cập các khóa học, quản lý tài khoản và tiếp tục hành trình học tập
							cùng Course App.
						</p>
					</div>

					<form
						action={login}
						className="m-4 rounded-[28px] border border-white/10 bg-slate-950/70 p-7 shadow-2xl md:m-6 md:p-9">
						<div className="mb-6">
							<p className="text-sm font-medium text-cyan-300">Chào mừng trở lại</p>
							<h2 className="mt-2 text-2xl font-bold">Đăng nhập vào tài khoản của bạn</h2>
							<p className="mt-2 text-sm text-slate-400">Nhập email và mật khẩu để tiếp tục.</p>
						</div>

						<div className="space-y-4">
							<input
								name="username"
								type="text"
								value={form.username}
								onChange={handleChange}
								placeholder="Tên đăng nhập"
								className={inputClassName}
								required
							/>

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
									className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-cyan-200 transition hover:text-cyan-100">
									{isVisiblePassword ? 'Ẩn' : 'Hiện'}
								</button>
							</div>

							{message && <p className="text-center text-sm text-cyan-200">{message}</p>}

							<button
								type="submit"
								className="mt-2 w-full rounded-2xl bg-linear-to-r from-blue-600 to-cyan-400 px-6 py-4 font-bold text-white shadow-[0_0_30px_rgba(14,165,233,0.45)] transition hover:scale-[1.02] hover:from-blue-500 hover:to-cyan-300 active:scale-[0.98]">
								Đăng nhập
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
