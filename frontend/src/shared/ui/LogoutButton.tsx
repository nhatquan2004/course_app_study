import { logout } from '../../../app/auth/login/action';

export default function LogoutButton() {
	return (
		<form action={logout}>
			<button
				type="submit"
				className="rounded-md border border-red-500 bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600">
				Đăng xuất
			</button>
		</form>
	);
}
