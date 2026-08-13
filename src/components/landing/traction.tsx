import { Boxes, ExternalLink, Network, Quote, Vault } from 'lucide-react';
import type { Dictionary } from '@/i18n';
import type { LiveStats } from '@/lib/stats';
import { links } from '@/config/links';
import { BlockTicker } from './block-ticker';

interface TractionProps {
	t: Dictionary['traction'];
	live: LiveStats;
}

const liveProducts = [
	{ name: 'KalySwap DEX', href: links.ecosystem.dexApp },
	{ name: 'Kaly Vaults', href: links.ecosystem.vaults },
	{ name: 'KUSD Stablecoin', href: links.ecosystem.explorer },
	{ name: 'Hyperlane Bridge', href: links.ecosystem.bridge },
	{ name: 'KalyDAO', href: links.ecosystem.dao },
	{ name: 'KalyPay', href: links.ecosystem.kalypay },
];

function StatPanel({
	icon: Icon,
	title,
	children,
}: {
	icon: typeof Network;
	title: string;
	children: React.ReactNode;
}) {
	return (
		<div className='rounded-2xl border hairline bg-surface overflow-hidden'>
			<div className='flex items-center gap-2 px-6 py-4 border-b hairline'>
				<Icon className='text-gold' size={17} />
				<span className='font-display font-semibold text-sm tracking-wide'>{title}</span>
			</div>
			<div className='divide-y divide-white/5'>{children}</div>
		</div>
	);
}

function StatRow({
	label,
	value,
	accent,
}: {
	label: string;
	value: React.ReactNode;
	accent?: string;
}) {
	return (
		<div className='flex items-center justify-between px-6 py-3.5'>
			<span className='text-sm text-cream/55'>{label}</span>
			<span className={`font-display font-semibold ${accent ?? 'text-cream'}`}>{value}</span>
		</div>
	);
}

export function Traction({ t, live }: TractionProps) {
	const topStats = [
		{ label: t.topStats.blocks, value: live.totalBlocks },
		{ label: t.topStats.transactions, value: live.totalTransactions },
		{ label: t.topStats.addresses, value: live.totalAddresses },
		{ label: t.topStats.years, value: live.yearsLive },
		{ label: t.topStats.blockTime, value: live.avgBlockTime },
	];

	return (
		<section className='relative py-20 md:py-24 border-t hairline'>
			<div className='mx-auto max-w-[1200px] px-6'>
				<div className='text-center reveal'>
					<span className='text-xs font-display tracking-[0.2em] text-gold/70'>{t.kicker}</span>
					<h2 className='font-display font-bold text-4xl sm:text-5xl mt-4'>
						{t.titleA} <span className='text-gradient-gold'>{t.titleGradient}</span>
					</h2>
				</div>
				<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-12 reveal'>
					{topStats.map((stat) => (
						<div key={stat.label} className='rounded-2xl border hairline bg-surface p-6 text-center'>
							<div className='font-display text-3xl font-bold text-gradient-gold'>{stat.value}</div>
							<div className='text-xs text-cream/50 mt-1'>{stat.label}</div>
						</div>
					))}
				</div>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 reveal'>
					<StatPanel icon={Network} title={t.network.title}>
						<StatRow label={t.network.blockTime} value={live.avgBlockTime} />
						<StatRow label={t.network.latestBlock} value={<BlockTicker initial={live.latestBlockNumber} />} />
						<StatRow label={t.network.gasPrice} value={live.gasPrice} accent='text-green-400' />
						<StatRow label={t.network.txToday} value={live.transactionsToday} />
					</StatPanel>
					<StatPanel icon={Vault} title={t.vaults.title}>
						<StatRow label={t.vaults.minted} value={live.vaultsMinted} />
						<StatRow label={t.vaults.positions} value={live.polPositions} />
						<StatRow label={t.vaults.reserve} value={live.polReserve} />
						<StatRow label={t.vaults.klcPrice} value={live.klcPrice} accent='text-green-400' />
					</StatPanel>
					<StatPanel icon={Boxes} title={t.projects.title}>
						{liveProducts.map((product) => (
							<a
								key={product.name}
								href={product.href}
								target='_blank'
								rel='noopener noreferrer'
								className='group flex items-center justify-between px-6 py-2.5 hover:bg-gold/[0.04] transition'
							>
								<span className='text-sm text-cream/55 group-hover:text-gold transition inline-flex items-center gap-1.5'>
									{product.name}
									<ExternalLink size={11} className='text-cream/25 group-hover:text-gold/60' />
								</span>
								<span className='text-[10px] font-display text-green-400 flex items-center gap-1.5'>
									<span className='w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse' />
									{t.projects.live}
								</span>
							</a>
						))}
					</StatPanel>
				</div>
				<p className='text-center text-[11px] text-cream/30 mt-6 reveal'>{t.liveNote}</p>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-8'>
					{t.testimonials.map((item) => (
						<article key={item.initials} className='rounded-2xl border hairline bg-surface p-7 reveal'>
							<Quote className='text-gold/40' size={24} />
							<p className='text-cream/75 mt-3 leading-relaxed'>{item.quote}</p>
							<div className='flex items-center gap-3 mt-5'>
								<div className='grid place-items-center w-10 h-10 rounded-full bg-gold/15 text-gold font-display font-bold'>
									{item.initials}
								</div>
								<div>
									<div className='text-sm font-display font-medium'>{item.role}</div>
									<div className='text-xs text-cream/45'>{item.location}</div>
								</div>
							</div>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}
