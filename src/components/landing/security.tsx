import { BadgeCheck, CheckCircle2, CreditCard, Flag, Landmark, Lock, ShieldCheck, Workflow } from 'lucide-react';
import type { Dictionary } from '@/i18n';

const cardIcons = [ShieldCheck, BadgeCheck, Workflow];
const badgeIcons = [Lock, CreditCard, Flag, Landmark];

export function Security({ t }: { t: Dictionary['security'] }) {
	return (
		<section className='relative py-20 md:py-24 border-t hairline'>
			<div className='mx-auto max-w-[1200px] px-6'>
				<div className='text-center max-w-3xl mx-auto reveal'>
					<span className='text-xs font-display tracking-[0.2em] text-gold/70'>{t.kicker}</span>
					<h2 className='font-display font-bold text-4xl sm:text-5xl mt-4'>
						{t.titleA} <span className='text-gradient-gold'>{t.titleGradient}</span>
					</h2>
					<p className='text-cream/60 text-lg mt-6'>{t.lead}</p>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-14'>
					{t.cards.map((card, i) => {
						const Icon = cardIcons[i];
						return (
							<article key={card.title} className='rounded-2xl border hairline bg-surface p-8 card-hover reveal'>
								<div className='grid place-items-center w-12 h-12 rounded-xl bg-gold/10'>
									<Icon className='text-gold' size={22} />
								</div>
								<h3 className='font-display font-semibold text-xl mt-5'>{card.title}</h3>
								<ul className='mt-4 space-y-2.5 text-cream/60 text-sm'>
									{card.items.map((item) => (
										<li key={item} className='flex items-start gap-2'>
											<CheckCircle2 className='text-gold shrink-0 mt-0.5' size={14} />
											{item}
										</li>
									))}
								</ul>
							</article>
						);
					})}
				</div>
				<div className='flex items-center justify-center gap-8 mt-12 flex-wrap reveal'>
					{t.badges.map((badge, i) => {
						const Icon = badgeIcons[i];
						return (
							<span key={badge} className='inline-flex items-center gap-2 text-cream/50 text-sm'>
								<Icon className='text-gold' size={15} />
								{badge}
							</span>
						);
					})}
				</div>
			</div>
		</section>
	);
}
