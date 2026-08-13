import { ArrowRight, Check, Hourglass } from 'lucide-react';
import type { Dictionary } from '@/i18n';
import type { LiveStats } from '@/lib/stats';
import { claims } from '@/lib/claims';
import { links } from '@/config/links';

interface GovernanceProps {
	t: Dictionary['governance'];
	live: LiveStats;
}

export function Governance({ t, live }: GovernanceProps) {
	const stats = [
		{ label: t.stats.treasury, value: live.treasuryKlc, unit: t.stats.treasuryUnit },
		{ label: t.stats.votingPower, value: live.votingPowerGklc, unit: t.stats.votingPowerUnit },
		{ label: t.stats.proposals, value: claims.governance.activeProposals, unit: t.stats.proposalsUnit },
		{ label: t.stats.quorum, value: claims.governance.quorum, unit: t.stats.quorumUnit },
	];

	return (
		<section id='governance' className='relative py-20 md:py-24 border-t hairline bg-gradient-to-b from-ink to-surface'>
			<div className='mx-auto max-w-[1200px] px-6'>
				<div className='text-center max-w-3xl mx-auto reveal'>
					<div className='inline-block rounded-full border hairline bg-gold/10 px-5 py-1.5 mb-6'>
						<span className='text-xs font-display font-semibold tracking-[0.15em] text-gold'>{t.badge}</span>
					</div>
					<h2 className='font-display font-bold text-4xl sm:text-5xl leading-tight'>
						{t.titleA} <span className='text-gradient-gold'>{t.titleGradient}</span>
					</h2>
					<p className='font-serif-k text-xl text-cream/70 mt-6 leading-relaxed'>{t.lead}</p>
				</div>
				<div className='grid grid-cols-2 lg:grid-cols-4 gap-5 mt-14 reveal'>
					{stats.map((stat) => (
						<div
							key={stat.label}
							className='rounded-2xl border hairline bg-gradient-to-br from-gold/10 to-surface p-8 text-center'
						>
							<div className='text-[11px] font-display uppercase tracking-widest text-gold/80 mb-3'>
								{stat.label}
							</div>
							<div className='font-display text-4xl font-bold text-gradient-gold'>{stat.value}</div>
							<div className='text-sm text-cream/50 mt-1'>{stat.unit}</div>
						</div>
					))}
				</div>
				<div className='mt-16'>
					<h3 className='font-display font-semibold text-2xl text-center mb-8 reveal'>{t.decisionsTitle}</h3>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-6 reveal'>
						{t.kips.map((kip, i) => {
							const pending = i === t.kips.length - 1;
							return (
								<article key={kip.code} className='rounded-2xl border hairline bg-surface p-7 card-hover'>
									<div className='flex items-center justify-between mb-4'>
										<span className='text-xs font-display uppercase tracking-widest text-gold/80'>{kip.code}</span>
										<span
											className={`rounded-full px-3 py-1 text-[11px] font-display font-semibold ${
												pending ? 'bg-yellow-500/15 text-yellow-400' : 'bg-green-500/15 text-green-400'
											}`}
										>
											{kip.status}
										</span>
									</div>
									<h4 className='font-display font-semibold text-base leading-snug'>{kip.title}</h4>
									<p className='text-cream/55 text-sm mt-3 leading-relaxed'>{kip.body}</p>
									<div className='text-xs text-cream/45 mt-4 flex items-center gap-1.5'>
										{pending ? (
											<Hourglass className='text-yellow-400' size={12} />
										) : (
											<Check className='text-green-400' size={13} />
										)}
										{kip.result}
									</div>
								</article>
							);
						})}
					</div>
				</div>
				<div className='mt-16 rounded-3xl border hairline bg-gradient-to-br from-gold/5 to-surface p-8 md:p-12 reveal'>
					<h3 className='font-display font-semibold text-2xl text-center mb-12'>{t.howTitle}</h3>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
						{t.steps.map((step, i) => (
							<div key={step.title} className='text-center'>
								<div className='mx-auto grid place-items-center w-14 h-14 rounded-full bg-gradient-to-br from-goldbright to-gold text-ink font-display font-bold text-2xl'>
									{i + 1}
								</div>
								<h4 className='font-display font-semibold text-lg text-gold mt-6'>{step.title}</h4>
								<p className='text-cream/60 text-sm mt-3 leading-relaxed'>{step.body}</p>
							</div>
						))}
					</div>
					<div className='text-center mt-12'>
						<a
							href={links.ecosystem.dao}
							target='_blank'
							rel='noopener noreferrer'
							className='inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-goldbright to-gold px-10 py-4 text-base font-display font-bold text-ink gold-glow hover:scale-[1.02] transition'
						>
							{t.cta} <ArrowRight size={18} />
						</a>
						<p className='text-sm text-cream/45 mt-4 font-display'>{t.ctaSub}</p>
					</div>
				</div>
			</div>
		</section>
	);
}
