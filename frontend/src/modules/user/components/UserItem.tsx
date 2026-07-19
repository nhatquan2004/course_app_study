import { toast } from 'react-toastify';
import { User } from '../types';
import { deleteUserAction } from '../userActions';

export default function UserItem({ user }: { user: User }) {
	async function handleDeleteUser() {
		const data = (await deleteUserAction(user._id)) as any;
		toast.success(data?.message || 'Đã xóa người dùng');
	}

	return (
		<tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
			<td className="px-6 py-4">
				<div className="flex items-center gap-4">
					<div className="h-10 w-10 rounded-full bg-linear-to-tr from-blue-500/10 to-indigo-500/10 flex items-center justify-center text-sm font-bold text-blue-600">
						{user.fullName.charAt(0).toUpperCase()}
					</div>
					<span className="font-semibold text-slate-900">{user.fullName}</span>
				</div>
			</td>

			<td className="px-6 py-4">
				<span
					className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-bold uppercase tracking-wider ${
						user.role === 'admin'
							? 'bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-700/10'
							: 'bg-slate-50 text-slate-600 ring-1 ring-inset ring-slate-500/10'
					}`}>
					{user.role}
				</span>
			</td>

			<td className="px-6 py-4 text-slate-600">{user.email}</td>

			<td className="px-6 py-4 text-slate-500">
				{new Date(user.createdAt).toLocaleDateString('vi-VN')}
			</td>

			<td className="px-6 py-4">
				<div className="flex justify-end gap-2">
					<button
						type="button"
						className="rounded-lg border border-slate-200 hover:bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-800 transition active:scale-95 cursor-pointer">
						Sửa
					</button>

					<button
						type="button"
						onClick={handleDeleteUser}
						className="rounded-lg border border-red-100 bg-red-50/50 hover:bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 hover:text-red-700 transition active:scale-95 cursor-pointer">
						Xóa
					</button>
				</div>
			</td>
		</tr>
	);
}
