import type { Dictionary, Locale } from '@/i18n';
import { whitepaperPath } from '@/i18n';
import { links } from '@/config/links';
import { Logo } from './logo';
import { navAnchors } from './nav-anchors';
import { DiscordIcon, GithubIcon, TelegramIcon, XIcon } from './social-icons';

interface FooterProps {
	t: Dictionary['footer'];
	nav: Dictionary['nav'];
	locale: Locale;
}

/** The design's footer anchors stop at governance. */
const footerAnchors = navAnchors.filter(({ key }) => key !== 'roadmap');

export function Footer({ t, nav, locale }: FooterProps) {
	const externalLinks = [
		{ label: t.docs, href: links.ecosystem.docs },
		{ label: t.whitepaper, href: whitepaperPath(locale) },
		{ label: 'KalySwap', href: links.ecosystem.dexApp },
		{ label: 'Kaly Vaults', href: links.ecosystem.vaults },
		{ label: 'Bridge', href: links.ecosystem.bridge },
		{ label: 'KalyDAO', href: links.ecosystem.dao },
		{ label: 'KalyPay', href: links.ecosystem.kalypay },
		{ label: 'KalyScan', href: links.ecosystem.explorer },
		{ label: 'KalyRails', href: links.ecosystem.rails },
	];
	const socials = [
		{ label: 'Discord', href: links.social.discord, icon: DiscordIcon },
		{ label: 'X (Twitter)', href: links.social.twitter, icon: XIcon },
		{ label: 'Telegram', href: links.social.telegram, icon: TelegramIcon },
		{ label: 'GitHub', href: links.social.github, icon: GithubIcon },
	];

	return (
		<footer className='border-t border-white/5 py-12'>
			<div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
				<div className='flex flex-col md:flex-row items-center justify-between gap-6'>
					<div className='flex flex-wrap items-center justify-center gap-2'>
						<Logo size={28} textClassName='text-sm' />
						<span className='text-xs text-zinc-400 ml-1'>{t.tagline}</span>
					</div>
					<nav className='flex flex-wrap items-center justify-center gap-x-5 gap-y-2'>
						{footerAnchors.map(({ key, href }) => (
							<a key={key} href={href} className='text-xs text-zinc-400 hover:text-white transition-colors'>
								{nav[key]}
							</a>
						))}
					</nav>
				</div>
				<div className='mt-8 flex flex-col md:flex-row items-center justify-between gap-4'>
					<nav className='flex flex-wrap items-center justify-center gap-x-5 gap-y-2'>
						{externalLinks.map(({ label, href }) => (
							<a
								key={label}
								href={href}
								target='_blank'
								rel='noopener noreferrer'
								className='text-xs text-zinc-400 hover:text-white transition-colors'
							>
								{label}
							</a>
						))}
					</nav>
					<div className='flex items-center gap-4'>
						{socials.map(({ label, href, icon: Icon }) => (
							<a
								key={label}
								href={href}
								target='_blank'
								rel='noopener noreferrer'
								aria-label={label}
								className='text-zinc-400 hover:text-gold transition-colors'
							>
								<Icon className='h-4 w-4' />
							</a>
						))}
					</div>
				</div>
				<div className='mt-8 text-center text-xs text-zinc-400'>{t.copyright}</div>
			</div>
		</footer>
	);
}
