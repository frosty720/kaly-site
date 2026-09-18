import { ArrowRight } from 'lucide-react';
import type { Dictionary } from '@/i18n';

export function Cta({ t }: { t: Dictionary['cta'] }) {
	return (
		<section id='cta' className='relative py-24 sm:py-32 overflow-hidden'>
			<div className='absolute inset-0 bg-glow-blue pointer-events-none' />
			<div className='absolute inset-0 bg-glow-gold pointer-events-none' />
			<div className='relative mx-auto max-w-3xl px-4 sm:px-6 text-center reveal'>
				<h2 className='font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.15] mb-6'>
					{t.titleA} <span className='text-gold'>{t.titleGradient}</span>
				</h2>
				<p className='mx-auto max-w-xl text-base sm:text-lg text-zinc-400 mb-10'>{t.body}</p>
				<div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
					<a
						href='#ecosystem'
						className='inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold bg-gold-gradient text-on-gold hover:brightness-110 transition-all shadow-lg shadow-gold/20'
					>
						{t.ctaEcosystem}
						<ArrowRight size={16} />
					</a>
					<a
						href='#developers'
						className='inline-flex items-center px-8 py-4 rounded-full text-sm font-semibold border border-white/20 text-white hover:bg-white/5 transition-all'
					>
						{t.ctaBuild}
					</a>
				</div>
			</div>
		</section>
	);
}
