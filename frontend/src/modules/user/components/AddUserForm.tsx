'use client';

import { redirect } from 'next/navigation';

export default function AddUserForm() {
	return (
		<div className="max-w-2xl rounded-xl border border-slate-200 bg-white">
			<div className="border-b border-slate-200 px-6 py-5">
				<h2 className="text-lg font-bold text-slate-900">Thêm người dùng</h2>
				<p className="mt-1 text-sm text-slate-500">Nhập thông tin để tạo tài khoản mới.</p>
			</div>

			<form className="space-y-6 p-6">
				<div className="grid gap-6 md:grid-cols-2">
					{/* Full Name */}
					<div className="md:col-span-2">
						<label className="mb-2 block text-sm font-semibold text-slate-700">Họ và tên</label>
						<input
							type="text"
							name="fullName"
							placeholder="Nguyễn Văn A"
							className="w-full rounded-lg border border-slate-300 text-slate-500 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
						/>
					</div>

					{/* Email */}
					<div>
						<label className="mb-2 block text-sm font-semibold text-slate-700">Email</label>
						<input
							type="email"
							name="email"
							placeholder="example@email.com"
							className="w-full rounded-lg border border-slate-300 text-slate-500 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
						/>
					</div>

					{/* Password */}
					<div>
						<label className="mb-2 block text-sm font-semibold text-slate-700">Mật khẩu</label>
						<input
							type="password"
							name="password"
							className="w-full rounded-lg border border-slate-300 text-slate-500 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
						/>
					</div>

					{/* Role */}
					<div className="md:col-span-2">
						<label className="mb-2 block text-sm font-semibold text-slate-700">Vai trò</label>
						<select
							name="role"
							className="w-full rounded-lg border border-slate-300 text-slate-500 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100">
							<option value="admin">Admin</option>
							<option value="admin">User</option>
						</select>
					</div>
				</div>

				<div className="flex justify-end gap-3 border-t border-slate-100 pt-6">
					<button
						type="button"
						onClick={() => redirect('/admin/user_management')}
						className="rounded-lg border border-slate-300 text-slate-500 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100">
						Hủy
					</button>

					<button
						type="submit"
						className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-95">
						Tạo người dùng
					</button>
				</div>
			</form>
		</div>
	);
}
