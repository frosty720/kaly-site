import { describe, expect, it } from 'vitest';
import { NextRequest } from 'next/server';
import { middleware } from './middleware';

function requestFor(path: string): NextRequest {
	return new NextRequest(`https://kalychain.io${path}`);
}

describe('locale middleware', () => {
	it('rewrites the root to /en internally', () => {
		const res = middleware(requestFor('/'));
		expect(res.headers.get('x-middleware-rewrite')).toBe('https://kalychain.io/en');
	});

	it('redirects /en to the canonical root', () => {
		const res = middleware(requestFor('/en'));
		expect(res.status).toBe(308);
		expect(res.headers.get('location')).toBe('https://kalychain.io/');
	});

	it('passes /fr and /es straight through', () => {
		for (const path of ['/fr', '/es']) {
			const res = middleware(requestFor(path));
			expect(res.headers.get('x-middleware-rewrite')).toBeNull();
			expect(res.status).toBe(200);
		}
	});
});
