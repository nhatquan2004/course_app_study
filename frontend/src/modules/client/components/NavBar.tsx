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
						className={`rounded-md px-3 py-2 text-left text-sm font-medium transition ${
							isActive
								? 'bg-zinc-900 text-white'
								: 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900'
						}`}>
						{link.label}
					</Link>
				);
			})}
		</nav>
	);
}
