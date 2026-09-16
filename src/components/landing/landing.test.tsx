import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { getDictionary } from '@/i18n';
import type { LiveStats } from '@/lib/stats';
import { links } from '@/config/links';
import { Footer } from './footer';
import { Governance } from './governance';
import { Header } from './header';
import { Hero } from './hero';
import { Traction } from './traction';

const en = getDictionary('en');
const fr = getDictionary('fr');
const live: LiveStats = {
	treasuryKmt: '8.1M',
	votingPowerGkmt: '2.4M',
	avgBlockTime: '2s',
	totalBlocks: '1.1M+',
	totalTransactions: '46.3K+',
	totalAddresses: '610',
	transactionsToday: '7,540',
	yearsLive: '3+',
	latestBlockNumber: 1121012,
	gasPrice: '20 gwei',
	vaultsMinted: '115',
	polPositions: '12',
	polReserve: '131,396 KMT',
	kmtPrice: '$0.2041',
	heroCounters: {
		blocks: { target: 1.1, decimals: 1, prefix: '', suffix: 'M+' },
		transactions: { target: 46.3, decimals: 1, prefix: '', suffix: 'K+' },
		addresses: { target: 610, decimals: 0, prefix: '', suffix: '' },
		years: { target: 3, decimals: 0, prefix: '', suffix: '+' },
		blockTime: { target: 2, decimals: 0, prefix: '', suffix: 's' },
		vaults: { target: 115, decimals: 0, prefix: '', suffix: '' },
	},
};

afterEach(cleanup);

function allHrefs(container: HTMLElement): string[] {
	return Array.from(container.querySelectorAll('a')).map((a) => a.getAttribute('href') ?? '');
}

describe('Header', () => {
	it('renders all nav anchors and no wallet-connect button', () => {
		const { container } = render(<Header nav={en.nav} locale='en' />);
		for (const label of Object.values(en.nav)) {
			expect(screen.getByText(label)).toBeTruthy();
		}
		expect(container.textContent).not.toMatch(/connect.*wallet|connecter.*wallet/i);
	});

	it('language switcher links to the other locales with EN at root', () => {
		const { container } = render(<Header nav={fr.nav} locale='fr' />);
		const hrefs = allHrefs(container);
		expect(hrefs).toContain('/');
		expect(hrefs).toContain('/es');
		// current locale (fr) is not a link
		expect(hrefs).not.toContain('/fr');
	});
});

describe('Hero', () => {
	it('renders the localized headline and live stat counters', () => {
		render(<Hero t={en.hero} live={live} />);
		expect(screen.getByText(en.hero.titleGradient)).toBeTruthy();
		expect(screen.getByText(en.hero.stats.blocks)).toBeTruthy();
		expect(screen.getByText(en.hero.stats.vaults)).toBeTruthy();
		expect(screen.getByText('1.1M+')).toBeTruthy();
		expect(screen.getByText('115')).toBeTruthy();
		// the fabricated claims are gone
		expect(screen.queryByText(/\$1\.2B/)).toBeNull();
		expect(screen.queryByText('99.9%')).toBeNull();
		expect(screen.queryByText('200+')).toBeNull();
	});
});

describe('Governance', () => {
	it('shows the live on-chain treasury and voting power values in KMT / gKMT', () => {
		const { container } = render(<Governance t={en.governance} live={live} />);
		expect(screen.getByText('8.1M')).toBeTruthy();
		expect(screen.getByText('2.4M')).toBeTruthy();
		expect(screen.getByText('KMT')).toBeTruthy();
		expect(screen.getByText('gKMT')).toBeTruthy();
		expect(container.textContent).not.toMatch(/\bg?KLC\b/);
	});

	it('links the DAO CTA to dao.kalychain.io', () => {
		const { container } = render(<Governance t={en.governance} live={live} />);
		expect(allHrefs(container)).toContain(links.ecosystem.dao);
	});
});

