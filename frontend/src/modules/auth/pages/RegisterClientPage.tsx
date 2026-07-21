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
							Join our modern learning ecosystem.
						</h1>
						<p className="mt-4 max-w-xs text-xs leading-relaxed text-[var(--color-muted)] font-medium">
							Tạo tài khoản cá nhân để lưu trữ tiến độ, làm bài tập và nhận đánh giá từ đội ngũ chuyên môn.
						</p>
					</div>

					{/* Right Form Panel */}
					<div className="p-8 md:p-10 flex flex-col justify-center bg-white">
						<div className="mb-6">
							<p className="text-[9px] font-bold font-mono text-[var(--color-muted)] uppercase tracking-widest">
								REGISTER / NEW ACCOUNT
							</p>
							<h2 className="mt-1 text-lg font-extrabold text-[var(--color-ink)] tracking-tight">
								Tạo tài khoản mới
							</h2>
							<p className="mt-1.5 text-xs text-[var(--color-muted)] font-medium">
								Điền thông tin chi tiết dưới đây để bắt đầu.
							</p>
						</div>

						<form action={formAction} className="space-y-3.5">
							<input name="fullName" placeholder="Họ và tên" className={inputClassName} required />

							<input
								name="email"
								type="email"
								placeholder="Địa chỉ email"
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
										state.success ? 'text-emerald-600' : 'text-[var(--color-accent-3)]'
									}`}
								>
									{state.message}
								</p>
							)}

							<button
								type="submit"
								disabled={pending}
								className="btn-push btn-push-cyan w-full text-xs py-3 mt-2 font-bold"
							>
								{pending ? 'Đang tạo tài khoản...' : 'Đăng ký'}
							</button>

							<p className="mt-4 text-center text-xs text-[var(--color-muted)] font-bold">
								Đã có tài khoản?{' '}
								<Link
									href="/auth/login"
									className="text-[var(--color-accent)] hover:underline font-bold"
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
