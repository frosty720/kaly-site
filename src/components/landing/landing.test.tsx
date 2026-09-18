import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import en from '@/i18n/en.json';
import fr from '@/i18n/fr.json';
import es from '@/i18n/es.json';
import { getDictionary } from '@/i18n';
import type { LiveStats } from '@/lib/stats';
import { links } from '@/config/links';
import { Benchmark } from './benchmark';
import { Cta } from './cta';
import { Developers } from './developers';
import { Ecosystem } from './ecosystem';
import { Footer } from './footer';
import { Governance } from './governance';
import { Header } from './header';
import { Hero } from './hero';
import { navAnchors } from './nav-anchors';
import { Roadmap } from './roadmap';
import { Technology } from './technology';
import { Traction } from './traction';
import { Why } from './why';

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
	it('renders the five section anchors, the CTA and the logo — no wallet button', () => {
		const t = getDictionary('en');
		const { container } = render(<Header nav={t.nav} locale='en' />);
		const hrefs = allHrefs(container);
		for (const { key, href } of navAnchors) {
			expect(screen.getByText(t.nav[key])).toBeTruthy();
			expect(hrefs).toContain(href);
		}
		expect(screen.getByText(t.nav.cta)).toBeTruthy();
		expect(screen.getByAltText('KalyChain logo')).toBeTruthy();
		expect(container.textContent).not.toMatch(/connect.*wallet|connecter.*wallet/i);
	});

	it('language switcher links to the other locales with EN at root', () => {
		const { container } = render(<Header nav={getDictionary('fr').nav} locale='fr' />);
		const hrefs = allHrefs(container);
		expect(hrefs).toContain('/');
		expect(hrefs).toContain('/es');
		// current locale (fr) is not a link
		expect(hrefs).not.toContain('/fr');
	});
});

describe('Hero', () => {
	it('renders the headline, the four design tiles and live years in production', () => {
		const t = getDictionary('en');
		const { container } = render(<Hero t={t.hero} live={live} />);
		expect(screen.getByText(t.hero.titleGradient)).toBeTruthy();
		expect(screen.getByText('10,000+')).toBeTruthy();
		expect(screen.getByText('< 3s')).toBeTruthy();
		expect(screen.getByText('< $0.01')).toBeTruthy();
		expect(screen.getByText('3+ years')).toBeTruthy();
		expect(allHrefs(container)).toContain(links.ecosystem.docs);
	});

	it('uses the French unit for years in production', () => {
		render(<Hero t={getDictionary('fr').hero} live={live} />);
		expect(screen.getByText('3+ ans')).toBeTruthy();
		expect(screen.getByText('< 0,01 $')).toBeTruthy();
	});
});

describe('Traction', () => {
	it('renders live counters, not the old-chain numbers from the mockup', () => {
		const t = getDictionary('en');
		const { container } = render(
			<Traction t={t.traction} yearsUnit={t.hero.stats.yearsUnit} live={live} locale='en' />,
		);
		for (const text of ['1.1M+', '46.3K+', '610', '3+', '2s', '115']) {
			expect(screen.getByText(text)).toBeTruthy();
		}
		expect(container.textContent).toContain('3+ years');
		expect(container.querySelector('[data-counter="1.1"]')?.getAttribute('data-suffix')).toBe('M+');
		expect(container.textContent).not.toMatch(/54\.1M|224/);
	});

	it('formats counter decimals the French way', () => {
		const t = getDictionary('fr');
		render(<Traction t={t.traction} yearsUnit={t.hero.stats.yearsUnit} live={live} locale='fr' />);
		expect(screen.getByText('1,1M+')).toBeTruthy();
		expect(screen.getByText('46,3K+')).toBeTruthy();
	});
});

describe('Benchmark', () => {
	function rowOf(container: HTMLElement, label: string): HTMLTableRowElement {
		const row = Array.from(container.querySelectorAll('tr')).find(
			(tr) => tr.querySelector('td')?.textContent === label,
		);
		if (!row) throw new Error(`row ${label} not found`);
		return row;
	}

	it('renders KalyChain against the five L1s with the design values', () => {
		const t = getDictionary('en');
		const { container } = render(<Benchmark t={t.benchmark} />);
		const headers = Array.from(container.querySelectorAll('th')).map((th) => th.textContent);
		expect(headers).toEqual(['', 'KalyChain', 'Ethereum', 'Solana', 'Polygon', 'Avalanche', 'Cardano']);
		const tpsCells = Array.from(rowOf(container, t.benchmark.rows.tps).querySelectorAll('td')).map(
			(td) => td.textContent,
		);
		expect(tpsCells).toEqual(['TPS', '10,000+', '~15', '65,000', '7,000', '4,500', '250']);
	});

	it('marks feature support per network as in the design', () => {
		const t = getDictionary('en');
		const { container } = render(<Benchmark t={t.benchmark} />);
		const support = (label: string) =>
			Array.from(rowOf(container, label).querySelectorAll('td'))
				.slice(1)
				.map((td) => td.querySelector('svg')?.getAttribute('aria-label'));
		expect(support(t.benchmark.rows.evm)).toEqual(['yes', 'yes', 'no', 'yes', 'yes', 'no']);
		expect(support(t.benchmark.rows.mobileMoney)).toEqual(['yes', 'no', 'no', 'no', 'no', 'no']);
		expect(support(t.benchmark.rows.carbonNeutral)).toEqual(['yes', 'no', 'no', 'no', 'no', 'yes']);
	});
});

