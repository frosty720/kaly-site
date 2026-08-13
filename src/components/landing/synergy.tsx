import { Bot, ChevronDown, ChevronRight } from 'lucide-react';
import type { Dictionary } from '@/i18n';

function CascadeCard({
	tag,
	title,
	items,
}: {
	tag: string;
	title: string;
	items: readonly string[];
}) {
	return (
		<div className='h-full rounded-2xl border hairline bg-surface p-8'>
			<span className='text-xs font-display tracking-widest text-gold'>{tag}</span>
			<h3 className='font-display font-semibold text-xl mt-3'>{title}</h3>
			<div className='mt-5 space-y-3 text-sm text-cream/60'>
				{items.map((item, i) => (
					<div key={item} className='flex items-center gap-2' style={{ paddingLeft: `${i}rem` }}>
						{i === 0 ? (
							<ChevronRight className='text-gold shrink-0' size={16} />
						) : (
							<ChevronDown className='text-gold/50 shrink-0' size={16} />
						)}
						{item}
					</div>
				))}
			</div>
		</div>
	);
}

export function Synergy({ t }: { t: Dictionary['synergy'] }) {
	return (
		<section className='relative py-20 md:py-24 kente-pattern border-t hairline'>
			<div className='mx-auto max-w-[1200px] px-6'>
				<div className='text-center max-w-3xl mx-auto reveal'>
					<span className='text-xs font-display tracking-[0.2em] text-gold/70'>{t.kicker}</span>
					<h2 className='font-display font-bold text-4xl sm:text-5xl mt-4'>
						{t.titleA}
						<br />
						<span className='text-gradient-gold'>{t.titleGradient}</span>
					</h2>
				</div>
				<div className='grid grid-cols-1 lg:grid-cols-12 gap-6 mt-14 items-stretch'>
					<div className='lg:col-span-4 reveal'>
						<CascadeCard tag={t.left.tag} title={t.left.title} items={t.left.items} />
					</div>
					<div className='lg:col-span-4 reveal flex flex-col items-center justify-center text-center'>
						<div className='grid place-items-center w-24 h-24 rounded-full bg-gradient-to-br from-violet to-violet/60 violet-glow'>
							<Bot className='text-white' size={36} />
						</div>
						<div className='font-display font-bold text-xl mt-4'>{t.center.title}</div>
						<p className='text-cream/55 text-sm mt-2 max-w-xs'>
							{t.center.bodyA} <span className='text-gold'>KUSD</span> {t.center.bodyB}
						</p>
						<p className='font-serif-k text-cream/70 text-lg mt-6'>{t.center.quote}</p>
					</div>
					<div className='lg:col-span-4 reveal'>
						<CascadeCard tag={t.right.tag} title={t.right.title} items={t.right.items} />
					</div>
				</div>
			</div>
		</section>
	);
}
