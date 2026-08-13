import Image from 'next/image';
import { Bitcoin, BookOpen, Landmark, Scale, Shell, Users } from 'lucide-react';
import type { Dictionary } from '@/i18n';

const icons = [Landmark, Scale, Shell, BookOpen, Users, Bitcoin];

export function Heritage({ t }: { t: Dictionary['heritage'] }) {
	return (
		<section id='heritage' className='relative py-20 md:py-24 adinkra-grid border-t hairline'>
			<div className='mx-auto max-w-[1200px] px-6'>
				<div className='text-center max-w-3xl mx-auto reveal'>
					<span className='text-xs font-display tracking-[0.2em] text-gold/70'>{t.kicker}</span>
					<h2 className='font-display font-bold text-4xl sm:text-5xl leading-tight mt-4'>
						{t.titleA}
						<br />
						{t.titleB && `${t.titleB} `}
						<span className='text-gradient-gold'>{t.titleGradient}</span>
					</h2>
					<p className='text-cream/60 text-lg mt-6'>{t.lead}</p>
				</div>
				<div className='relative mt-16'>
					<div className='hidden md:block absolute top-[46px] left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent' />
					<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-6 md:gap-3'>
						{t.items.map((item, i) => {
							const isLast = i === t.items.length - 1;
							const Icon = icons[i];
							return (
								<article key={item.name} className='reveal text-center'>
									{isLast ? (
										<div className='mx-auto w-14 h-14 rounded-full relative z-10 gold-glow'>
											<Image
												src='/images/landing/klc-logo.png'
												alt='KalyChain logo'
												width={56}
												height={56}
												className='rounded-full'
											/>
										</div>
									) : (
										<div
											className={`mx-auto grid place-items-center w-14 h-14 rounded-full border-2 ${i === 0 ? 'border-gold' : 'border-gold/70'} bg-ink relative z-10`}
										>
											<Icon className='text-gold' size={22} />
										</div>
									)}
									<div className={`font-display text-sm font-bold mt-4 ${isLast ? 'text-goldbright' : 'text-gold'}`}>
										{item.era}
									</div>
									<div className='font-display font-semibold mt-1 text-sm'>{item.name}</div>
									<p className={`text-xs mt-2 leading-relaxed ${isLast ? 'text-cream/70' : 'text-cream/55'}`}>
										{item.body}
									</p>
								</article>
							);
						})}
					</div>
				</div>
				<p className='text-center font-serif-k text-lg text-cream/55 mt-14 max-w-2xl mx-auto reveal'>
					{t.quoteA} <span className='text-gold'>{t.quoteB}</span>
				</p>
			</div>
		</section>
	);
}
