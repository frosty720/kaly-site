import { Banknote, DoorClosed, Hourglass, Unlink } from 'lucide-react';
import type { Dictionary } from '@/i18n';

const icons = [DoorClosed, Banknote, Hourglass, Unlink];

export function Problem({ t }: { t: Dictionary['problem'] }) {
	return (
		<section className='relative py-20 md:py-24 border-t hairline'>
			<div className='mx-auto max-w-[1200px] px-6'>
				<div className='grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start'>
					<div className='lg:col-span-5 reveal'>
						<span className='text-xs font-display tracking-[0.2em] text-gold/70'>{t.kicker}</span>
						<h2 className='font-display font-bold text-4xl sm:text-5xl leading-tight mt-4'>
							{t.titleA}
							<br />
							{t.titleB} <span className='text-gradient-gold'>{t.titleGradient}</span>
						</h2>
						<p className='font-serif-k text-xl text-cream/70 mt-6 leading-relaxed'>{t.lead}</p>
						<p className='text-cream/50 text-base mt-6 leading-relaxed border-l-2 border-gold/40 pl-4'>
							{t.noteA} <span className='text-cream/80'>{t.noteB}</span>
						</p>
					</div>
					<div className='lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5 reveal'>
						{t.cards.map((card, i) => {
							const Icon = icons[i];
							return (
								<article key={card.title} className='rounded-2xl border hairline bg-surface p-6 card-hover'>
									<Icon className='text-gold' size={26} />
									<h3 className='font-display font-semibold text-lg mt-4'>{card.title}</h3>
									<p className='text-cream/55 text-sm mt-2'>{card.body}</p>
								</article>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
}
