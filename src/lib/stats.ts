import { claims } from './claims';

// KalyChain 3890 (KMT). Addresses from kalychain-ops/files/kmt-3890/addresses.json
export const RPC_URL = 'https://mainrpc.kalychain.io/rpc';
const BLOCKSCOUT_API = 'https://kalyscan.io/api/v2';
const DAO_TREASURY = '0xDF8CFefEa7DaA5E5B23c262A461aCcA6356BCA90';
const GKMT_TOKEN = '0xf05c285340FC6DE9fC1a8F225b553DF21f47aFA8';
const VAULT_MANAGER = '0xDA2A7a2D504949896e709F546B6Bc06C2E7c5982';
const POSITION_MANAGER = '0xCa4a8fC696ADAE8edC042cB9E32Cd7F0A28EBdf0';
const VAULTS_DEPLOY_BLOCK = '0x11e5'; // 4,581
// KalyChain mainnet launch (block 1 of the original chain); the 3890 relaunch keeps the network's history
const KALYCHAIN_LAUNCH_MS = Date.UTC(2023, 2, 24);
const SELECTOR_TOTAL_SUPPLY = '0x18160ddd';
const SELECTOR_RESERVE_WKLC = '0x3560668b'; // reserveWklc() — holds WKMT on 3890
const SELECTOR_KLC_USD_PRICE = '0x20612bc4'; // klcUsdPrice() — USD per KMT on 3890, scaled 1e18
const SELECTOR_BALANCE_OF = '0x70a08231';
const TOPIC_PURCHASED = '0x8bd3744e58b8d1d7f64602efebce92a7af051f4b691e56ccb1f8dbaa8709c901'; // Purchased(address,uint256,uint8,address,uint256)
const TOPIC_MIGRATED = '0x6fe24640fa1cde977a632e6bfbf29f915c3cca23c7746bd15f0975ccf2038400'; // VaultMigrated(uint256,address,uint8)
const TOPIC_REVOKED = '0x65143c9c8db9ce46388460bbee1d8a9ba68ac5d991af0cc533dbffe7b9b98db6'; // VaultRevoked(uint256,address,uint256)
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

interface RpcLog {
	topics: string[];
}

/** Live vaults = bought on 3890 + migrated from 3888 − revoked. */
function countLiveVaults(logs: RpcLog[]): number {
	let count = 0;
	for (const log of logs) {
		const topic = log.topics?.[0]?.toLowerCase();
		if (topic === TOPIC_PURCHASED || topic === TOPIC_MIGRATED) count++;
		else if (topic === TOPIC_REVOKED) count--;
	}
	return Math.max(count, 0);
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
	/** DAO treasury balance in KMT, e.g. "8.1M" */
	treasuryKmt: string;
	/** gKMT total supply, e.g. "2.4M" */
	votingPowerGkmt: string;
	/** Average block time, e.g. "2s" */
	avgBlockTime: string;
	/** Cumulative chain totals from KalyScan */
	totalBlocks: string;
	totalTransactions: string;
	totalAddresses: string;
	transactionsToday: string;
	/** Full years since KalyChain's launch (2023-03-24), e.g. "3+" */
	yearsLive: string;
	/** Latest block height for the client-side ticker; null when the RPC is down */
	latestBlockNumber: number | null;
	gasPrice: string;
	/** Vaults & POL (VaultManager on 3890) */
	vaultsMinted: string;
	polPositions: string;
	polReserve: string;
	kmtPrice: string;
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
		stats,
		vaultLogs,
		polPositionsHex,
		reserveHex,
		kmtPriceHex,
	] = await Promise.all([
		rpcCall<string>('eth_getBalance', [DAO_TREASURY, 'latest']),
		ethCall(GKMT_TOKEN, SELECTOR_TOTAL_SUPPLY),
		blockscout<BlockscoutStats>('/stats'),
		rpcCall<RpcLog[]>('eth_getLogs', [
			{
				address: VAULT_MANAGER,
				fromBlock: VAULTS_DEPLOY_BLOCK,
				toBlock: 'latest',
				topics: [[TOPIC_PURCHASED, TOPIC_MIGRATED, TOPIC_REVOKED]],
			},
		]),
		balanceOfCall(POSITION_MANAGER, DAO_TREASURY),
		ethCall(VAULT_MANAGER, SELECTOR_RESERVE_WKLC),
		ethCall(VAULT_MANAGER, SELECTOR_KLC_USD_PRICE),
	]);

	const yearsLiveNum = Math.floor((Date.now() - KALYCHAIN_LAUNCH_MS) / 1000 / 31_557_600);
	const yearsLive = `${yearsLiveNum}+`;
	const liveVaults = vaultLogs ? countLiveVaults(vaultLogs) : null;

	let kmtPrice: string = fallback.kmtPrice;
	if (kmtPriceHex) {
		const usd = Number(BigInt(kmtPriceHex)) / 1e18;
		if (usd > 0) kmtPrice = usd >= 0.01 ? `$${usd.toFixed(4)}` : `$${usd.toFixed(6)}`;
	}

	const blockTimeSeconds = stats?.average_block_time ? stats.average_block_time / 1000 : null;

	return {
		treasuryKmt: treasuryHex ? formatMillions(treasuryHex) : claims.governance.treasuryKmt,
		votingPowerGkmt: supplyHex ? formatMillions(supplyHex) : claims.governance.votingPowerGkmt,
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
		vaultsMinted: liveVaults !== null ? String(liveVaults) : fallback.vaultsMinted,
		polPositions: polPositionsHex ? String(Number(BigInt(polPositionsHex))) : fallback.polPositions,
		polReserve: reserveHex ? `${formatMillions(reserveHex)} KMT` : fallback.polReserve,
		kmtPrice,
		heroCounters: {
			blocks: stats ? compactCounter(Number(stats.total_blocks)) : claims.hero.blocks,
			transactions: stats ? compactCounter(Number(stats.total_transactions)) : claims.hero.transactions,
			addresses: stats ? compactCounter(Number(stats.total_addresses)) : claims.hero.addresses,
			years: { target: yearsLiveNum, decimals: 0, prefix: '', suffix: '+' },
			blockTime: blockTimeSeconds
				? {
						target: Number(blockTimeSeconds.toFixed(1)),
						decimals: Number.isInteger(Number(blockTimeSeconds.toFixed(1))) ? 0 : 1,
						prefix: '',
						suffix: 's',
					}
				: claims.hero.blockTime,
			vaults:
				liveVaults !== null
					? { target: liveVaults, decimals: 0, prefix: '', suffix: '' }
					: claims.hero.vaults,
		},
	};
}
