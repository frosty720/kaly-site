import { BarChart3, Code, Globe, Landmark, Smartphone, Users } from 'lucide-react';
import type { Dictionary } from '@/i18n';
import { links } from '@/config/links';

const cardConfig = [
	{ icon: Code, href: links.ecosystem.docs, external: true },
	{ icon: BarChart3, href: links.ecosystem.dexApp, external: true },
	{ icon: Landmark, href: links.social.telegram, external: true },
	{ icon: Globe, href: links.ecosystem.kalypay, external: true },
	{ icon: Users, href: '#governance', external: false },
	{ icon: Smartphone, href: links.ecosystem.kalypay, external: true },
] as const;

export function Audiences({ t }: { t: Dictionary['audiences'] }) {
	return (
		<section id='audiences' className='relative py-20 md:py-24 border-t hairline'>
			<div className='mx-auto max-w-[1200px] px-6'>
				<div className='text-center reveal'>
					<span className='text-xs font-display tracking-[0.2em] text-gold/70'>{t.kicker}</span>
					<h2 className='font-display font-bold text-4xl sm:text-5xl mt-4'>
						{t.titleA} <span className='text-gradient-gold'>{t.titleGradient}</span>
						{t.titleB}
					</h2>
				</div>
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-14'>
					{t.cards.map((card, i) => {
						const { icon: Icon, href, external } = cardConfig[i];
						return (
							<article key={card.title} className='rounded-2xl border hairline bg-surface p-7 card-hover flex flex-col reveal'>
								<div className='grid place-items-center w-12 h-12 rounded-xl bg-gold/10'>
									<Icon className='text-gold' size={22} />
								</div>
								<h3 className='font-display font-semibold text-lg mt-5'>{card.title}</h3>
								<div className='text-[11px] font-display tracking-wide text-gold/60 mt-1'>{card.tag}</div>
								<p className='text-cream/55 text-sm mt-3 flex-1'>{card.body}</p>
								<a
									href={href}
									{...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
									className='mt-5 text-center rounded-full border hairline px-5 py-2.5 text-sm font-display font-medium hover:border-gold/60 hover:text-gold transition'
								>
									{card.cta}
								</a>
							</article>
						);
					})}
				</div>
			</div>
		</section>
	);
}
