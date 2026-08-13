import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import type { Dictionary } from '@/i18n';

export function Manifesto({ t }: { t: Dictionary['manifesto'] }) {
	return (
		<section id='manifesto' className='relative py-24 md:py-28 overflow-hidden border-t hairline'>
			<div className='absolute inset-0'>
				<Image
					src='/images/landing/mobile-money.webp'
					alt=''
					fill
					sizes='100vw'
					className='object-cover opacity-20'
				/>
			</div>
			<div className='absolute inset-0 bg-gradient-to-b from-ink via-ink/85 to-ink' />
			<div className='relative mx-auto max-w-[900px] px-6 text-center reveal'>
				<span className='text-xs font-display tracking-[0.2em] text-gold/70'>{t.kicker}</span>
				<h2 className='font-display font-bold text-4xl sm:text-5xl mt-4 leading-tight'>
					{t.titleA}
					<br />
					{t.titleB} <span className='text-gradient-gold'>{t.titleGradient}</span>
				</h2>
				<div className='font-serif-k text-lg sm:text-xl text-cream/75 mt-10 space-y-2 leading-relaxed'>
					{t.lines.map(([before, highlight, after]) => (
						<p key={highlight}>
							{before}
							<span className='text-cream'>{highlight}</span>
							{after}
						</p>
					))}
				</div>
				<p className='text-2xl font-serif-k text-cream mt-10 leading-relaxed'>{t.punch}</p>
				<p className='text-lg font-serif-k text-cream/75 mt-4 leading-relaxed max-w-2xl mx-auto'>
					{t.bodyA} <span className='text-gold'>{t.bodyGoldA}</span> {t.bodyB}{' '}
					<span className='text-gold'>{t.bodyGoldB}</span>
					{t.bodyC}
				</p>
				<p className='font-display text-base text-cream/55 mt-6'>{t.footer}</p>
				<a
					href='#ecosystem'
					className='mt-10 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-goldbright to-gold px-10 py-5 text-lg font-display font-bold text-ink gold-glow hover:scale-[1.02] transition'
				>
					{t.cta} <ArrowRight size={20} />
				</a>
				<p className='font-display text-sm text-cream/45 mt-5 tracking-wide'>{t.tagline}</p>
			</div>
		</section>
	);
}