describe('Traction', () => {
	it('renders only live chain figures — blocks, addresses, block time, ticking latest block', () => {
		render(<Traction t={en.traction} live={live} />);
		expect(screen.getByText('1.1M+')).toBeTruthy();
		expect(screen.getByText('610')).toBeTruthy();
		expect(screen.getAllByText('2s').length).toBeGreaterThan(0);
		expect(screen.getByText('#1,121,012')).toBeTruthy();
		// none of the fabricated figures survive, and the weak validator count is gone
		expect(screen.queryByText('$1.2B')).toBeNull();
		expect(screen.queryByText('480K')).toBeNull();
		expect(screen.queryByText('200+')).toBeNull();
		expect(screen.queryByText(en.traction.network.title && 'Active Validators')).toBeNull();
	});

	it('renders the vaults & POL panel from on-chain data in KMT', () => {
		const { container } = render(<Traction t={en.traction} live={live} />);
		expect(screen.getByText(en.traction.vaults.title)).toBeTruthy();
		expect(screen.getByText('115')).toBeTruthy();
		expect(screen.getByText('12')).toBeTruthy();
		expect(screen.getByText('131,396 KMT')).toBeTruthy();
		expect(screen.getByText('KMT Price (DEX)')).toBeTruthy();
		expect(screen.getByText('$0.2041')).toBeTruthy();
		expect(container.textContent).not.toMatch(/\bg?KLC\b/);
	});

	it('lists Kaly Vaults instead of KalyScan in live products', () => {
		const { container } = render(<Traction t={en.traction} live={live} />);
		expect(screen.getByText('Kaly Vaults')).toBeTruthy();
		expect(screen.queryByText('KalyScan')).toBeNull();
		const hrefs = Array.from(container.querySelectorAll('a')).map((a) => a.getAttribute('href'));
		expect(hrefs).toContain(links.ecosystem.vaults);
		expect(hrefs).toContain(links.ecosystem.dexApp);
		expect(hrefs).toContain(links.ecosystem.bridge);
		expect(hrefs).toContain(links.ecosystem.dao);
	});

	it('keeps the testimonials', () => {
		render(<Traction t={en.traction} live={live} />);
		for (const item of en.traction.testimonials) {
			expect(screen.getByText(item.quote)).toBeTruthy();
		}
	});
});

describe('Footer', () => {
	it('contains the authoritative social links from sociallinks.txt', () => {
		const { container } = render(<Footer t={en.footer} locale='en' />);
		const hrefs = allHrefs(container);
		expect(hrefs).toContain('https://t.me/KalyChainEVM');
		expect(hrefs).toContain('https://discord.gg/cGSmTHRXWP');
		expect(hrefs).toContain('https://x.com/KalyChainEVM');
		expect(hrefs).toContain('https://github.com/KalyCoinProject');
	});

	it('contains the ecosystem links the old design lacked', () => {
		const { container } = render(<Footer t={en.footer} locale='en' />);
		const hrefs = allHrefs(container);
		for (const href of [
			links.ecosystem.dexApp,
			links.ecosystem.bridge,
			links.ecosystem.dao,
			links.ecosystem.kalypay,
			links.ecosystem.explorer,
			links.ecosystem.rails,
			links.ecosystem.docs,
		]) {
			expect(hrefs).toContain(href);
		}
	});

	it('links the whitepaper per locale, es falling back to en', () => {
		const enFooter = render(<Footer t={en.footer} locale='en' />);
		expect(allHrefs(enFooter.container)).toContain('/whitepaper-en.pdf');
		cleanup();
		const frFooter = render(<Footer t={fr.footer} locale='fr' />);
		expect(allHrefs(frFooter.container)).toContain('/whitepaper-fr.pdf');
		cleanup();
		const esFooter = render(<Footer t={getDictionary('es').footer} locale='es' />);
		expect(allHrefs(esFooter.container)).toContain('/whitepaper-en.pdf');
	});
});
