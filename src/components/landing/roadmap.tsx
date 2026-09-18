import type { Dictionary } from '@/i18n';
import { claims } from '@/lib/claims';
import { SectionHeader } from './section-header';

const progressValues = [
	claims.roadmap.v4Progress,
	claims.roadmap.v5Progress,
	claims.roadmap.v6Progress,
	claims.roadmap.v7Progress,
];

export function Roadmap({ t }: { t: Dictionary['roadmap'] }) {
	return (
		<section id='roadmap' className='relative py-20 sm:py-28 bg-glow-gold'>
			<div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
				<SectionHeader kicker={t.kicker} title={t.title} lead={t.lead} />
				<div className='mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 reveal'>
					{t.phases.map((phase, i) => (
						<div key={phase.version} className='glass-card rounded-2xl p-7'>
							<div className='flex items-baseline justify-between mb-1'>
								<span className='font-display text-2xl font-bold text-gold'>{phase.version}</span>
								<span className='text-xs text-blue-500 font-medium'>{progressValues[i]}%</span>
							</div>
							<div className='text-xs text-zinc-400 mb-3'>{phase.period}</div>
							<div className='h-1.5 w-full rounded-full bg-white/10 overflow-hidden mb-5'>
								<div className='h-full rounded-full bg-gold' style={{ width: `${progressValues[i]}%` }} />
							</div>
							<ul className='space-y-2 mb-5'>
								{phase.items.map((item) => (
									<li key={item} className='flex items-start gap-2 text-sm text-zinc-400'>
										<span className='mt-1.5 h-1.5 w-1.5 rounded-full bg-gold shrink-0' />
										{item}
									</li>
								))}
							</ul>
							<div className='text-sm font-semibold text-white/80'>{phase.target}</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
