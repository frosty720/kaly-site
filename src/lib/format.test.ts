import { describe, expect, it } from 'vitest';
import { formatCounterValue, localizeDecimal } from './format';

describe('formatCounterValue', () => {
	it('uses a decimal point in English and a comma in French and Spanish', () => {
		expect(formatCounterValue(1.2, 1, 'en')).toBe('1.2');
		expect(formatCounterValue(1.2, 1, 'fr')).toBe('1,2');
		expect(formatCounterValue(46.3, 1, 'es')).toBe('46,3');
	});

	it('rounds to the requested decimals, including mid-animation values', () => {
		expect(formatCounterValue(0.8765, 1, 'en')).toBe('0.9');
		expect(formatCounterValue(114.6, 0, 'fr')).toBe('115');
	});

	it('never inserts thousands separators', () => {
		expect(formatCounterValue(4581, 0, 'en')).toBe('4581');
		expect(formatCounterValue(4581, 0, 'es')).toBe('4581');
	});
});

describe('localizeDecimal', () => {
	it('leaves English untouched', () => {
		expect(localizeDecimal('8.1M', 'en')).toBe('8.1M');
	});

	it('swaps the decimal point for a comma elsewhere', () => {
		expect(localizeDecimal('8.1M', 'fr')).toBe('8,1M');
		expect(localizeDecimal('2.4M', 'es')).toBe('2,4M');
	});

	it('does not touch figures without a decimal part', () => {
		expect(localizeDecimal('511M', 'fr')).toBe('511M');
		expect(localizeDecimal('3', 'fr')).toBe('3');
	});
});
