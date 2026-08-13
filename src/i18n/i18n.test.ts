import { describe, expect, it } from 'vitest';
import en from './en.json';
import fr from './fr.json';
import es from './es.json';
import { getDictionary, isLocale, localePath, locales, whitepaperPath } from './index';

type Json = string | number | boolean | null | Json[] | { [key: string]: Json };

/** Returns every leaf path of a JSON structure, arrays included by index. */
function leafPaths(value: Json, prefix = ''): string[] {
	if (Array.isArray(value)) {
		return value.flatMap((item, i) => leafPaths(item, `${prefix}[${i}]`));
	}
	if (value !== null && typeof value === 'object') {
		return Object.entries(value).flatMap(([key, child]) => leafPaths(child, prefix ? `${prefix}.${key}` : key));
	}
	return [prefix];
}

describe('dictionary parity', () => {
	const enPaths = leafPaths(en as Json).sort();

	it('fr has exactly the same keys and array shapes as en', () => {
		expect(leafPaths(fr as Json).sort()).toEqual(enPaths);
	});

	it('es has exactly the same keys and array shapes as en', () => {
		expect(leafPaths(es as Json).sort()).toEqual(enPaths);
	});

	it('no dictionary has empty leaf strings where en has content', () => {
		for (const dict of [en, fr, es]) {
			const paths = leafPaths(dict as Json);
			// Only titleB slots may legitimately be empty (heritage line-break variance)
			const empties = paths.filter((p) => {
				const value = p
					.replace(/\[(\d+)\]/g, '.$1')
					.split('.')
					.reduce<Json>((acc, key) => (acc as never)[key], dict as Json);
				return value === '' && !p.endsWith('titleB');
			});
			expect(empties).toEqual([]);
		}
	});
});

describe('locale helpers', () => {
	it('recognizes exactly en, fr, es', () => {
		expect(locales).toEqual(['en', 'fr', 'es']);
		expect(isLocale('en')).toBe(true);
		expect(isLocale('fr')).toBe(true);
		expect(isLocale('es')).toBe(true);
		expect(isLocale('de')).toBe(false);
		expect(isLocale('')).toBe(false);
	});

	it('serves EN at the root and prefixes the others', () => {
		expect(localePath('en')).toBe('/');
		expect(localePath('fr')).toBe('/fr');
		expect(localePath('es')).toBe('/es');
	});

	it('maps each locale to an existing whitepaper (es falls back to en)', () => {
		expect(whitepaperPath('en')).toBe('/whitepaper-en.pdf');
		expect(whitepaperPath('fr')).toBe('/whitepaper-fr.pdf');
		expect(whitepaperPath('es')).toBe('/whitepaper-en.pdf');
	});

	it('returns the right dictionary per locale', () => {
		expect(getDictionary('fr').hero.titleGradient).toBe('Confiance');
		expect(getDictionary('en').hero.titleGradient).toBe('Trust');
		expect(getDictionary('es').hero.titleGradient).toBe('Confianza');
	});
});
