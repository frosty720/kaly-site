import { Check, X } from 'lucide-react';
import type { Dictionary } from '@/i18n';
import { claims } from '@/lib/claims';

type Cell = string | boolean;

interface BenchmarkRow {
	labelKey: keyof Dictionary['benchmark']['rows'];
	kaly: Cell;
	kalyExtra?: 'violet' | 'gold' | 'green';
	others: Cell[];
}

const competitors = ['Ethereum', 'Solana', 'Polygon', 'Avalanche', 'Cardano'];

const rows: BenchmarkRow[] = [
	{ labelKey: 'tps', kaly: claims.benchmark.tps, others: ['~15', '65,000', '7,000', '4,500', '250'] },
	{ labelKey: 'finality', kaly: claims.benchmark.finality, others: ['13 min', '0.4s', '2s', '1s', '20 min'] },
	{ labelKey: 'gasFees', kaly: claims.benchmark.gasFees, others: ['$2–50', '<$0.01', '$0.01–1', '$0.50', '$0.20'] },
	{ labelKey: 'evm', kaly: true, others: [true, false, true, true, false] },
	{ labelKey: 'mobileMoney', kaly: true, others: [false, false, false, false, false] },
	{ labelKey: 'aiAgents', kaly: '150', kalyExtra: 'violet', others: [false, false, false, false, false] },
	{ labelKey: 'fintechStack', kaly: 'KALYSSI', kalyExtra: 'gold', others: [false, false, false, false, false] },
	{ labelKey: 'carbonNeutral', kaly: true, kalyExtra: 'green', others: [true, false, true, true, true] },
];

function OtherCell({ value }: { value: Cell }) {
	if (typeof value === 'string') {
		return <td className='px-3 py-4 text-center text-cream/60'>{value}</td>;
	}
	return (
		<td className='px-3 py-4 text-center'>
			{value ? (
				<Check className='inline text-cream/40' size={16} />
			) : (
				<X className='inline text-cream/25' size={16} />
			)}
		</td>
	);
}

function KalyCell({ row }: { row: BenchmarkRow }) {
	if (typeof row.kaly === 'boolean') {
		return (
			<td className='px-3 py-4 text-center bg-gold/[0.04]'>
				<Check className={`inline ${row.kalyExtra === 'green' ? 'text-green-400' : 'text-gold'}`} size={16} />
			</td>
		);
	}
	if (row.kalyExtra === 'violet' || row.kalyExtra === 'gold') {
		return (
			<td className='px-3 py-4 text-center bg-gold/[0.04]'>
				<span
					className={`inline-flex items-center gap-1 font-semibold ${row.kalyExtra === 'violet' ? 'text-violet' : 'text-gold'}`}
				>
					<Check size={14} /> {row.kaly}
				</span>
			</td>
		);
	}
	return <td className='px-3 py-4 text-center font-semibold text-gold bg-gold/[0.04]'>{row.kaly}</td>;
}

export function Benchmark({ t }: { t: Dictionary['benchmark'] }) {
	return (
		<section className='relative py-20 md:py-24 border-t hairline'>
			<div className='mx-auto max-w-[1200px] px-6'>
				<div className='text-center max-w-3xl mx-auto reveal'>
					<span className='text-xs font-display tracking-[0.2em] text-gold/70'>{t.kicker}</span>
					<h2 className='font-display font-bold text-4xl sm:text-5xl leading-tight mt-4'>
						{t.titleA}
						<br />
						{t.titleB} <span className='text-gradient-gold'>{t.titleGradient}</span>
					</h2>
					<p className='text-cream/60 text-lg mt-6'>{t.lead}</p>
				</div>
				<div className='mt-14 overflow-x-auto rounded-2xl border hairline bg-surface reveal'>
					<table className='w-full text-sm min-w-[720px]'>
						<thead>
							<tr className='border-b hairline'>
								<th className='text-left font-display font-medium text-cream/50 px-5 py-5 w-[18%]' />
								<th className='px-3 py-5 text-center bg-gradient-to-b from-gold/15 to-transparent'>
									<div className='font-display font-bold text-gold text-base'>KalyChain</div>
								</th>
								{competitors.map((name) => (
									<th key={name} className='px-3 py-5 text-center font-display font-medium text-cream/60'>
										{name}
									</th>
								))}
							</tr>
						</thead>
						<tbody className='divide-y divide-white/5'>
							{rows.map((row) => (
								<tr key={row.labelKey}>
									<td className='px-5 py-4 text-cream/55 font-display'>{t.rows[row.labelKey]}</td>
									<KalyCell row={row} />
									{row.others.map((value, i) => (
										<OtherCell key={competitors[i]} value={value} />
									))}
								</tr>
							))}
						</tbody>
					</table>
				</div>
				<p className='text-center font-serif-k text-lg text-cream/55 mt-8 max-w-3xl mx-auto reveal'>
					{t.footnoteA} <span className='text-gold'>{t.footnoteB}</span>
				</p>
				<p className='text-center text-[11px] text-cream/30 mt-4 reveal'>{t.disclaimer}</p>
			</div>
		</section>
	);
}
