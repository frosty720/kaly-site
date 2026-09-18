import { Activity } from 'lucide-react';
import type { Dictionary, Locale } from '@/i18n';
import type { CounterSpec, LiveStats } from '@/lib/stats';
import { formatCounterValue } from '@/lib/format';
import { SectionHeader } from './section-header';

interface TractionProps {
	t: Dictionary['traction'];
	yearsUnit: string;
	live: LiveStats;
	locale: Locale;
}

export function Traction({ t, yearsUnit, live, locale }: TractionProps) {
	const counters = live.heroCounters;
	const tiles: { spec: CounterSpec; label: string; unit?: string }[] = [
		{ spec: counters.blocks, label: t.stats.blocks },
		{ spec: counters.transactions, label: t.stats.transactions },
		{ spec: counters.addresses, label: t.stats.addresses },
		{ spec: counters.years, label: t.stats.years, unit: yearsUnit },
		{ spec: counters.blockTime, label: t.stats.blockTime },
		{ spec: counters.vaults, label: t.stats.vaults },
	];

	return (
		<section id='network' className='relative py-20 sm:py-28'>
			<div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
				<SectionHeader kicker={t.kicker} title={t.title} lead={t.lead} />
				<div className='mt-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 reveal'>
					{tiles.map(({ spec, label, unit }) => (
						<div key={label} className='glass-card rounded-2xl p-6 text-center'>
							<div className='font-display text-2xl sm:text-3xl font-bold text-gold'>
								<span
									data-counter={spec.target}
									data-decimals={spec.decimals}
									data-prefix={spec.prefix}
									data-suffix={spec.suffix}
								>
									{`${spec.prefix}${formatCounterValue(spec.target, spec.decimals, locale)}${spec.suffix}`}
								</span>
								{unit && ` ${unit}`}
							</div>
							<div className='mt-2 text-xs text-zinc-400 leading-snug'>{label}</div>
						</div>
					))}
				</div>
				<p className='mt-6 flex items-center justify-center gap-2 text-xs text-zinc-400'>
					<Activity size={14} className='text-blue-500' />
					{t.note}
				</p>
			</div>
		</section>
	);
}
