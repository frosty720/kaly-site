import { Boxes, FileCode2, Github, LifeBuoy } from 'lucide-react';
import type { Dictionary } from '@/i18n';
import { SectionHeader } from './section-header';

const cardIcons = [Github, FileCode2, Boxes, LifeBuoy];

export function Developers({ t }: { t: Dictionary['developers'] }) {
	return (
		<section id='developers' className='relative py-20 sm:py-28 bg-glow-blue'>
			<div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
				<SectionHeader kicker={t.kicker} title={t.title} lead={t.lead} />
				<div className='mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 reveal'>
					{t.cards.map((card, i) => {
						const Icon = cardIcons[i];
						return (
							<div key={card.title} className='glass-card rounded-2xl p-7'>
								<div className='flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/15 mb-5'>
									<Icon size={20} className='text-blue-500' />
								</div>
								<h3 className='font-display text-base font-bold mb-3'>{card.title}</h3>
								<ul className='space-y-2'>
									{card.items.map((item) => (
										<li key={item} className='flex items-start gap-2 text-sm text-zinc-400'>
											<span className='mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0' />
											{item}
										</li>
									))}
								</ul>
							</div>
						);
					})}
				</div>
				<div className='mt-8 grid gap-6 md:grid-cols-3 reveal'>
					{t.programs.map((program) => (
						<div key={program.title} className='glass-card rounded-2xl p-7 border-gold/20'>
							<div className='font-display text-2xl font-bold text-gold mb-2'>{program.amount}</div>
							<h4 className='font-display text-base font-semibold mb-1'>{program.title}</h4>
							<p className='text-sm text-zinc-400'>{program.body}</p>
						</div>
					))}
				</div>
				<p className='mt-6 text-center text-xs text-zinc-400'>{t.note}</p>
			</div>
		</section>
	);
}
