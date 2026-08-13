import { claims } from './claims';

export const RPC_URL = 'https://rpc.kalychain.io/rpc';
const BLOCKSCOUT_API = 'https://kalyscan.io/api/v2';
const DAO_TREASURY = '0x92564ec0d22BBd5e3FF978B977CA968e6c7d1c44';
const GKLC_TOKEN = '0x4BA2369743c4249ea3f6777CaF433c76dBBa657a';
// Vaults v4 mainnet stack (kaly-vault/src/lib/chain/addresses.ts, deployed at block 51187545)
const VAULT_MANAGER = '0x8ad3aD4a3F20672d39F6F87d6bdf1DF5386ac6A5';
const POSITION_MANAGER = '0xfa25364Ec856E1C0dd6D14568456C842b288E519';
const VAULTS_DEPLOY_BLOCK = '0x30d1339'; // 51,187,545
const SELECTOR_TOTAL_SUPPLY = '0x18160ddd';
const SELECTOR_RESERVE_WKLC = '0x3560668b'; // reserveWklc()
const SELECTOR_KLC_USD_PRICE = '0x20612bc4'; // klcUsdPrice(), USD per KLC scaled 1e18
const SELECTOR_BALANCE_OF = '0x70a08231';
const TOPIC_PURCHASED = '0x8bd3744e58b8d1d7f64602efebce92a7af051f4b691e56ccb1f8dbaa8709c901'; // Purchased(address,uint256,uint8,address,uint256)
const REVALIDATE_SECONDS = 300;

interface RpcResponse<T> {
	result?: T;
	error?: { code: number; message: string };
}

async function rpcCall<T>(method: string, params: unknown[]): Promise<T | null> {
	try {
		const res = await fetch(RPC_URL, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ jsonrpc: '2.0', method, params, id: 1 }),
			next: { revalidate: REVALIDATE_SECONDS },
		});
		if (!res.ok) return null;
		const json = (await res.json()) as RpcResponse<T>;
		return json.result ?? null;
	} catch {
		return null;
	}
}

function ethCall(to: string, data: string): Promise<string | null> {
	return rpcCall<string>('eth_call', [{ to, data }, 'latest']);
}

function balanceOfCall(token: string, holder: string): Promise<string | null> {
	return ethCall(token, SELECTOR_BALANCE_OF + holder.slice(2).toLowerCase().padStart(64, '0'));
}

async function blockscout<T>(path: string): Promise<T | null> {
	try {
		const res = await fetch(`${BLOCKSCOUT_API}${path}`, { next: { revalidate: REVALIDATE_SECONDS } });
		if (!res.ok) return null;
		return (await res.json()) as T;
	} catch {
		return null;
	}
}

/** Formats a wei-denominated hex quantity as a rounded millions string, e.g. "511M". */
function formatMillions(hexWei: string): string {
	const wei = BigInt(hexWei);
	const whole = wei / 10n ** 18n;
	const millions = Number(whole) / 1_000_000;
	if (millions >= 100) return `${Math.round(millions)}M`;
	if (millions >= 1) return `${trimZero(millions.toFixed(1))}M`;
	return whole.toLocaleString('en-US');
}

/** 53117466 → "53.1M+", 7525 → "7.5K+", 812 → "812" */
function formatCompact(value: number): string {
	if (value >= 1_000_000) return `${trimZero((value / 1_000_000).toFixed(1))}M+`;
	if (value >= 1_000) return `${trimZero((value / 1_000).toFixed(1))}K+`;
	return value.toLocaleString('en-US');
}

function trimZero(s: string): string {
	return s.replace(/\.0$/, '');
}

interface RpcBlock {
	timestamp: string;
}

export interface CounterSpec {
	target: number;
	decimals: number;
	prefix: string;
	suffix: string;
}

/** 53117466 → {53.1, 1, '', 'M+'}; 7525 → {7.5, 1, '', 'K+'}; 147 → {147, 0, '', ''} */
function compactCounter(value: number): CounterSpec {
	if (value >= 1_000_000) {
		const target = Number((value / 1_000_000).toFixed(1));
		return { target, decimals: Number.isInteger(target) ? 0 : 1, prefix: '', suffix: 'M+' };
	}
	if (value >= 1_000) {
		const target = Number((value / 1_000).toFixed(1));
		return { target, decimals: Number.isInteger(target) ? 0 : 1, prefix: '', suffix: 'K+' };
	}
	return { target: value, decimals: 0, prefix: '', suffix: '' };
}

interface BlockscoutStats {
	average_block_time: number; // milliseconds
	total_blocks: string;
	total_transactions: string;
	total_addresses: string;
	transactions_today: string;
	gas_prices: { average: number } | null;
}

