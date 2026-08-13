import Image from 'next/image';
import { ArrowRightLeft, ExternalLink, FileText, Search, Wrench } from 'lucide-react';
import type { Dictionary, Locale } from '@/i18n';
import { whitepaperPath } from '@/i18n';
import { links } from '@/config/links';
import { DiscordIcon, GithubIcon, TelegramIcon, XIcon } from './social-icons';

interface FooterProps {
	t: Dictionary['footer'];
	locale: Locale;
}

export function Footer({ t, locale }: FooterProps) {
	const whitepaper = whitepaperPath(locale);
	const quickCards = [
		{ ...t.quickCards[0], href: whitepaper, icon: FileText },
		{ ...t.quickCards[1], href: links.ecosystem.docs, icon: Wrench },
		{ ...t.quickCards[2], href: links.ecosystem.explorer, icon: Search },
		{ ...t.quickCards[3], href: links.ecosystem.bridge, icon: ArrowRightLeft },
	];
	const socialButtons = [
		{ label: 'Discord', href: links.social.discord, icon: DiscordIcon },
		{ label: 'X (Twitter)', href: links.social.twitter, icon: XIcon },
		{ label: 'Telegram', href: links.social.telegram, icon: TelegramIcon },
		{ label: 'GitHub', href: links.social.github, icon: GithubIcon },
	];
	const ecosystemLinks = [
		{ label: t.columns.ecosystem.links.kalyswap, href: links.ecosystem.dexApp },
		{ label: t.columns.ecosystem.links.vaults, href: links.ecosystem.vaults },
		{ label: t.columns.ecosystem.links.bridge, href: links.ecosystem.bridge },
		{ label: t.columns.ecosystem.links.dao, href: links.ecosystem.dao },
		{ label: t.columns.ecosystem.links.kalypay, href: links.ecosystem.kalypay },
		{ label: t.columns.ecosystem.links.explorer, href: links.ecosystem.explorer },
		{ label: t.columns.ecosystem.links.rails, href: links.ecosystem.rails },
	];
	const resourceLinks = [
		{ label: t.columns.resources.links.docs, href: links.ecosystem.docs },
		{ label: t.columns.resources.links.whitepaper, href: whitepaper },
		{ label: t.columns.resources.links.github, href: links.social.github },
		{ label: t.columns.resources.links.chainlist, href: links.ecosystem.chainlist },
		{ label: t.columns.resources.links.roadmap, href: '#roadmap', internal: true },
	];
	const communityLinks = [
		{ label: t.columns.community.links.discord, href: links.social.discord },
		{ label: t.columns.community.links.twitter, href: links.social.twitter },
		{ label: t.columns.community.links.telegram, href: links.social.telegram },
		{ label: t.columns.community.links.governance, href: links.ecosystem.dao },
	];
	const audienceLinks = [
		t.columns.audiences.links.builders,
		t.columns.audiences.links.institutions,
		t.columns.audiences.links.traders,
		t.columns.audiences.links.community,
	];
	const presence = [
		{ label: t.presence.africa, badge: t.presence.africaBadge, home: true },
		{ label: t.presence.latam, badge: t.presence.latamBadge, home: false },
		{ label: t.presence.asia, badge: t.presence.asiaBadge, home: false },
		{ label: t.presence.europe, badge: t.presence.europeBadge, home: false },
	];

	return (
		<footer className='relative border-t hairline bg-ink pt-16 pb-8'>
			<div className='mx-auto max-w-[1200px] px-6'>
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14'>
					{quickCards.map((card) => (
						<a
							key={card.title}
							href={card.href}
							target='_blank'
							rel='noopener noreferrer'
							className='group flex items-center gap-3 rounded-2xl border hairline bg-surface px-5 py-4 hover:border-gold/50 transition'
						>
							<card.icon className='text-gold shrink-0' size={19} />
							<div>
								<div className='font-display font-semibold text-sm'>{card.title}</div>
								<div className='text-[11px] text-cream/45'>{card.sub}</div>
							</div>
							<ExternalLink className='text-cream/30 ml-auto group-hover:text-gold transition' size={13} />
						</a>
					))}
				</div>
				<div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-8'>
					<div className='col-span-2 lg:col-span-4'>
						<a href='#top' className='flex items-center gap-2.5'>
							<Image
								src='/images/landing/klc-logo.png'
								alt='KalyChain logo'
								width={36}
								height={36}
								className='rounded-full'
							/>
							<span className='font-display font-bold text-lg'>KalyChain</span>
						</a>
						<p className='font-serif-k text-cream/60 mt-4 max-w-xs leading-relaxed'>{t.blurb}</p>
						<div className='flex items-center gap-3 mt-6'>
							{socialButtons.map((social) => (
								<a
									key={social.label}
									href={social.href}
									target='_blank'
									rel='noopener noreferrer'
									aria-label={social.label}
									className='grid place-items-center w-9 h-9 rounded-full border hairline hover:border-gold/60 hover:text-gold transition'
								>
									<social.icon className='w-4 h-4' />
								</a>
							))}
						</div>
					</div>
					<div className='lg:col-span-2'>
						<div className='font-display font-semibold text-sm text-gold tracking-wide'>
							{t.columns.ecosystem.title}
						</div>
						<ul className='mt-4 space-y-2.5 text-sm text-cream/55'>
							{ecosystemLinks.map((link) => (
								<li key={link.label}>
									<a
										href={link.href}
										target='_blank'
										rel='noopener noreferrer'
										className='hover:text-gold transition'
									>
										{link.label}
									</a>
								</li>
							))}
						</ul>
					</div>
					<div className='lg:col-span-2'>
						<div className='font-display font-semibold text-sm text-gold tracking-wide'>
							{t.columns.resources.title}
						</div>
						<ul className='mt-4 space-y-2.5 text-sm text-cream/55'>
							{resourceLinks.map((link) => (
								<li key={link.label}>
									<a
										href={link.href}
										{...(link.internal ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
										className='hover:text-gold transition'
									>
										{link.label}
									</a>
								</li>
							))}
						</ul>
					</div>
					<div className='lg:col-span-2'>
						<div className='font-display font-semibold text-sm text-gold tracking-wide'>
							{t.columns.community.title}
						</div>
						<ul className='mt-4 space-y-2.5 text-sm text-cream/55'>
							{communityLinks.map((link) => (
								<li key={link.label}>
									<a
										href={link.href}
										target='_blank'
										rel='noopener noreferrer'
										className='hover:text-gold transition'
									>
										{link.label}
									</a>
								</li>
							))}
						</ul>
					</div>
					<div className='lg:col-span-2'>
						<div className='font-display font-semibold text-sm text-gold tracking-wide'>
							{t.columns.audiences.title}
						</div>
						<ul className='mt-4 space-y-2.5 text-sm text-cream/55'>
							{audienceLinks.map((label) => (
								<li key={label}>
									<a href='#audiences' className='hover:text-gold transition'>
										{label}
									</a>
								</li>
							))}
						</ul>
					</div>
				</div>
				<div className='mt-12 pt-8 border-t hairline'>
					<div className='flex items-center justify-between flex-wrap gap-4'>
						<span className='text-xs font-display tracking-[0.2em] text-gold/70'>{t.presence.kicker}</span>
						<div className='flex items-center gap-6 flex-wrap text-sm'>
							{presence.map((region) => (
								<div
									key={region.label}
									className={`flex items-center gap-2 ${region.home ? 'text-cream/70' : 'text-cream/60'}`}
								>
									{region.label}
									<span
										className={`text-[10px] px-1.5 py-0.5 rounded-full ${
											region.home ? 'bg-gold/15 text-gold' : 'bg-cream/10 text-cream/50'
										}`}
									>
										{region.badge}
									</span>
								</div>
							))}
						</div>
					</div>
				</div>
				<div className='flex items-center justify-between flex-wrap gap-4 mt-8 pt-6 border-t hairline text-xs text-cream/40'>
					<span>{t.copyright}</span>
				</div>
				<p className='text-[11px] text-cream/30 mt-6 max-w-3xl'>{t.disclaimer}</p>
			</div>
		</footer>
	);
}
