import { Check, Circle } from 'lucide-react';
import type { Dictionary } from '@/i18n';
import { claims } from '@/lib/claims';

const progressValues = [
	claims.roadmap.v4Progress,
	claims.roadmap.v5Progress,
	claims.roadmap.v6Progress,
	claims.roadmap.v7Progress,
];
const tvlTargets = [claims.roadmap.v4Tvl, claims.roadmap.v5Tvl, claims.roadmap.v6Tvl, claims.roadmap.v7Tvl];

export function Roadmap({ t }: { t: Dictionary['roadmap'] }) {
	return (
		<section id='roadmap' className='relative py-20 md:py-24 adinkra-grid border-t hairline'>
			<div className='mx-auto max-w-[1200px] px-6'>
				<div className='text-center max-w-3xl mx-auto reveal'>
					<span className='text-xs font-display tracking-[0.2em] text-gold/70'>{t.kicker}</span>
					<h2 className='font-display font-bold text-4xl sm:text-5xl mt-4'>
						{t.titleA} <span className='text-gradient-gold'>{t.titleGradient}</span>
					</h2>
				</div>
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-14'>
					{t.phases.map((phase, i) => {
						const current = i === 0;
						const progress = progressValues[i];
						return (
							<article
								key={phase.version}
								className={`rounded-2xl p-6 reveal ${current ? 'border-2 border-gold/50 bg-surfacealt' : 'border hairline bg-surface'}`}
							>
								<div className='flex items-center justify-between'>
									<span
										className={`font-display font-bold text-2xl ${current ? 'text-gradient-gold' : 'text-cream/80'}`}
									>
										{phase.version}
									</span>
									{current && (
										<span className='text-[10px] font-display px-2 py-1 rounded-full bg-gold/15 text-gold'>
											{t.inProgress}
										</span>
									)}
								</div>
								<div className='text-xs text-cream/45 mt-1'>{phase.period}</div>
								<div className='mt-4'>
									<div className='flex items-center justify-between text-[11px] font-display mb-1.5'>
										<span className='text-cream/50'>{t.progress}</span>
										<span className={`font-semibold ${current ? 'text-gold' : 'text-cream/60'}`}>{progress}%</span>
									</div>
									<div className='h-1.5 rounded-full bg-ink/60 overflow-hidden'>
										<div
											className='h-full rounded-full bg-gradient-to-r from-goldbright to-gold'
											style={{ width: `${progress}%` }}
										/>
									</div>
								</div>
								<ul className={`mt-4 space-y-2 text-sm ${current ? 'text-cream/65' : 'text-cream/65'}`}>
									{phase.items.map((item) => (
										<li key={item} className='flex items-start gap-2'>
											{current ? (
												<Check className='text-gold shrink-0 mt-1' size={13} />
											) : (
												<Circle className='text-gold/40 shrink-0 mt-1.5 fill-current' size={6} />
											)}
											{item}
										</li>
									))}
								</ul>
								<div className='mt-5 pt-4 border-t hairline flex items-center justify-between'>
									<div>
										<span className='font-display text-gold font-bold'>{tvlTargets[i]}</span>{' '}
										<span className='text-xs text-cream/45'>{t.tvlTarget}</span>
									</div>
								</div>
							</article>
						);
					})}
				</div>
			</div>
		</section>
	);
}
