import { Check, Shield, Stamp, Zap } from 'lucide-react';
import type { Dictionary } from '@/i18n';

const icons = [Zap, Shield, Stamp];

export function Solution({ t }: { t: Dictionary['solution'] }) {
	return (
		<section className='relative py-20 md:py-24 border-t hairline'>
			<div className='mx-auto max-w-[1200px] px-6'>
				<div className='text-center max-w-3xl mx-auto reveal'>
					<span className='text-xs font-display tracking-[0.2em] text-gold/70'>{t.kicker}</span>
					<h2 className='font-display font-bold text-4xl sm:text-5xl mt-4'>
						{t.titleA} <span className='text-gradient-gold'>{t.titleGradient}</span>
					</h2>
					<p className='font-serif-k text-xl text-cream/70 mt-6 leading-relaxed'>{t.lead}</p>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-14'>
					{t.cards.map((card, i) => {
						const Icon = icons[i];
						return (
							<article key={card.title} className='rounded-2xl border hairline bg-surface p-8 card-hover'>
								<div className='grid place-items-center w-12 h-12 rounded-xl bg-gold/10'>
									<Icon className='text-gold' size={22} />
								</div>
								<h3 className='font-display font-semibold text-2xl mt-5'>{card.title}</h3>
								<ul className='mt-4 space-y-2 text-cream/60 text-sm'>
									{card.items.map((item) => (
										<li key={item} className='flex items-center gap-2'>
											<Check className='text-gold shrink-0' size={13} />
											{item}
										</li>
									))}
								</ul>
							</article>
						);
					})}
				</div>
			</div>
		</section>
	);
}
