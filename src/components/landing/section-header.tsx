interface SectionHeaderProps {
	kicker: string;
	title: string;
	lead: string;
}

export function SectionHeader({ kicker, title, lead }: SectionHeaderProps) {
	return (
		<div className='text-center max-w-3xl mx-auto reveal'>
			<div className='flex justify-center'>
				<div className='flex items-center gap-3 mb-4'>
					<div className='h-px w-8 bg-gold/50' />
					<span className='text-xs font-semibold uppercase tracking-[0.2em] text-gold'>{kicker}</span>
				</div>
			</div>
			<h2 className='font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.15] mb-6'>
				{title}
			</h2>
			<p className='text-zinc-400 text-base sm:text-lg'>{lead}</p>
		</div>
	);
}
