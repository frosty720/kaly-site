import { BookOpen } from 'lucide-react';
import type { Locale } from '@/i18n';
import { whitepaperPath } from '@/i18n';

export function FloatButton({ label, locale }: { label: string; locale: Locale }) {
	return (
		<a
			href={whitepaperPath(locale)}
			target='_blank'
			rel='noopener noreferrer'
			className='fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-goldbright to-gold px-5 py-3 text-sm font-display font-semibold text-ink gold-glow hover:scale-[1.03] transition'
		>
			<BookOpen size={16} />
			{label}
		</a>
	);
}
