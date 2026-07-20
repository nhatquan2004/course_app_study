import { logout } from '../../../../app/auth/login/action';

export default function LogoutButton() {
	return (
		<form action={logout}>
			<button
				type="submit"
				className="btn-push btn-push-soft text-slate-600 hover:text-rose-600 active:scale-95"
			>
				Đăng xuất
			</button>
		</form>
	);
}
