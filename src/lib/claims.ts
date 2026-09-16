/**
 * Every static (non-live) figure shown on the landing page, in one place.
 *
 * ⚠️ These values come from the supplied design and are NOT verified on-chain.
 * Anything marked UNVERIFIED must be confirmed (or corrected) before launch.
 * DAO treasury and gKMT supply are fetched live (src/lib/stats.ts) and only
 * fall back to the values here if the RPC is unreachable.
 */
export const claims = {
	// Animated hero counters, fed live (KalyScan + chain) — displayed value =
	// prefix + target + suffix. These are REAL 3890 fallback values (2026-09-16)
	// used only when the APIs are unreachable at render time. Years in
	// production is computed from the launch date and needs no fallback.
	hero: {
		blocks: { target: 1.1, decimals: 1, prefix: '', suffix: 'M+' },
		transactions: { target: 46.3, decimals: 1, prefix: '', suffix: 'K+' },
		addresses: { target: 610, decimals: 0, prefix: '', suffix: '' },
		blockTime: { target: 2, decimals: 0, prefix: '', suffix: 's' },
		vaults: { target: 115, decimals: 0, prefix: '', suffix: '' },
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
		treasuryKmt: '8.1M', // live-fetched fallback
		votingPowerGkmt: '2.4M', // live-fetched fallback
		activeProposals: '3', // UNVERIFIED — static, goes stale
		quorum: '4%',
	},
	// Traction section is fully live (KalyScan + 3890 RPC). These are REAL values
	// verified 2026-09-16, used only as fallback when the APIs are unreachable.
	traction: {
		totalBlocks: '1.1M+',
		totalTransactions: '46.3K+',
		totalAddresses: '610',
		transactionsToday: '7,540',
		gasPrice: '20 gwei',
		avgBlockTime: '2s',
		vaultsMinted: '115',
		polPositions: '12',
		polReserve: '131,396 KMT',
		kmtPrice: '$0.2041',
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
