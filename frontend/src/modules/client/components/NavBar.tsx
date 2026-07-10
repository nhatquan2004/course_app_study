'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
	{ href: '/', label: 'Khóa học' },
	{ href: '/admin/category', label: 'Danh mục' },
];

export default function NavBar() {
	const pathname = usePathname();

	return (
		<nav className="flex flex-col gap-2">
			{links.map(link => {
				const isActive = pathname === link.href;

				return (
					<Link
						key={link.href}
						href={link.href}
						className={`rounded-lg px-4 py-2.5 text-left text-sm font-medium transition-all duration-200 ${
							isActive
								? 'bg-blue-50 text-blue-600 font-semibold'
								: 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
						}`}>
						{link.label}
					</Link>
				);
			})}
		</nav>
	);
}
