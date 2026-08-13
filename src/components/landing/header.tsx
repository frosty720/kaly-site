'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import type { Dictionary, Locale } from '@/i18n';
import { locales, localePath } from '@/i18n';

interface HeaderProps {
	nav: Dictionary['nav'];
	locale: Locale;
}

const navAnchors = [
	{ key: 'heritage', href: '#heritage' },
	{ key: 'ecosystem', href: '#ecosystem' },
	{ key: 'governance', href: '#governance' },
	{ key: 'developers', href: '#developers' },
	{ key: 'kalybot', href: '#kalybot' },
	{ key: 'roadmap', href: '#roadmap' },
	{ key: 'audiences', href: '#audiences' },
] as const;

function LangSwitcher({ locale, className }: { locale: Locale; className?: string }) {
	return (
		<div className={className}>
			{locales.map((l, i) => (
				<span key={l} className='inline-flex items-center'>
					{i > 0 && <span className='mx-1 text-cream/30'>·</span>}
					{l === locale ? (
						<span className='text-gold uppercase'>{l}</span>
					) : (
						<a href={localePath(l)} className='uppercase hover:text-cream transition'>
							{l}
						</a>
					)}
				</span>
			))}
		</div>
	);
}

export function Header({ nav, locale }: HeaderProps) {
	const [open, setOpen] = useState(false);

	return (
		<header className='fixed top-0 left-0 right-0 z-50 px-4'>
			<nav className='mx-auto max-w-[1200px] mt-4 rounded-3xl lg:rounded-full border hairline bg-ink/70 backdrop-blur-xl px-5 sm:px-6 py-3'>
				<div className='flex items-center justify-between'>
					<a href='#top' className='flex items-center gap-2.5'>
						<Image
							src='/images/landing/klc-logo.png'
							alt='KalyChain logo'
							width={36}
							height={36}
							className='rounded-full'
						/>
						<span className='font-display font-bold text-lg tracking-tight'>KalyChain</span>
					</a>
					<div className='hidden lg:flex items-center gap-7 text-sm text-cream/70 font-display'>
						{navAnchors.map(({ key, href }) => (
							<a key={key} href={href} className='hover:text-gold transition'>
								{nav[key]}
							</a>
						))}
					</div>
					<div className='flex items-center gap-3'>
						<LangSwitcher
							locale={locale}
							className='hidden sm:flex items-center text-xs text-cream/50 font-display'
						/>
						<button
							type='button'
							aria-label='Menu'
							aria-expanded={open}
							onClick={() => setOpen((v) => !v)}
							className='lg:hidden grid place-items-center w-9 h-9 rounded-full border hairline text-cream'
						>
							{open ? <X size={18} /> : <Menu size={18} />}
						</button>
					</div>
				</div>
				{open && (
					<div className='lg:hidden mt-4 pb-2 border-t hairline pt-4 flex flex-col gap-3 text-sm text-cream/70 font-display'>
						{navAnchors.map(({ key, href }) => (
							<a
								key={key}
								href={href}
								onClick={() => setOpen(false)}
								className='hover:text-gold transition'
							>
								{nav[key]}
							</a>
						))}
						<LangSwitcher locale={locale} className='sm:hidden flex items-center text-xs text-cream/50 pt-2' />
					</div>
				)}
			</nav>
		</header>
	);
}
