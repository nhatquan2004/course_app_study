import { logout } from '../../../../app/auth/login/action';

export default function LogoutButton() {
	return (
		<form action={logout}>
			<button
				type="submit"
				className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-all duration-200 active:scale-[0.98]">
				Đăng xuất
			</button>
		</form>
	);
}
