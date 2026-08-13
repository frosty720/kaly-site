/**
 * Every static (non-live) figure shown on the landing page, in one place.
 *
 * ⚠️ These values come from the supplied design and are NOT verified on-chain.
 * Anything marked UNVERIFIED must be confirmed (or corrected) before launch.
 * DAO treasury and gKLC supply are fetched live (src/lib/stats.ts) and only
 * fall back to the values here if the RPC is unreachable.
 */
export const claims = {
	// Animated hero counters, fed live (KalyScan + chain) — displayed value =
	// prefix + target + suffix. These are REAL fallback values (2026-08-13)
	// used only when the APIs are unreachable at render time.
	hero: {
		blocks: { target: 53.1, decimals: 1, prefix: '', suffix: 'M+' },
		transactions: { target: 3.2, decimals: 1, prefix: '', suffix: 'M+' },
		addresses: { target: 7.5, decimals: 1, prefix: '', suffix: 'K+' },
		years: { target: 3, decimals: 0, prefix: '', suffix: '+' },
		blockTime: { target: 2, decimals: 0, prefix: '', suffix: 's' },
		vaults: { target: 147, decimals: 0, prefix: '', suffix: '' },
	},
	benchmark: {
		tps: '10,000+', // UNVERIFIED
		finality: '<3s',
		gasFees: '<$0.01',
	},
	kalybot: {
		automated: '92%', // UNVERIFIED
		faster: '10×', // UNVERIFIED
		cheaper: '77%', // UNVERIFIED
	},
	governance: {
		treasuryKlc: '511M', // live-fetched fallback
		votingPowerGklc: '235M', // live-fetched fallback
		activeProposals: '3', // UNVERIFIED — static, goes stale
		quorum: '4%',
	},
	// Traction section is fully live (KalyScan + RPC). These are REAL values
	// verified 2026-08-13, used only as fallback when the APIs are unreachable.
	traction: {
		totalBlocks: '53.1M+',
		totalTransactions: '3.2M+',
		totalAddresses: '7.5K+',
		transactionsToday: '7,210',
		yearsLive: '3+',
		gasPrice: '20 gwei',
		avgBlockTime: '2s',
		vaultsMinted: '147',
		polPositions: '147',
		polReserve: '13.5M KLC',
		klcPrice: '$0.002263',
	},
	roadmap: {
		v4Progress: 80,
		v5Progress: 30,
		v6Progress: 10,
		v7Progress: 5,
		v4Tvl: '$50M',
		v5Tvl: '$300M',
		v6Tvl: '$1B',
		v7Tvl: '$5B',
	},
	grants: {
		grantMax: '$100K',
		hackathonPrize: '$50K',
		bugBountyMax: '$50K',
		storyGrant: '$80K', // illustrative example (labeled as such in copy)
		storyDeposits: '$12M', // illustrative example
	},
	sustainability: {
		energySavings: '99.9%',
		offset: '100%', // UNVERIFIED — "certified carbon neutral" claim needs backing
		kwhPerTx: '0.0004', // UNVERIFIED
		feesToGreenFund: '1%', // UNVERIFIED — protocol fee split must exist on-chain
	},
} as const;
