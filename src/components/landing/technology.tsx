import { Boxes, Coins, Cpu, Gauge, GitBranch, Radio } from 'lucide-react';
import type { Dictionary } from '@/i18n';
import { SectionHeader } from './section-header';

const cardIcons = [Cpu, Boxes, GitBranch, Gauge, Coins, Radio];

export function Technology({ t }: { t: Dictionary['tech'] }) {
	return (
		<section id='tech' className='relative py-20 sm:py-28'>
			<div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
				<SectionHeader kicker={t.kicker} title={t.title} lead={t.lead} />
				<div className='mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 reveal'>
					{t.cards.map((card, i) => {
						const Icon = cardIcons[i];
						return (
							<div key={card.title} className='glass-card rounded-2xl p-7'>
								<div className='flex h-11 w-11 items-center justify-center rounded-xl bg-gold-soft mb-5'>
									<Icon size={20} className='text-gold' />
								</div>
								<h3 className='font-display text-base font-bold mb-2'>{card.title}</h3>
								<p className='text-sm text-zinc-400 leading-relaxed'>{card.body}</p>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
