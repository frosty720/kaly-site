import Image from 'next/image';
import { ArrowRightLeft, Bot, Box, Coins, Landmark, Smartphone } from 'lucide-react';
import type { Dictionary } from '@/i18n';
import { links } from '@/config/links';

const cardConfig = [
	{ icon: Box, href: links.ecosystem.explorer, violet: false },
	{ icon: ArrowRightLeft, href: links.ecosystem.dexApp, violet: false },
	{ icon: Landmark, href: null, violet: false },
	{ icon: Bot, href: null, violet: true },
	{ icon: Coins, href: null, violet: false },
	{ icon: Smartphone, href: null, violet: false },
] as const;

export function Ecosystem({ t }: { t: Dictionary['ecosystem'] }) {
	return (
		<section id='ecosystem' className='relative py-20 md:py-24 border-t hairline overflow-hidden'>
			<div className='absolute right-0 top-0 h-full w-1/2 opacity-30 hidden lg:block'>
				<Image
					src='/images/landing/ecosystem-stack.webp'
					alt=''
					fill
					sizes='50vw'
					className='object-cover'
				/>
			</div>
			<div className='absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-transparent' />
			<div className='relative mx-auto max-w-[1200px] px-6'>
				<div className='max-w-2xl reveal'>
					<span className='text-xs font-display tracking-[0.2em] text-gold/70'>{t.kicker}</span>
					<h2 className='font-display font-bold text-4xl sm:text-5xl mt-4'>
						{t.titleA}
						<br />
						<span className='text-gradient-gold'>{t.titleGradient}</span>
					</h2>
					<p className='text-cream/60 text-lg mt-6'>{t.lead}</p>
				</div>
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-14'>
					{t.cards.map((card, i) => {
						const { icon: Icon, href, violet } = cardConfig[i];
						const inner = (
							<>
								<div className='flex items-center justify-between'>
									<div
										className={`grid place-items-center w-12 h-12 rounded-xl ${violet ? 'bg-violet/15' : 'bg-gold/10'}`}
									>
										<Icon className={violet ? 'text-violet' : 'text-gold'} size={22} />
									</div>
									<span
										className={`text-[10px] font-display tracking-widest ${violet ? 'text-violet' : 'text-cream/40'}`}
									>
										{card.tag}
									</span>
								</div>
								<h3 className='font-display font-semibold text-xl mt-5'>{card.title}</h3>
								<p className='text-cream/55 text-sm mt-2'>{card.body}</p>
							</>
						);
						const className = `rounded-2xl border ${violet ? 'border-violet/40 violet-glow' : 'hairline'} bg-surface/90 backdrop-blur p-7 card-hover block`;
						return href ? (
							<a key={card.title} href={href} target='_blank' rel='noopener noreferrer' className={className}>
								{inner}
							</a>
						) : (
							<article key={card.title} className={className}>
								{inner}
							</article>
						);
					})}
				</div>
			</div>
		</section>
	);
}
