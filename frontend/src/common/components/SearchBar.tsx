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
				<svg className="h-3.5 w-3.5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
				</svg>
			</span>
			<input
				type="text"
				value={value}
				onChange={(e) => onChange(e.target.value)}
				placeholder={placeholder}
				className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-4 text-xs text-slate-700 outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-100 transition-all placeholder:text-slate-400"
			/>
		</div>
	);
}
