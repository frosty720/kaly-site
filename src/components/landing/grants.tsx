import { BadgeDollarSign, BugOff, CalendarDays, Star, Trophy } from 'lucide-react';
import type { Dictionary } from '@/i18n';
import { claims } from '@/lib/claims';
import { links } from '@/config/links';

export function Grants({ t }: { t: Dictionary['grants'] }) {
	return (
		<section className='relative py-20 md:py-24 border-t hairline overflow-hidden'>
			<div className='absolute inset-0 kente-pattern opacity-40' />
			<div className='relative mx-auto max-w-[1200px] px-6'>
				<div className='text-center max-w-3xl mx-auto reveal'>
					<span className='text-xs font-display tracking-[0.2em] text-gold/70'>{t.kicker}</span>
					<h2 className='font-display font-bold text-4xl sm:text-5xl leading-tight mt-4'>
						{t.titleA}
						<br />
						{t.titleB} <span className='text-gradient-gold'>{t.titleGradient}</span>
					</h2>
					<p className='text-cream/60 text-lg mt-6'>{t.lead}</p>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-14'>
					<article className='rounded-2xl border hairline bg-surface p-8 card-hover reveal flex flex-col'>
						<div className='flex items-center justify-between'>
							<div className='grid place-items-center w-12 h-12 rounded-xl bg-gold/10'>
								<BadgeDollarSign className='text-gold' size={22} />
							</div>
							<span className='font-display font-bold text-2xl text-gradient-gold'>{claims.grants.grantMax}</span>
						</div>
						<h3 className='font-display font-semibold text-xl mt-6'>{t.grantCard.title}</h3>
						<p className='text-cream/55 text-sm mt-3 flex-1'>{t.grantCard.body}</p>
						<div className='mt-5 flex flex-wrap gap-2'>
							{t.grantCard.tags.map((tag) => (
								<span key={tag} className='rounded-full border hairline px-3 py-1 text-[11px] text-cream/60'>
									{tag}
								</span>
							))}
						</div>
						<a
							href={links.ecosystem.docs}
							target='_blank'
							rel='noopener noreferrer'
							className='mt-6 text-center rounded-full bg-gradient-to-r from-goldbright to-gold px-6 py-3 text-sm font-display font-semibold text-ink hover:scale-[1.02] transition'
						>
							{t.grantCard.cta}
						</a>
					</article>
					<article className='rounded-2xl border hairline bg-surface p-8 card-hover reveal flex flex-col'>
						<div className='flex items-center justify-between'>
							<div className='grid place-items-center w-12 h-12 rounded-xl bg-gold/10'>
								<Trophy className='text-gold' size={22} />
							</div>
							<span className='font-display font-bold text-2xl text-gradient-gold'>
								{claims.grants.hackathonPrize}
							</span>
						</div>
						<h3 className='font-display font-semibold text-xl mt-6'>{t.hackathonCard.title}</h3>
						<p className='text-cream/55 text-sm mt-3 flex-1'>{t.hackathonCard.body}</p>
						<div className='mt-5 flex items-center gap-2 text-xs text-cream/50'>
							<CalendarDays className='text-gold' size={14} />
							{t.hackathonCard.next}{' '}
							<span className='text-gold font-display'>{t.hackathonCard.nextValue}</span>
						</div>
						<a
							href={links.ecosystem.docs}
							target='_blank'
							rel='noopener noreferrer'
							className='mt-6 text-center rounded-full border hairline px-6 py-3 text-sm font-display font-semibold text-cream hover:border-gold/60 hover:text-gold transition'
						>
							{t.hackathonCard.cta}
						</a>
					</article>
					<article className='rounded-2xl border hairline bg-surface p-8 card-hover reveal flex flex-col'>
						<div className='flex items-center justify-between'>
							<div className='grid place-items-center w-12 h-12 rounded-xl bg-gold/10'>
								<BugOff className='text-gold' size={22} />
							</div>
							<span className='font-display font-bold text-2xl text-gradient-gold'>
								{claims.grants.bugBountyMax}
							</span>
						</div>
						<h3 className='font-display font-semibold text-xl mt-6'>{t.bountyCard.title}</h3>
						<p className='text-cream/55 text-sm mt-3 flex-1'>{t.bountyCard.body}</p>
						<div className='mt-5 flex items-center gap-2 text-xs text-cream/50'>
							<span className='w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse' />
							{t.bountyCard.active}
						</div>
						<a
							href={links.ecosystem.docs}
							target='_blank'
							rel='noopener noreferrer'
							className='mt-6 text-center rounded-full border hairline px-6 py-3 text-sm font-display font-semibold text-cream hover:border-gold/60 hover:text-gold transition'
						>
							{t.bountyCard.cta}
						</a>
					</article>
				</div>
				<div className='mt-8 rounded-3xl border hairline bg-gradient-to-br from-gold/5 to-surface p-8 reveal'>
					<div className='flex items-start gap-6'>
						<div className='grid place-items-center w-14 h-14 rounded-2xl bg-gold/10 shrink-0'>
							<Star className='text-gold' size={22} />
						</div>
						<div className='flex-1'>
							<div className='flex items-center gap-3 mb-2'>
								<span className='text-[11px] font-display tracking-widest text-gold/70'>{t.story.kicker}</span>
								<span className='text-[10px] px-2 py-0.5 rounded-full bg-gold/15 text-gold font-display'>
									{t.story.badge}
								</span>
							</div>
							<p className='font-serif-k text-lg text-cream/80 leading-relaxed'>{t.story.quote}</p>
							<div className='flex items-center gap-3 mt-4'>
								<div className='grid place-items-center w-9 h-9 rounded-full bg-gold/15 text-gold font-display font-bold text-sm'>
									{t.story.initials}
								</div>
								<div>
									<div className='text-sm font-display font-medium'>{t.story.role}</div>
									<div className='text-xs text-cream/45'>{t.story.location}</div>
								</div>
							</div>
						</div>
					</div>
					<p className='text-[11px] text-cream/30 mt-6'>{t.story.disclaimer}</p>
				</div>
			</div>
		</section>
	);
}
