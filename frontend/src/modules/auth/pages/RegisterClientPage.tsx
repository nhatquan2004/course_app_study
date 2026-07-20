'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import { registerAction } from '../authActions';

export default function RegisterClientPage() {
	const [state, formAction, pending] = useActionState(registerAction, {
		success: false,
		message: '',
	});

	const inputClassName =
		'w-full rounded-[var(--radius-input)] border border-[var(--color-rule)] bg-white px-4 py-3 text-xs text-[var(--color-ink)] outline-none transition placeholder:text-slate-400 focus:border-[var(--color-accent-2)] focus:ring-2 focus:ring-[var(--color-accent-2)]/20 shadow-2xs';

	return (
		<div className="min-h-screen w-full bg-[var(--color-paper-2)] px-6 py-6 md:py-0 md:h-screen md:overflow-hidden flex items-center justify-center text-[var(--color-ink)] font-sans">
			<div className="w-full max-w-4xl mx-auto flex items-center justify-center">
				<div className="grid w-full overflow-hidden rounded-[24px] border border-[var(--color-rule)] bg-white shadow-lg md:grid-cols-2">
					{/* Left Welcome Panel */}
					<div className="flex flex-col justify-center p-8 md:p-12 lg:p-16 bg-[var(--color-paper-2)]/30 border-r border-[var(--color-rule)]">
						<p className="mb-3 text-[10px] font-black uppercase tracking-[0.35em] text-[var(--color-accent-2)]">
							Course App
						</p>
						<h1 className="text-3xl font-black tracking-tight md:text-4xl lg:text-5xl text-[var(--color-ink)]">
							Đăng ký
						</h1>
						<p className="mt-5 max-w-xs text-xs leading-relaxed text-[var(--color-muted)] font-medium">
							Đăng ký tài khoản để bắt đầu học các khóa học và khám phá những kiến thức mới cùng Course App.
						</p>
					</div>

					{/* Right Form Panel */}
					<div className="p-8 md:p-10 flex flex-col justify-center bg-white">
						<div className="mb-6">
							<p className="text-[10px] font-black text-[var(--color-accent-2)] uppercase tracking-wider">
								Chào mừng bạn
							</p>
							<h2 className="mt-1 text-lg font-black text-[var(--color-ink)] tracking-tight">
								Tạo tài khoản mới
							</h2>
							<p className="mt-1.5 text-xs text-[var(--color-muted)] font-medium">
								Nhập đầy đủ thông tin để đăng ký tài khoản.
							</p>
						</div>

						<form action={formAction} className="space-y-4">
							<input name="fullName" placeholder="Họ và tên" className={inputClassName} required />

							<input
								name="email"
								type="email"
								placeholder="Email"
								className={inputClassName}
								required
							/>

							<input
								name="password"
								type="password"
								placeholder="Mật khẩu"
								className={inputClassName}
								required
							/>

							<input
								name="confirmPassword"
								type="password"
								placeholder="Xác nhận mật khẩu"
								className={inputClassName}
								required
							/>

							{state.message && (
								<p
									className={`text-center text-xs font-bold ${
										state.success ? 'text-emerald-600' : 'text-rose-500'
									}`}
								>
									{state.message}
								</p>
							)}

							<button
								type="submit"
								disabled={pending}
								className="btn-push btn-push-cyan w-full text-xs py-3 mt-2"
							>
								{pending ? 'Đang đăng ký...' : 'Đăng ký'}
							</button>

							<p className="mt-4 text-center text-xs text-[var(--color-muted)] font-bold">
								Đã có tài khoản?{' '}
								<Link
									href="/auth/login"
									className="text-[var(--color-accent-2)] hover:text-blue-700 font-bold hover:underline"
								>
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
