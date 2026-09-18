import { ScrollText, ShieldCheck, Zap } from 'lucide-react';
import type { Dictionary } from '@/i18n';
import { SectionHeader } from './section-header';

const pillarIcons = [Zap, ShieldCheck, ScrollText];

export function Why({ t }: { t: Dictionary['why'] }) {
	return (
		<section id='why' className='relative py-20 sm:py-28 bg-glow-blue'>
			<div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
				<SectionHeader kicker={t.kicker} title={t.title} lead={t.lead} />
				<div className='mt-14 grid gap-6 md:grid-cols-3 reveal'>
					{t.pillars.map((pillar, i) => {
						const Icon = pillarIcons[i];
						return (
							<div
								key={pillar.title}
								className='glass-card rounded-2xl p-8 hover:border-gold/40 transition-colors duration-[250ms]'
							>
								<div className='flex h-12 w-12 items-center justify-center rounded-xl bg-gold-soft mb-6'>
									<Icon size={24} className='text-gold' />
								</div>
								<h3 className='font-display text-xl font-bold mb-4'>{pillar.title}</h3>
								<ul className='space-y-2.5'>
									{pillar.items.map((item) => (
										<li key={item} className='flex items-start gap-2 text-sm text-zinc-400'>
											<span className='mt-1.5 h-1.5 w-1.5 rounded-full bg-gold shrink-0' />
											{item}
										</li>
									))}
								</ul>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
