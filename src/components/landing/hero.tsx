import { ArrowRight, BookOpen, Leaf } from 'lucide-react';
import type { Dictionary } from '@/i18n';
import type { LiveStats } from '@/lib/stats';
import { links } from '@/config/links';

interface HeroProps {
	t: Dictionary['hero'];
	live: LiveStats;
}

export function Hero({ t, live }: HeroProps) {
	const stats = [
		{ value: t.stats.tps, label: t.stats.tpsLabel },
		{ value: t.stats.finality, label: t.stats.finalityLabel },
		{ value: t.stats.gas, label: t.stats.gasLabel },
		{ value: `${live.yearsLive} ${t.stats.yearsUnit}`, label: t.stats.yearsLabel },
	];

	return (
		<section id='top' className='relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden'>
			<div className='absolute inset-0 bg-glow-blue pointer-events-none' />
			<div className='absolute inset-0 bg-glow-gold pointer-events-none' />
			<div className='absolute inset-0 grid-lines opacity-[0.03] pointer-events-none' />
			<div className='relative mx-auto max-w-5xl px-4 sm:px-6 text-center reveal'>
				<div className='inline-flex flex-wrap items-center justify-center gap-2 mb-8'>
					<span className='inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold-soft px-4 py-1.5 text-xs font-medium text-gold-light'>
						{t.badgeL1}
					</span>
					<span className='inline-flex items-center gap-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-medium text-blue-500'>
						<Leaf size={12} />
						{t.badgeCarbon}
					</span>
				</div>
				<h1 className='font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6'>
					{t.titleA}
					<br className='hidden sm:block' /> <span className='text-gold'>{t.titleGradient}</span>
				</h1>
				<p className='mx-auto max-w-2xl text-base sm:text-lg text-zinc-400 leading-relaxed mb-10'>{t.body}</p>
				<div className='flex flex-col sm:flex-row items-center justify-center gap-4 mb-14'>
					<a
						href='#ecosystem'
						className='inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold bg-gold-gradient text-on-gold hover:brightness-110 transition-all shadow-lg shadow-gold/20'
					>
						{t.ctaEcosystem}
						<ArrowRight size={16} />
					</a>
					<a
						href={links.ecosystem.docs}
						target='_blank'
						rel='noopener noreferrer'
						className='inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold border border-white/20 text-white hover:bg-white/5 transition-all'
					>
						<BookOpen size={16} />
						{t.ctaDocs}
					</a>
				</div>
				<div className='grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto'>
					{stats.map((stat) => (
						<div key={stat.label} className='glass-card rounded-2xl px-4 py-5'>
							<div className='font-display text-2xl sm:text-3xl font-bold text-gold'>{stat.value}</div>
							<div className='mt-1 text-xs uppercase tracking-wider text-zinc-400'>{stat.label}</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