describe('Governance', () => {
	it('shows live treasury and voting power in KMT / gKMT', () => {
		const { container } = render(<Governance t={getDictionary('en').governance} live={live} locale='en' />);
		expect(screen.getByText('8.1M KMT')).toBeTruthy();
		expect(screen.getByText('2.4M gKMT')).toBeTruthy();
		expect(screen.getByText('4%')).toBeTruthy();
		expect(container.textContent).not.toMatch(/\bg?KLC\b/);
	});

	it('localizes the live figures in French', () => {
		render(<Governance t={getDictionary('fr').governance} live={live} locale='fr' />);
		expect(screen.getByText('8,1M KMT')).toBeTruthy();
		expect(screen.getByText('2,4M gKMT')).toBeTruthy();
	});

	it('links KalyDAO to dao.kalychain.io and keeps the three KIPs', () => {
		const t = getDictionary('en');
		const { container } = render(<Governance t={t.governance} live={live} locale='en' />);
		expect(allHrefs(container)).toContain(links.ecosystem.dao);
		for (const code of ['KIP001', 'KIP002', 'KIP003']) {
			expect(screen.getByText(code)).toBeTruthy();
		}
	});

	it('states the real on-chain rule, not the mockup\'s 100k proposal minimum', () => {
		for (const dict of [en, fr, es]) {
			const step = dict.governance.steps[1].body;
			expect(step).toContain('≈94K');
			expect(step).not.toMatch(/100k/i);
		}
	});
});

describe('Roadmap', () => {
	it('draws each phase progress bar from claims', () => {
		const t = getDictionary('en');
		const { container } = render(<Roadmap t={t.roadmap} />);
		const widths = Array.from(container.querySelectorAll<HTMLElement>('[style]')).map((el) => el.style.width);
		expect(widths).toEqual(['80%', '30%', '10%', '5%']);
		for (const phase of t.roadmap.phases) {
			expect(screen.getByText(phase.target)).toBeTruthy();
		}
	});
});

describe('Footer', () => {
	it('contains the authoritative social links', () => {
		const t = getDictionary('en');
		const { container } = render(<Footer t={t.footer} nav={t.nav} locale='en' />);
		const hrefs = allHrefs(container);
		expect(hrefs).toContain('https://t.me/KalyChainEVM');
		expect(hrefs).toContain('https://discord.gg/cGSmTHRXWP');
		expect(hrefs).toContain('https://x.com/KalyChainEVM');
		expect(hrefs).toContain('https://github.com/KalyCoinProject');
	});

	it('keeps every ecosystem link and the section anchors', () => {
		const t = getDictionary('en');
		const { container } = render(<Footer t={t.footer} nav={t.nav} locale='en' />);
		const hrefs = allHrefs(container);
		for (const href of [
			links.ecosystem.dexApp,
			links.ecosystem.vaults,
			links.ecosystem.bridge,
			links.ecosystem.dao,
			links.ecosystem.kalypay,
			links.ecosystem.explorer,
			links.ecosystem.rails,
			links.ecosystem.docs,
			'#ecosystem',
			'#tech',
			'#developers',
			'#governance',
		]) {
			expect(hrefs).toContain(href);
		}
	});

	it('links the whitepaper per locale, es falling back to en', () => {
		const cases = [
			['en', '/whitepaper-en.pdf'],
			['fr', '/whitepaper-fr.pdf'],
			['es', '/whitepaper-en.pdf'],
		] as const;
		for (const [locale, pdf] of cases) {
			const t = getDictionary(locale);
			const { container } = render(<Footer t={t.footer} nav={t.nav} locale={locale} />);
			expect(allHrefs(container)).toContain(pdf);
			cleanup();
		}
	});
});

describe('Page wiring', () => {
	it('every nav anchor lands on a rendered section', () => {
		const t = getDictionary('en');
		const { container } = render(
			<>
				<Hero t={t.hero} live={live} />
				<Traction t={t.traction} yearsUnit={t.hero.stats.yearsUnit} live={live} locale='en' />
				<Why t={t.why} />
				<Benchmark t={t.benchmark} />
				<Ecosystem t={t.ecosystem} />
				<Technology t={t.tech} />
				<Developers t={t.developers} />
				<Governance t={t.governance} live={live} locale='en' />
				<Roadmap t={t.roadmap} />
				<Cta t={t.cta} />
			</>,
		);
		for (const { href } of navAnchors) {
			expect(container.querySelector(href)).not.toBeNull();
		}
		expect(container.querySelector('#top')).not.toBeNull();
	});

	it('no dictionary makes the ISO 27001 / PCI DSS / MiCA claims the boss removed', () => {
		for (const dict of [en, fr, es]) {
			expect(JSON.stringify(dict)).not.toMatch(/ISO 27001|PCI DSS|MiCA/i);
		}
	});

	it('no dictionary still names the retired KLC / gKLC tokens', () => {
		for (const dict of [en, fr, es]) {
			expect(JSON.stringify(dict)).not.toMatch(/\bg?KLC\b/);
		}
	});
});
