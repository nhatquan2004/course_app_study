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
		'w-full rounded-[var(--radius-input)] border border-[var(--color-rule)] bg-white px-4 py-3.5 text-xs text-[var(--color-ink)] outline-none transition placeholder:text-slate-400 focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/15 shadow-3xs';

	return (
		<div className="min-h-screen w-full bg-[var(--color-paper)] px-6 py-6 md:py-0 md:h-screen md:overflow-hidden flex items-center justify-center text-[var(--color-ink)] font-sans">
			<div className="w-full max-w-4xl mx-auto flex items-center justify-center">
				<div className="grid w-full overflow-hidden rounded-[20px] border border-[var(--color-rule)] bg-white shadow-md md:grid-cols-2">
					{/* Left Welcome Panel */}
					<div className="flex flex-col justify-center p-8 md:p-12 lg:p-16 bg-[var(--color-paper-2)] border-r border-[var(--color-rule)]">
						<p className="mb-2 text-[9px] font-bold font-mono uppercase tracking-[0.25em] text-[var(--color-accent)]">
							COURSE PLATFORM
						</p>
						<h1 className="text-3xl font-extrabold tracking-tight text-[var(--color-ink)] leading-tight">
							Plan, learn, and grow from one premium app.
						</h1>
						<p className="mt-4 max-w-xs text-xs leading-relaxed text-[var(--color-muted)] font-medium">
							Đăng nhập để tiếp cận hệ thống đào tạo chất lượng cao, quản lý lộ trình học tập và kết nối cùng giảng viên.
						</p>
					</div>

					{/* Right Form Panel */}
					<div className="p-8 md:p-10 flex flex-col justify-center bg-white">
						<div className="mb-6">
							<p className="text-[9px] font-bold font-mono text-[var(--color-muted)] uppercase tracking-widest">
								LOGIN / CREDENTIALS
							</p>
							<h2 className="mt-1 text-lg font-extrabold text-[var(--color-ink)] tracking-tight">
								Đăng nhập tài khoản
							</h2>
							<p className="mt-1.5 text-xs text-[var(--color-muted)] font-medium">
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
									placeholder="Địa chỉ email"
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
									className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-[var(--color-muted)] hover:text-[var(--color-accent)] transition uppercase tracking-wider"
								>
									{isVisiblePassword ? 'Ẩn' : 'Hiện'}
								</button>
							</div>

							{message && <p className="text-center text-xs text-[var(--color-accent-3)] font-bold">{message}</p>}

							<button
								type="submit"
								className="btn-push btn-push-cyan w-full text-xs py-3 mt-2 font-bold"
							>
								Đăng nhập
							</button>

							<p className="mt-4 text-center text-xs text-[var(--color-muted)] font-bold">
								Chưa có tài khoản?{' '}
								<Link
									href="/auth/register"
									className="text-[var(--color-accent)] hover:underline font-bold"
								>
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
