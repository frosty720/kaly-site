import { Check, Minus } from 'lucide-react';
import type { Dictionary } from '@/i18n';
import { SectionHeader } from './section-header';

type RowKey = keyof Dictionary['benchmark']['rows'];

const networks = ['KalyChain', 'Ethereum', 'Solana', 'Polygon', 'Avalanche', 'Cardano'];

/** Feature support per network, in the same column order as `networks`. */
const featureRows: { key: RowKey; support: boolean[] }[] = [
	{ key: 'evm', support: [true, true, false, true, true, false] },
	{ key: 'mobileMoney', support: [true, false, false, false, false, false] },
	{ key: 'aiAgents', support: [true, false, false, false, false, false] },
	{ key: 'fintechStack', support: [true, false, false, false, false, false] },
	{ key: 'carbonNeutral', support: [true, false, false, false, false, true] },
];

const valueRows: ('tps' | 'finality' | 'gasFees')[] = ['tps', 'finality', 'gasFees'];

function Cell({ column, children }: { column: number; children: React.ReactNode }) {
	return <td className={`p-4 text-center ${column === 0 ? 'bg-gold/5' : ''}`}>{children}</td>;
}

export function Benchmark({ t }: { t: Dictionary['benchmark'] }) {
	return (
		<section id='benchmark' className='relative py-20 sm:py-28'>
			<div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
				<SectionHeader kicker={t.kicker} title={t.title} lead={t.lead} />
				<div className='mt-12 overflow-x-auto reveal'>
					<table className='w-full min-w-[720px] border-collapse text-sm'>
						<thead>
							<tr>
								<th className='p-4' />
								{networks.map((name, i) => (
									<th
										key={name}
										className={`p-4 text-center font-display font-bold ${i === 0 ? 'text-gold' : 'text-white/80'}`}
									>
										{name}
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							{valueRows.map((key) => (
								<tr key={key} className='border-t border-white/5'>
									<td className='p-4 text-left font-medium text-white/70'>{t.rows[key]}</td>
									{t.values[key].map((value, i) => (
										<Cell key={networks[i]} column={i}>
											<span className={i === 0 ? 'font-semibold text-gold' : 'text-zinc-400'}>{value}</span>
										</Cell>
									))}
								</tr>
							))}
							{featureRows.map(({ key, support }) => (
								<tr key={key} className='border-t border-white/5'>
									<td className='p-4 text-left font-medium text-white/70'>{t.rows[key]}</td>
									{support.map((supported, i) => (
										<Cell key={networks[i]} column={i}>
											<div className='flex justify-center'>
												{supported ? (
													<Check
														size={16}
														aria-label='yes'
														className={i === 0 ? 'text-gold' : 'text-blue-500'}
													/>
												) : (
													<Minus size={16} aria-label='no' className='text-zinc-400/40' />
												)}
											</div>
										</Cell>
									))}
								</tr>
							))}
						</tbody>
					</table>
				</div>
				<p className='mt-6 text-center text-xs text-zinc-400'>{t.disclaimer}</p>
			</div>
		</section>
	);
}
