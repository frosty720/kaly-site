import { Check, Feather, Flag, Globe, Handshake, Leaf, Sprout, TreePine, Zap } from 'lucide-react';
import type { Dictionary } from '@/i18n';
import { claims } from '@/lib/claims';

const statIcons = [Zap, Globe, Feather, Sprout];
const statValues = [
	claims.sustainability.energySavings,
	claims.sustainability.offset,
	claims.sustainability.kwhPerTx,
	claims.sustainability.feesToGreenFund,
];
const commitIcons = [Check, Handshake, TreePine];

export function Sustainability({ t }: { t: Dictionary['sustainability'] }) {
	return (
		<section className='relative py-20 md:py-24 border-t hairline overflow-hidden'>
			<div className='absolute inset-0 bg-gradient-to-b from-green-500/[0.04] to-transparent pointer-events-none' />
			<div className='relative mx-auto max-w-[1200px] px-6'>
				<div className='text-center max-w-3xl mx-auto reveal'>
					<span className='inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-4 py-1.5 text-xs font-display tracking-wide text-green-400'>
						<Leaf size={12} />
						{t.badge}
					</span>
					<h2 className='font-display font-bold text-4xl sm:text-5xl leading-tight mt-6'>
						{t.titleA} <span className='text-gradient-gold'>{t.titleGradient}</span>
					</h2>
					<p className='text-cream/60 text-lg mt-6'>{t.lead}</p>
				</div>
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mt-16 items-start'>
					<div className='reveal grid grid-cols-1 sm:grid-cols-2 gap-4'>
						{t.stats.map((stat, i) => {
							const Icon = statIcons[i];
							const isKwh = i === 2;
							return (
								<div key={stat.label} className='rounded-2xl border hairline bg-surface p-7 card-hover'>
									<div className='grid place-items-center w-12 h-12 rounded-xl bg-green-500/10 mb-4'>
										<Icon className='text-green-400' size={22} />
									</div>
									<div className='font-display text-4xl font-bold text-green-400'>
										{statValues[i]}
										{isKwh && <span className='text-lg'>kWh</span>}
									</div>
									<div className='text-sm text-cream/55 mt-2'>{stat.label}</div>
								</div>
							);
						})}
					</div>
					<div className='reveal'>
						<div className='rounded-2xl border hairline bg-surfacealt p-8'>
							<h3 className='font-display font-semibold text-2xl'>{t.commitTitle}</h3>
							<ul className='mt-6 space-y-5'>
								{t.commitments.map((item, i) => {
									const Icon = commitIcons[i];
									return (
										<li key={item.title} className='flex items-start gap-4'>
											<span className='grid place-items-center w-9 h-9 rounded-full bg-green-500/10 text-green-400 shrink-0'>
												<Icon size={16} />
											</span>
											<div>
												<div className='font-display font-medium text-cream'>
													{item.title}{' '}
													{'badge' in item && item.badge && (
														<span className='text-[10px] px-2 py-0.5 rounded-full bg-gold/15 text-gold align-middle'>
															{item.badge}
														</span>
													)}
												</div>
												<p className='text-sm text-cream/55 mt-1'>{item.body}</p>
											</div>
										</li>
									);
								})}
							</ul>
							<div className='mt-8 pt-6 border-t hairline flex items-center gap-4'>
								<div className='grid place-items-center w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-green-600 text-ink shrink-0'>
									<Flag size={18} />
								</div>
								<div>
									<div className='text-xs text-cream/45 font-display tracking-wide'>{t.goal.kicker}</div>
									<div className='font-display font-semibold text-lg text-cream'>
										{t.goal.textA} <span className='text-green-400'>{t.goal.highlight}</span> {t.goal.textB}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
