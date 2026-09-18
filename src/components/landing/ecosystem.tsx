import { ArrowLeftRight, Bot, Building2, CircleDollarSign, Layers, Smartphone } from 'lucide-react';
import type { Dictionary } from '@/i18n';
import { SectionHeader } from './section-header';

const cardIcons = [Layers, ArrowLeftRight, Building2, Bot, CircleDollarSign, Smartphone];

export function Ecosystem({ t }: { t: Dictionary['ecosystem'] }) {
	return (
		<section id='ecosystem' className='relative py-20 sm:py-28 bg-glow-gold'>
			<div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
				<SectionHeader kicker={t.kicker} title={t.title} lead={t.lead} />
				<div className='mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 reveal'>
					{t.cards.map((card, i) => {
						const Icon = cardIcons[i];
						return (
							<div
								key={card.title}
								className='glass-card rounded-2xl p-7 hover:border-gold/40 transition-colors duration-[250ms]'
							>
								<div className='flex items-center justify-between mb-5'>
									<div className='flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/15'>
										<Icon size={20} className='text-blue-500' />
									</div>
									<span className='text-[10px] font-semibold uppercase tracking-[0.15em] text-gold'>{card.tag}</span>
								</div>
								<h3 className='font-display text-lg font-bold mb-2'>{card.title}</h3>
								<p className='text-sm text-zinc-400 leading-relaxed'>{card.body}</p>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
