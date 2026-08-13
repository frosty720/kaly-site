import { Book, Check, GitBranch, Headset, Layers, Terminal } from 'lucide-react';
import type { Dictionary } from '@/i18n';
import { links } from '@/config/links';

const sdkChips = ['JS / TS', 'Python', 'Rust', 'Go'];

function ChecklistCard({
	icon: Icon,
	title,
	items,
}: {
	icon: typeof Book;
	title: string;
	items: readonly string[];
}) {
	return (
		<article className='rounded-2xl border hairline bg-surface p-7 card-hover reveal'>
			<div className='grid place-items-center w-12 h-12 rounded-xl bg-gold/10'>
				<Icon className='text-gold' size={22} />
			</div>
			<h3 className='font-display font-semibold text-lg mt-5'>{title}</h3>
			<ul className='mt-4 space-y-2 text-cream/55 text-sm'>
				{items.map((item) => (
					<li key={item} className='flex items-start gap-2'>
						<Check className='text-gold shrink-0 mt-1' size={13} />
						{item}
					</li>
				))}
			</ul>
		</article>
	);
}

export function Developers({ t }: { t: Dictionary['developers'] }) {
	return (
		<section id='developers' className='relative py-20 md:py-24 border-t hairline'>
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
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-14'>
					<ChecklistCard icon={GitBranch} title={t.openSource.title} items={t.openSource.items} />
					<ChecklistCard icon={Book} title={t.docs.title} items={t.docs.items} />
					<article className='rounded-2xl border hairline bg-surface p-7 card-hover reveal'>
						<div className='grid place-items-center w-12 h-12 rounded-xl bg-gold/10'>
							<Layers className='text-gold' size={22} />
						</div>
						<h3 className='font-display font-semibold text-lg mt-5'>{t.sdks.title}</h3>
						<div className='mt-4 flex flex-wrap gap-2'>
							{sdkChips.map((chip) => (
								<span
									key={chip}
									className='inline-flex items-center gap-1.5 rounded-full border hairline px-3 py-1 text-xs text-cream/70'
								>
									{chip}
								</span>
							))}
						</div>
					</article>
					<ChecklistCard icon={Headset} title={t.support.title} items={t.support.items} />
				</div>
				<div className='mt-10 flex justify-center reveal'>
					<a
						href={links.ecosystem.docs}
						target='_blank'
						rel='noopener noreferrer'
						className='group inline-flex items-center gap-2 rounded-full border hairline bg-ink/40 px-7 py-3.5 text-sm font-display font-semibold text-cream hover:border-gold/60 hover:text-gold transition'
					>
						<Terminal className='text-gold' size={16} />
						{t.cta} <span className='text-cream/40 group-hover:text-gold/70'>{t.ctaSuffix}</span>
					</a>
				</div>
			</div>
		</section>
	);
}
