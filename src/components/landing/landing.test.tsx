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
	treasuryKlc: '511M',
	votingPowerGklc: '235M',
	avgBlockTime: '2s',
	totalBlocks: '53.1M+',
	totalTransactions: '3.2M+',
	totalAddresses: '7.5K+',
	transactionsToday: '7,210',
	yearsLive: '3+',
	latestBlockNumber: 53117466,
	gasPrice: '20 gwei',
	vaultsMinted: '147',
	polPositions: '147',
	polReserve: '13.5M KLC',
	klcPrice: '$0.002263',
	heroCounters: {
		blocks: { target: 53.1, decimals: 1, prefix: '', suffix: 'M+' },
		transactions: { target: 3.2, decimals: 1, prefix: '', suffix: 'M+' },
		addresses: { target: 7.5, decimals: 1, prefix: '', suffix: 'K+' },
		years: { target: 3, decimals: 0, prefix: '', suffix: '+' },
		blockTime: { target: 2, decimals: 0, prefix: '', suffix: 's' },
		vaults: { target: 147, decimals: 0, prefix: '', suffix: '' },
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
		expect(screen.getByText('53.1M+')).toBeTruthy();
		expect(screen.getByText('147')).toBeTruthy();
		// the fabricated claims are gone
		expect(screen.queryByText(/\$1\.2B/)).toBeNull();
		expect(screen.queryByText('99.9%')).toBeNull();
		expect(screen.queryByText('200+')).toBeNull();
	});
});

describe('Governance', () => {
	it('shows the live on-chain treasury and voting power values', () => {
		render(<Governance t={en.governance} live={live} />);
		expect(screen.getByText('511M')).toBeTruthy();
		expect(screen.getByText('235M')).toBeTruthy();
	});

	it('links the DAO CTA to dao.kalychain.io', () => {
		const { container } = render(<Governance t={en.governance} live={live} />);
		expect(allHrefs(container)).toContain(links.ecosystem.dao);
	});
});

describe('Traction', () => {
	it('renders only live chain figures — blocks, addresses, block time, ticking latest block', () => {
		render(<Traction t={en.traction} live={live} />);
		expect(screen.getByText('53.1M+')).toBeTruthy();
		expect(screen.getByText('7.5K+')).toBeTruthy();
		expect(screen.getAllByText('2s').length).toBeGreaterThan(0);
		expect(screen.getByText('#53,117,466')).toBeTruthy();
		// none of the fabricated figures survive, and the weak validator count is gone
		expect(screen.queryByText('$1.2B')).toBeNull();
		expect(screen.queryByText('480K')).toBeNull();
		expect(screen.queryByText('200+')).toBeNull();
		expect(screen.queryByText(en.traction.network.title && 'Active Validators')).toBeNull();
	});

	it('renders the vaults & POL panel from on-chain data', () => {
		render(<Traction t={en.traction} live={live} />);
		expect(screen.getByText(en.traction.vaults.title)).toBeTruthy();
		expect(screen.getAllByText('147').length).toBe(2);
		expect(screen.getByText('13.5M KLC')).toBeTruthy();
		expect(screen.getByText('$0.002263')).toBeTruthy();
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
		expect(hrefs).toContain('https://discord.gg/p4Gz7K8U');
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
			links.ecosystem.chainlist,
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