export interface LiveStats {
	/** DAO treasury balance in KLC, e.g. "511M" */
	treasuryKlc: string;
	/** gKLC total supply, e.g. "235M" */
	votingPowerGklc: string;
	/** Average block time, e.g. "2s" */
	avgBlockTime: string;
	/** Cumulative chain totals from KalyScan */
	totalBlocks: string;
	totalTransactions: string;
	totalAddresses: string;
	transactionsToday: string;
	/** Full years since block 1 (2023-03-24), e.g. "3+" */
	yearsLive: string;
	/** Latest block height for the client-side ticker; null when the RPC is down */
	latestBlockNumber: number | null;
	gasPrice: string;
	/** Vaults & POL (VaultManager v4 mainnet) */
	vaultsMinted: string;
	polPositions: string;
	polReserve: string;
	klcPrice: string;
	/** Animated hero counters derived from the live values above */
	heroCounters: {
		blocks: CounterSpec;
		transactions: CounterSpec;
		addresses: CounterSpec;
		years: CounterSpec;
		blockTime: CounterSpec;
		vaults: CounterSpec;
	};
}

/**
 * Fetches the on-chain and explorer figures shown on the landing page.
 * Every value that cannot be fetched falls back to the last verified
 * snapshot in claims.ts so the page never breaks or shows blanks.
 */
export async function getLiveStats(): Promise<LiveStats> {
	const fallback = claims.traction;

	const [
		treasuryHex,
		supplyHex,
		genesisBlock,
		stats,
		purchasedLogs,
		polPositionsHex,
		reserveHex,
		klcPriceHex,
	] = await Promise.all([
		rpcCall<string>('eth_getBalance', [DAO_TREASURY, 'latest']),
		ethCall(GKLC_TOKEN, SELECTOR_TOTAL_SUPPLY),
		rpcCall<RpcBlock>('eth_getBlockByNumber', ['0x1', false]),
		blockscout<BlockscoutStats>('/stats'),
		rpcCall<unknown[]>('eth_getLogs', [
			{
				address: VAULT_MANAGER,
				fromBlock: VAULTS_DEPLOY_BLOCK,
				toBlock: 'latest',
				topics: [TOPIC_PURCHASED],
			},
		]),
		balanceOfCall(POSITION_MANAGER, DAO_TREASURY),
		ethCall(VAULT_MANAGER, SELECTOR_RESERVE_WKLC),
		ethCall(VAULT_MANAGER, SELECTOR_KLC_USD_PRICE),
	]);

	let yearsLiveNum: number | null = null;
	if (genesisBlock?.timestamp) {
		const ageSeconds = Date.now() / 1000 - Number(BigInt(genesisBlock.timestamp));
		yearsLiveNum = Math.floor(ageSeconds / 31_557_600);
	}
	const yearsLive = yearsLiveNum !== null ? `${yearsLiveNum}+` : fallback.yearsLive;

	let klcPrice: string = fallback.klcPrice;
	if (klcPriceHex) {
		const usd = Number(BigInt(klcPriceHex)) / 1e18;
		if (usd > 0) klcPrice = usd >= 0.01 ? `$${usd.toFixed(4)}` : `$${usd.toFixed(6)}`;
	}

	const blockTimeSeconds = stats?.average_block_time ? stats.average_block_time / 1000 : null;

	return {
		treasuryKlc: treasuryHex ? formatMillions(treasuryHex) : claims.governance.treasuryKlc,
		votingPowerGklc: supplyHex ? formatMillions(supplyHex) : claims.governance.votingPowerGklc,
		avgBlockTime: blockTimeSeconds ? `${trimZero(blockTimeSeconds.toFixed(1))}s` : fallback.avgBlockTime,
		totalBlocks: stats ? formatCompact(Number(stats.total_blocks)) : fallback.totalBlocks,
		totalTransactions: stats ? formatCompact(Number(stats.total_transactions)) : fallback.totalTransactions,
		totalAddresses: stats ? formatCompact(Number(stats.total_addresses)) : fallback.totalAddresses,
		transactionsToday: stats
			? Number(stats.transactions_today).toLocaleString('en-US')
			: fallback.transactionsToday,
		yearsLive,
		latestBlockNumber: stats ? Number(stats.total_blocks) : null,
		gasPrice: stats?.gas_prices?.average ? `${stats.gas_prices.average} gwei` : fallback.gasPrice,
		vaultsMinted: purchasedLogs ? String(purchasedLogs.length) : fallback.vaultsMinted,
		polPositions: polPositionsHex ? String(Number(BigInt(polPositionsHex))) : fallback.polPositions,
		polReserve: reserveHex ? `${formatMillions(reserveHex)} KLC` : fallback.polReserve,
		klcPrice,
		heroCounters: {
			blocks: stats ? compactCounter(Number(stats.total_blocks)) : claims.hero.blocks,
			transactions: stats ? compactCounter(Number(stats.total_transactions)) : claims.hero.transactions,
			addresses: stats ? compactCounter(Number(stats.total_addresses)) : claims.hero.addresses,
			years:
				yearsLiveNum !== null
					? { target: yearsLiveNum, decimals: 0, prefix: '', suffix: '+' }
					: claims.hero.years,
			blockTime: blockTimeSeconds
				? {
						target: Number(blockTimeSeconds.toFixed(1)),
						decimals: Number.isInteger(Number(blockTimeSeconds.toFixed(1))) ? 0 : 1,
						prefix: '',
						suffix: 's',
					}
				: claims.hero.blockTime,
			vaults: purchasedLogs
				? { target: purchasedLogs.length, decimals: 0, prefix: '', suffix: '' }
				: claims.hero.vaults,
		},
	};
}
