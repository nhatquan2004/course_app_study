'use client';

type SearchBarProps = {
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
	className?: string;
};

export default function SearchBar({
	value,
	onChange,
	placeholder = 'Search...',
	className = '',
}: SearchBarProps) {
	return (
		<div className={`relative ${className}`}>
			<span className="absolute inset-y-0 left-3 flex items-center text-slate-400 pointer-events-none">
				<svg className="h-4 w-4 text-[var(--color-muted)]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
				</svg>
			</span>
			<input
				type="text"
				value={value}
				onChange={(e) => onChange(e.target.value)}
				placeholder={placeholder}
				className="w-full rounded-[var(--radius-input)] border border-[var(--color-rule)] bg-white py-2.5 pl-10 pr-4 text-xs text-[var(--color-ink)] outline-none focus:border-[var(--color-accent-2)] focus:ring-2 focus:ring-[var(--color-accent-2)]/20 transition-all placeholder:text-[var(--color-muted)] shadow-2xs"
			/>
		</div>
	);
}
