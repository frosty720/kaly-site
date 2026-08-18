/**
 * Every external URL on the landing page, in one place.
 * Socials come from the task's sociallinks.txt (authoritative per boss).
 * NOTE: the Discord invite looks like a short-lived code — replace with a
 * permanent invite before launch if possible.
 */
export const links = {
	social: {
		telegram: 'https://t.me/KalyChainEVM',
		discord: 'https://discord.gg/cGSmTHRXWP',
		twitter: 'https://x.com/KalyChainEVM',
		github: 'https://github.com/KalyCoinProject',
	},
	ecosystem: {
		dexApp: 'https://app.kalyswap.io',
		vaults: 'https://vaults.kalychain.io',
		bridge: 'https://bridge.kalychain.io/',
		dao: 'https://dao.kalychain.io',
		kalypay: 'https://kalypay.com/',
		explorer: 'https://kalyscan.io',
		rails: 'https://rails.kalychain.io',
		docs: 'https://docs.kalychain.io',
		chainlist: 'https://chainlist.org/chain/3888',
	},
} as const;
