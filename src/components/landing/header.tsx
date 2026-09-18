'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import type { Dictionary, Locale } from '@/i18n';
import { locales, localePath } from '@/i18n';
import { Logo } from './logo';
import { navAnchors } from './nav-anchors';

interface HeaderProps {
	nav: Dictionary['nav'];
	locale: Locale;
}

function LangSwitcher({ locale, className }: { locale: Locale; className?: string }) {
	return (
		<div className={className}>
			{locales.map((l, i) => (
				<span key={l} className='inline-flex items-center'>
					{i > 0 && <span className='mx-1 text-white/30'>·</span>}
					{l === locale ? (
						<span className='text-gold uppercase'>{l}</span>
					) : (
						<a href={localePath(l)} className='uppercase hover:text-white transition-colors'>
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
		<nav className='fixed top-0 left-0 right-0 z-50'>
			<div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4'>
				<div className='rounded-3xl lg:rounded-full border border-white/10 bg-[#0a0a14]/80 backdrop-blur-md px-6 py-3'>
					<div className='flex items-center justify-between'>
						<a href='#top' className='flex items-center gap-2'>
							<Logo size={32} textClassName='text-lg' />
						</a>
						<div className='hidden lg:flex items-center gap-1'>
							{navAnchors.map(({ key, href }) => (
								<a
									key={key}
									href={href}
									className='px-3 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors rounded-lg hover:bg-white/5'
								>
									{nav[key]}
								</a>
							))}
						</div>
						<div className='flex items-center gap-4'>
							<LangSwitcher
								locale={locale}
								className='hidden sm:flex items-center text-xs font-medium text-white/50'
							/>
							<a
								href='#ecosystem'
								className='hidden md:inline-flex items-center px-5 py-2 rounded-full text-sm font-semibold bg-gold-gradient text-on-gold hover:brightness-110 transition-all'
							>
								{nav.cta}
							</a>
							<button
								type='button'
								aria-label={nav.menu}
								aria-expanded={open}
								onClick={() => setOpen((v) => !v)}
								className='lg:hidden p-2 text-white/70 hover:text-white'
							>
								{open ? <X size={20} /> : <Menu size={20} />}
							</button>
						</div>
					</div>
					{open && (
						<div className='lg:hidden mt-3 pt-3 pb-1 border-t border-white/10 flex flex-col gap-1'>
							{navAnchors.map(({ key, href }) => (
								<a
									key={key}
									href={href}
									onClick={() => setOpen(false)}
									className='px-3 py-2 text-sm font-medium text-white/70 hover:text-white rounded-lg hover:bg-white/5'
								>
									{nav[key]}
								</a>
							))}
							<LangSwitcher
								locale={locale}
								className='sm:hidden flex items-center px-3 pt-2 text-xs font-medium text-white/50'
							/>
						</div>
					)}
				</div>
			</div>
		</nav>
	);
}
