import Image from 'next/image';
import { ArrowRight, Bot, Code, MessagesSquare, Scale, TrendingUp } from 'lucide-react';
import type { Dictionary } from '@/i18n';
import { claims } from '@/lib/claims';

const agentIcons = [Code, MessagesSquare, Scale, TrendingUp];
const statValues = [claims.kalybot.automated, claims.kalybot.faster, claims.kalybot.cheaper];

export function Kalybot({ t }: { t: Dictionary['kalybot'] }) {
	return (
		<section id='kalybot' className='relative py-20 md:py-24 border-t hairline'>
			<div className='mx-auto max-w-[1200px] px-6'>
				<div className='grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center'>
					<div className='lg:col-span-6 reveal'>
						<span className='text-xs font-display tracking-[0.2em] text-violet'>{t.kicker}</span>
						<h2 className='font-display font-bold text-4xl sm:text-5xl mt-4 leading-tight'>
							{t.titleA}
							<br />
							{t.titleB} <span className='text-violet'>{t.titleViolet}</span>
						</h2>
						<p className='font-serif-k text-xl text-cream/75 mt-6'>
							{t.lead}
							<br />
							{t.leadB}
						</p>
						<div className='grid grid-cols-3 gap-4 mt-8'>
							{t.stats.map((stat, i) => (
								<div key={stat.label} className='rounded-xl border border-violet/25 bg-surface p-4 text-center'>
									<div className='font-display text-2xl font-bold text-violet'>{statValues[i]}</div>
									<div className='text-[11px] text-cream/50 mt-1'>{stat.label}</div>
								</div>
							))}
						</div>
						<a
							href='#audiences'
							className='mt-8 inline-flex items-center gap-2 rounded-full bg-violet px-7 py-4 text-base font-display font-semibold text-white hover:bg-violet/90 transition violet-glow'
						>
							{t.cta} <ArrowRight size={18} />
						</a>
					</div>
					<div className='lg:col-span-6 reveal'>
						<div className='relative rounded-3xl border border-violet/30 bg-surface overflow-hidden'>
							<div className='relative w-full h-56'>
								<Image
									src='/images/landing/ai-network.webp'
									alt='KalyBot AI agent network'
									fill
									sizes='(min-width: 1024px) 50vw, 100vw'
									className='object-cover opacity-90'
								/>
							</div>
							<div className='p-6 space-y-3'>
								{t.agents.map((agent, i) => {
									const Icon = agentIcons[i];
									return (
										<div key={agent.name} className='flex items-center gap-3 rounded-xl border hairline bg-ink/60 p-3'>
											<Icon className='text-violet shrink-0' size={18} />
											<div className='flex-1'>
												<div className='text-sm font-display font-medium'>{agent.name}</div>
												<div className='text-[11px] text-cream/45'>{agent.desc}</div>
											</div>
											<span className='text-[10px] text-green-400 flex items-center gap-1'>
												<span className='w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse' />
												{t.active}
											</span>
										</div>
									);
								})}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
