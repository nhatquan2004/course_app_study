import { toast } from 'react-toastify';
import { User } from '../types';
import { deleteUserAction } from '../userActions';

export default function UserItem({ user }: { user: User }) {
	async function handleDeleteUser() {
		if (!confirm(`Bạn có chắc chắn muốn xóa người dùng "${user.fullName}" không?`)) return;
		try {
			const data = (await deleteUserAction(user._id)) as any;
			if (data && data.success !== false) {
				toast.success(data?.message || 'Đã xóa người dùng');
			} else {
				toast.error(data?.message || 'Xóa người dùng thất bại');
			}
		} catch (err) {
			toast.error('Lỗi kết nối mạng.');
		}
	}

	return (
		<tr className="hover:bg-[var(--color-paper-2)]/20 transition-colors">
			<td className="px-6 py-4.5 whitespace-nowrap">
				<div className="flex items-center gap-3">
					<div className="h-9 w-9 rounded-xl bg-[var(--color-accent)] border border-[var(--color-accent-deep)] flex items-center justify-center text-xs font-black text-[var(--color-ink)] shrink-0 shadow-2xs">
						{user.fullName.charAt(0).toUpperCase()}
					</div>
					<span className="font-bold text-xs text-[var(--color-ink)] leading-snug">{user.fullName}</span>
				</div>
			</td>

			<td className="px-6 py-4.5 whitespace-nowrap">
				{user.role === 'admin' ? (
					<span className="inline-flex items-center rounded-lg bg-[var(--color-accent-2)]/10 px-2 py-0.5 text-[9px] font-black text-[var(--color-accent-2)] border border-[var(--color-accent-2)]/20 uppercase tracking-wider">
						admin
					</span>
				) : (
					<span className="inline-flex items-center rounded-lg bg-[var(--color-paper-2)] px-2 py-0.5 text-[9px] font-black text-[var(--color-muted)] border border-[var(--color-rule)] uppercase tracking-wider">
						user
					</span>
				)}
			</td>

			<td className="px-6 py-4.5 text-xs font-bold text-[var(--color-muted)] whitespace-nowrap">{user.email}</td>

			<td className="px-6 py-4.5 text-xs font-bold text-[var(--color-muted)] whitespace-nowrap">
				{new Date(user.createdAt).toLocaleDateString('vi-VN')}
			</td>

			<td className="px-6 py-4.5 text-right pr-8 whitespace-nowrap">
				<div className="flex justify-end gap-2">
					<button
						type="button"
						className="btn-push btn-push-soft !py-1.5 !px-3 text-[11px]"
					>
						Sửa
					</button>

					<button
						type="button"
						onClick={handleDeleteUser}
						className="btn-push btn-push-coral !py-1.5 !px-3 text-[11px]"
					>
						Xóa
					</button>
				</div>
			</td>
		</tr>
	);
}
