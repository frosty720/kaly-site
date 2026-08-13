import Image from 'next/image';
import { ArrowRight, Leaf, Play } from 'lucide-react';
import type { Dictionary } from '@/i18n';
import type { LiveStats } from '@/lib/stats';

interface HeroProps {
	t: Dictionary['hero'];
	live: LiveStats;
}

export function Hero({ t, live }: HeroProps) {
	const stats = [
		{ ...live.heroCounters.blocks, label: t.stats.blocks },
		{ ...live.heroCounters.transactions, label: t.stats.transactions },
		{ ...live.heroCounters.addresses, label: t.stats.addresses },
		{ ...live.heroCounters.years, label: t.stats.years },
		{ ...live.heroCounters.blockTime, label: t.stats.blockTime },
		{ ...live.heroCounters.vaults, label: t.stats.vaults },
	];

	return (
		<section className='relative min-h-[840px] md:min-h-[900px] flex items-center overflow-hidden'>
			<div className='absolute inset-0'>
				<Image
					src='/images/landing/hero-bg.webp'
					alt=''
					fill
					priority
					sizes='100vw'
					className='object-cover'
				/>
				<div className='absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/60 to-ink' />
				<div className='absolute inset-0 bg-gradient-to-r from-ink via-transparent to-transparent' />
				<div className='particles absolute inset-0' />
			</div>
			<div className='relative mx-auto max-w-[1200px] w-full px-6 pt-28 pb-40'>
				<div className='max-w-3xl'>
					<div className='flex flex-wrap items-center gap-3 mb-8'>
						<div className='inline-flex items-center gap-2 rounded-full border hairline bg-ink/40 backdrop-blur px-4 py-1.5 text-xs font-display tracking-wide text-gold'>
							<span className='w-1.5 h-1.5 rounded-full bg-gold animate-pulse' />
							{t.badgeBuilt}
						</div>
						<div className='inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 backdrop-blur px-4 py-1.5 text-xs font-display tracking-wide text-green-400'>
							<Leaf size={11} />
							{t.badgeCarbon}
						</div>
					</div>
					<h1 className='font-display font-bold text-[42px] sm:text-[56px] md:text-[68px] leading-[1.02] tracking-tight mb-6'>
						{t.titleA}
						<br />
						{t.titleB} <span className='text-gradient-gold'>{t.titleGradient}</span>
					</h1>
					<p className='font-serif-k text-xl sm:text-2xl text-cream/90 leading-relaxed mb-2 max-w-2xl'>
						{t.tagline}
					</p>
					<p className='font-serif-k text-base sm:text-lg text-cream/60 leading-relaxed mb-6 max-w-2xl'>
						{t.subTagline}
					</p>
					<p className='text-cream/60 text-base sm:text-lg mb-10 max-w-xl'>{t.body}</p>
					<div className='flex flex-wrap items-center gap-4'>
						<a
							href='#ecosystem'
							className='group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-goldbright to-gold px-7 py-4 text-base font-display font-semibold text-ink gold-glow hover:scale-[1.02] transition'
						>
							{t.ctaEcosystem}
							<ArrowRight size={18} className='group-hover:translate-x-1 transition' />
						</a>
						<a
							href='#manifesto'
							className='inline-flex items-center gap-2 rounded-full border hairline bg-ink/30 backdrop-blur px-7 py-4 text-base font-display font-medium text-cream hover:border-gold/60 transition'
						>
							<Play size={14} className='text-gold' />
							{t.ctaManifesto}
						</a>
					</div>
				</div>
			</div>
			<div className='absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] px-6 pb-8'>
				<div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 rounded-2xl border hairline bg-ink/60 backdrop-blur-xl overflow-hidden'>
					{stats.map((stat) => (
						<div
							key={stat.label}
							className='px-5 py-5 sm:px-6 sm:py-6 border-r border-b sm:border-b-0 hairline'
						>
							<div
								className='font-display text-[22px] sm:text-[26px] font-bold text-gradient-gold'
								data-counter={stat.target}
								data-decimals={stat.decimals}
								data-prefix={stat.prefix}
								data-suffix={stat.suffix}
							>
								{`${stat.prefix}${stat.target.toFixed(stat.decimals)}${stat.suffix}`}
							</div>
							<div className='text-[11px] text-cream/50 mt-1 tracking-wide'>{stat.label}</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
