/** Counter number in the locale's decimal style: 1.2 → "1.2" (en), "1,2" (fr, es). */
export function formatCounterValue(value: number, decimals: number, locale: string): string {
	return new Intl.NumberFormat(locale, {
		minimumFractionDigits: decimals,
		maximumFractionDigits: decimals,
		useGrouping: false,
	}).format(value);
}

/** Localizes the decimal point of a pre-formatted compact figure: "8.1M" → "8,1M" outside English. */
export function localizeDecimal(value: string, locale: string): string {
	return locale === 'en' ? value : value.replace(/(\d)\.(\d)/g, '$1,$2');
}
