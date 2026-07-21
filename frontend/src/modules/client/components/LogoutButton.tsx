import { logout } from '../../../../app/auth/login/action';

export default function LogoutButton() {
	return (
		<form action={logout}>
			<button
				type="submit"
				className="btn-push btn-push-soft text-[9px] font-bold font-mono !py-1.5 !px-3 uppercase tracking-widest text-[var(--color-muted)] hover:text-[var(--color-accent-3)] font-sans"
			>
				Đăng xuất
			</button>
		</form>
	);
}
