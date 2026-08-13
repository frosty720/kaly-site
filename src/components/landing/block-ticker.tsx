'use client';

import { useEffect, useState } from 'react';

const STATS_URL = 'https://kalyscan.io/api/v2/stats';
const POLL_MS = 10000;

/**
 * Live block-height readout: seeds from the server-rendered value, then
 * polls the KalyScan stats API (cached explorer endpoint — deliberately
 * NOT the RPC node) so the number ticks along with the chain.
 */
export function BlockTicker({ initial }: { initial: number | null }) {
	const [block, setBlock] = useState<number | null>(initial);

	useEffect(() => {
		let stopped = false;
		const poll = async () => {
			try {
				const res = await fetch(STATS_URL);
				if (!res.ok) return;
				const json = await res.json();
				const height = Number(json?.total_blocks);
				if (!stopped && Number.isFinite(height) && height > 0) setBlock(height);
			} catch {
				// keep the last known value
			}
		};
		poll();
		const id = setInterval(poll, POLL_MS);
		return () => {
			stopped = true;
			clearInterval(id);
		};
	}, []);

	if (block === null) return <>—</>;
	return <>#{block.toLocaleString('en-US')}</>;
}
