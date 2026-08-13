import { afterEach, describe, expect, it, vi } from 'vitest';
import { claims } from './claims';
import { getLiveStats } from './stats';

function jsonResponse(body: unknown) {
	return {
		ok: true,
		json: async () => body,
	} as Response;
}

afterEach(() => {
	vi.unstubAllGlobals();
});

describe('getLiveStats', () => {
	it('falls back to the verified static snapshot when every API is unreachable', async () => {
		vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('network down')));
		const stats = await getLiveStats();
		expect(stats.treasuryKlc).toBe(claims.governance.treasuryKlc);
		expect(stats.votingPowerGklc).toBe(claims.governance.votingPowerGklc);
		expect(stats.avgBlockTime).toBe(claims.traction.avgBlockTime);
		expect(stats.totalBlocks).toBe(claims.traction.totalBlocks);
		expect(stats.totalTransactions).toBe(claims.traction.totalTransactions);
		expect(stats.yearsLive).toBe(claims.traction.yearsLive);
		expect(stats.latestBlockNumber).toBeNull();
		expect(stats.vaultsMinted).toBe(claims.traction.vaultsMinted);
		expect(stats.polPositions).toBe(claims.traction.polPositions);
		expect(stats.polReserve).toBe(claims.traction.polReserve);
		expect(stats.klcPrice).toBe(claims.traction.klcPrice);
	});

	it('formats live RPC, KalyScan and VaultManager values', async () => {
		const treasury = `0x${(511_000_000n * 10n ** 18n).toString(16)}`;
		const gklcSupply = `0x${(235_000_000n * 10n ** 18n).toString(16)}`;
		const wklcReserve = `0x${(13_500_000n * 10n ** 18n).toString(16)}`;
		// $0.002263 per KLC, scaled 1e18
		const klcUsd = `0x${2_263_000_000_000_000n.toString(16)}`;
		const genesisTs = Math.floor(Date.now() / 1000) - 4 * 31_557_600;
		const fetchMock = vi.fn(async (url: unknown, init?: RequestInit) => {
			const href = String(url);
			if (href.includes('/api/v2/stats')) {
				return jsonResponse({
					average_block_time: 2000,
					total_blocks: '53117466',
					total_transactions: '3239733',
					total_addresses: '7525',
					transactions_today: '7210',
					gas_prices: { average: 20 },
				});
			}
			const { method, params } = JSON.parse(String(init?.body)) as {
				method: string;
				params: [{ to?: string; data?: string }, ...unknown[]];
			};
			switch (method) {
				case 'eth_getBalance':
					return jsonResponse({ result: treasury });
				case 'eth_blockNumber':
					return jsonResponse({ result: '0x32a8fa3' });
				case 'eth_getBlockByNumber':
					return jsonResponse({ result: { timestamp: `0x${genesisTs.toString(16)}` } });
				case 'eth_getLogs':
					return jsonResponse({ result: new Array(147).fill({}) });
				case 'eth_call': {
					const data = params[0].data ?? '';
					if (data === '0x18160ddd') return jsonResponse({ result: gklcSupply });
					if (data === '0x3560668b') return jsonResponse({ result: wklcReserve });
					if (data === '0x20612bc4') return jsonResponse({ result: klcUsd });
					if (data.startsWith('0x70a08231')) return jsonResponse({ result: `0x${(147).toString(16)}` });
					return jsonResponse({ error: { code: -32000, message: 'reverted' } });
				}
				default:
					return jsonResponse({ error: { code: -32601, message: 'unknown method' } });
			}
		});
		vi.stubGlobal('fetch', fetchMock);

		const stats = await getLiveStats();
		expect(stats.treasuryKlc).toBe('511M');
		expect(stats.votingPowerGklc).toBe('235M');
		expect(stats.avgBlockTime).toBe('2s');
		expect(stats.totalBlocks).toBe('53.1M+');
		expect(stats.totalTransactions).toBe('3.2M+');
		expect(stats.totalAddresses).toBe('7.5K+');
		expect(stats.transactionsToday).toBe('7,210');
		expect(stats.yearsLive).toBe('4+');
		expect(stats.latestBlockNumber).toBe(53117466);
		expect(stats.gasPrice).toBe('20 gwei');
		expect(stats.vaultsMinted).toBe('147');
		expect(stats.polPositions).toBe('147');
		expect(stats.polReserve).toBe('13.5M KLC');
		expect(stats.klcPrice).toBe('$0.002263');
		expect(stats.heroCounters.blocks).toEqual({ target: 53.1, decimals: 1, prefix: '', suffix: 'M+' });
		expect(stats.heroCounters.addresses).toEqual({ target: 7.5, decimals: 1, prefix: '', suffix: 'K+' });
		expect(stats.heroCounters.years).toEqual({ target: 4, decimals: 0, prefix: '', suffix: '+' });
		expect(stats.heroCounters.vaults).toEqual({ target: 147, decimals: 0, prefix: '', suffix: '' });
	});

	it('hero counters fall back to the verified snapshot when APIs are down', async () => {
		vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('network down')));
		const stats = await getLiveStats();
		expect(stats.heroCounters).toEqual(claims.hero);
	});
});
