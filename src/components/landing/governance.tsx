import { Vote } from 'lucide-react';
import type { Dictionary, Locale } from '@/i18n';
import type { LiveStats } from '@/lib/stats';
import { claims } from '@/lib/claims';
import { links } from '@/config/links';
import { localizeDecimal } from '@/lib/format';
import { SectionHeader } from './section-header';

interface GovernanceProps {
	t: Dictionary['governance'];
	live: LiveStats;
	locale: Locale;
}

/** KIP001 and KIP002 passed; KIP003 is still in progress. */
const kipInProgress = [false, false, true];

export function Governance({ t, live, locale }: GovernanceProps) {
	const stats = [
		{ value: `${localizeDecimal(live.treasuryKmt, locale)} KMT`, label: t.stats.treasury },
		{ value: `${localizeDecimal(live.votingPowerGkmt, locale)} gKMT`, label: t.stats.votingPower },
		{ value: claims.governance.activeProposals, label: t.stats.proposals },
		{ value: t.stats.quorumValue, label: t.stats.quorum },
	];

	return (
		<section id='governance' className='relative py-20 sm:py-28'>
			<div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
				<SectionHeader kicker={t.kicker} title={t.title} lead={t.lead} />
				<div className='mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4 reveal'>
					{stats.map((stat) => (
						<div key={stat.label} className='glass-card rounded-2xl p-6 text-center'>
							<div className='font-display text-xl sm:text-2xl font-bold text-gold'>{stat.value}</div>
							<div className='mt-1.5 text-xs text-zinc-400'>{stat.label}</div>
						</div>
					))}
				</div>
				<div className='mt-8 grid gap-6 lg:grid-cols-2 reveal'>
					<div className='glass-card rounded-2xl p-7'>
						<h3 className='font-display text-base font-bold mb-5'>{t.decisionsTitle}</h3>
						<div className='space-y-4'>
							{t.kips.map((kip, i) => (
								<div key={kip.code} className='flex items-start gap-3'>
									<span className='shrink-0 text-xs font-mono text-blue-500 pt-0.5'>{kip.code}</span>
									<div>
										<div className='flex flex-wrap items-center gap-2'>
											<span className='text-sm font-semibold'>{kip.title}</span>
											<span
												className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
													kipInProgress[i] ? 'bg-blue-500/15 text-blue-500' : 'bg-gold-soft text-gold-light'
												}`}
											>
												{kip.status}
											</span>
										</div>
										<p className='text-xs text-zinc-400 mt-1'>{kip.body}</p>
									</div>
								</div>
							))}
						</div>
					</div>
					<div className='glass-card rounded-2xl p-7'>
						<h3 className='font-display text-base font-bold mb-5'>{t.howTitle}</h3>
						<div className='space-y-5'>
							{t.steps.map((step, i) => (
								<div key={step.title} className='flex items-start gap-4'>
									<div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold-soft text-gold font-display font-bold text-sm'>
										{i + 1}
									</div>
									<div>
										<div className='text-sm font-semibold'>{step.title}</div>
										<p className='text-xs text-zinc-400 mt-1'>{step.body}</p>
									</div>
								</div>
							))}
						</div>
						<a
							href={links.ecosystem.dao}
							target='_blank'
							rel='noopener noreferrer'
							className='mt-6 inline-flex items-center gap-2 text-sm text-gold font-medium hover:brightness-110'
						>
							<Vote size={16} />
							{t.daoLink}
						</a>
					</div>
				</div>
			</div>
		</section>
	);
}
