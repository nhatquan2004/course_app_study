import { toast } from 'react-toastify';
import { User } from './types';
import { deleteUserAction } from './userActions';

export default function UserItem({ user }: { user: User }) {
	async function handleDeleteUser() {
		const data = await deleteUserAction(user._id);
		toast.success(data.message);
	}

	return (
		<tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
			<td className="px-6 py-4">
				<div className="flex items-center gap-3">
					<div className="h-10 w-10 rounded-full bg-linear-to-tr from-blue-500/10 to-indigo-500/10 flex items-center justify-center text-sm font-bold text-blue-600">
						{user.fullName.charAt(0).toUpperCase()}
					</div>

					<span className="font-semibold text-slate-900">{user.fullName}</span>
				</div>
			</td>

			<td className="px-6 py-4 text-slate-600">@{user.username}</td>

			<td className="px-6 py-4 text-slate-600">{user.email}</td>

			<td className="px-6 py-4 text-slate-500">
				{new Date(user.createdAt).toLocaleDateString('vi-VN')}
			</td>

			<td className="px-6 py-4">
				<div className="flex justify-end gap-2">
					<button
						type="button"
						className="rounded-lg border border-slate-200 hover:bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-800 transition active:scale-95">
						Sửa
					</button>

					<button
						type="button"
						onClick={handleDeleteUser}
						className="rounded-lg border border-red-100 bg-red-50/50 hover:bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 hover:text-red-700 transition active:scale-95">
						Xóa
					</button>
				</div>
			</td>
		</tr>
	);
}
