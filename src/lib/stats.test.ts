import { afterEach, describe, expect, it, vi } from 'vitest';
import { claims } from './claims';
import { getLiveStats, RPC_URL } from './stats';

const TREASURY = '0xdf8cfefea7daa5e5b23c262a461acca6356bca90';
const GKMT = '0xf05c285340fc6de9fc1a8f225b553df21f47afa8';
const VAULT_MANAGER = '0xda2a7a2d504949896e709f546b6bc06c2e7c5982';
const POSITION_MANAGER = '0xca4a8fc696adae8edc042cb9e32cd7f0a28ebdf0';
const TOPIC_PURCHASED = '0x8bd3744e58b8d1d7f64602efebce92a7af051f4b691e56ccb1f8dbaa8709c901';
const TOPIC_MIGRATED = '0x6fe24640fa1cde977a632e6bfbf29f915c3cca23c7746bd15f0975ccf2038400';
const TOPIC_REVOKED = '0x65143c9c8db9ce46388460bbee1d8a9ba68ac5d991af0cc533dbffe7b9b98db6';

function jsonResponse(body: unknown) {
	return {
		ok: true,
		json: async () => body,
	} as Response;
}

function wei(whole: bigint): string {
	return `0x${(whole * 10n ** 18n).toString(16)}`;
}

function logs(topic: string, count: number) {
	return Array.from({ length: count }, () => ({ topics: [topic] }));
}

interface RpcBody {
	method: string;
	params: [{ to?: string; data?: string; address?: string; fromBlock?: string; topics?: string[][] }, ...unknown[]];
}

/** Answers only requests aimed at the 3890 contracts, so a wrong address or chain falls back instead of passing. */
function chainMock(rpcUrls: string[]) {
	return vi.fn(async (url: unknown, init?: RequestInit) => {
		const href = String(url);
		if (href === 'https://kalyscan.io/api/v2/stats') {
			return jsonResponse({
				average_block_time: 2000,
				total_blocks: '1234567',
				total_transactions: '51234',
				total_addresses: '700',
				transactions_today: '8123',
				gas_prices: { average: 20 },
			});
		}
		rpcUrls.push(href);
		const { method, params } = JSON.parse(String(init?.body)) as RpcBody;
		const call = params[0];
		const to = call.to?.toLowerCase();
		const data = call.data ?? '';
		if (method === 'eth_getBalance' && String(call).toLowerCase() === TREASURY) {
			return jsonResponse({ result: wei(9_200_000n) });
		}
		if (method === 'eth_getLogs' && call.address?.toLowerCase() === VAULT_MANAGER && call.fromBlock === '0x11e5') {
			expect(call.topics).toEqual([[TOPIC_PURCHASED, TOPIC_MIGRATED, TOPIC_REVOKED]]);
			return jsonResponse({
				result: [...logs(TOPIC_MIGRATED, 104), ...logs(TOPIC_PURCHASED, 11), ...logs(TOPIC_REVOKED, 1)],
			});
		}
		if (method === 'eth_call') {
			if (to === GKMT && data === '0x18160ddd') return jsonResponse({ result: wei(2_750_000n) });
			if (to === VAULT_MANAGER && data === '0x3560668b') return jsonResponse({ result: wei(150_000n) });
			// $0.2123 per KMT, scaled 1e18 (all mock values differ from the claims.ts fallbacks)
			if (to === VAULT_MANAGER && data === '0x20612bc4') {
				return jsonResponse({ result: `0x${212_300_000_000_000_000n.toString(16)}` });
			}
			if (to === POSITION_MANAGER && data === `0x70a08231${TREASURY.slice(2).padStart(64, '0')}`) {
				return jsonResponse({ result: `0x${(13).toString(16)}` });
			}
		}
		return jsonResponse({ error: { code: -32000, message: 'unexpected request' } });
	});
}

afterEach(() => {
	vi.unstubAllGlobals();
	vi.useRealTimers();
});

describe('getLiveStats', () => {
	it('falls back to the verified static snapshot when every API is unreachable', async () => {
		vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('network down')));
		const stats = await getLiveStats();
		expect(stats.treasuryKmt).toBe(claims.governance.treasuryKmt);
		expect(stats.votingPowerGkmt).toBe(claims.governance.votingPowerGkmt);
		expect(stats.avgBlockTime).toBe(claims.traction.avgBlockTime);
		expect(stats.totalBlocks).toBe(claims.traction.totalBlocks);
		expect(stats.totalTransactions).toBe(claims.traction.totalTransactions);
		expect(stats.latestBlockNumber).toBeNull();
		expect(stats.vaultsMinted).toBe(claims.traction.vaultsMinted);
		expect(stats.polPositions).toBe(claims.traction.polPositions);
		expect(stats.polReserve).toBe(claims.traction.polReserve);
		expect(stats.kmtPrice).toBe(claims.traction.kmtPrice);
	});

	it('reads the 3890 RPC, KalyScan and VaultManager and formats the values', async () => {
		const rpcUrls: string[] = [];
		vi.stubGlobal('fetch', chainMock(rpcUrls));

		const stats = await getLiveStats();
		expect(RPC_URL).toBe('https://mainrpc.kalychain.io/rpc');
		expect(rpcUrls.length).toBe(6);
		expect(new Set(rpcUrls)).toEqual(new Set([RPC_URL]));
		expect(stats.treasuryKmt).toBe('9.2M');
		expect(stats.votingPowerGkmt).toBe('2.8M');
		expect(stats.avgBlockTime).toBe('2s');
		expect(stats.totalBlocks).toBe('1.2M+');
		expect(stats.totalTransactions).toBe('51.2K+');
		expect(stats.totalAddresses).toBe('700');
		expect(stats.transactionsToday).toBe('8,123');
		expect(stats.latestBlockNumber).toBe(1234567);
		expect(stats.gasPrice).toBe('20 gwei');
		expect(stats.polPositions).toBe('13');
		expect(stats.polReserve).toBe('150,000 KMT');
		expect(stats.kmtPrice).toBe('$0.2123');
		expect(stats.heroCounters.blocks).toEqual({ target: 1.2, decimals: 1, prefix: '', suffix: 'M+' });
		expect(stats.heroCounters.addresses).toEqual({ target: 700, decimals: 0, prefix: '', suffix: '' });
	});

	it('counts live vaults as purchased + migrated − revoked', async () => {
		vi.stubGlobal('fetch', chainMock([]));
		const stats = await getLiveStats();
		expect(stats.vaultsMinted).toBe('114');
		expect(stats.heroCounters.vaults).toEqual({ target: 114, decimals: 0, prefix: '', suffix: '' });
	});

	it('counts years in production from the 2023-03-24 launch, not the 3890 genesis', async () => {
		vi.useFakeTimers({ toFake: ['Date'] });
		vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('network down')));

		vi.setSystemTime(new Date('2027-03-23T12:00:00Z'));
		expect((await getLiveStats()).yearsLive).toBe('3+');

		vi.setSystemTime(new Date('2027-03-24T00:00:00Z'));
		const stats = await getLiveStats();
		expect(stats.yearsLive).toBe('4+');
		expect(stats.heroCounters.years).toEqual({ target: 4, decimals: 0, prefix: '', suffix: '+' });
	});

	it('hero counters fall back to the verified snapshot when APIs are down', async () => {
		vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('network down')));
		const { heroCounters } = await getLiveStats();
		const { years, ...rest } = heroCounters;
		expect(rest).toEqual(claims.hero);
		expect(years.suffix).toBe('+');
	});
});
