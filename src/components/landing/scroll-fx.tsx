'use client';

import { useEffect } from 'react';

/**
 * Global scroll effects for the landing page:
 * - elements with .reveal get .is-visible when they enter the viewport
 * - elements with [data-counter] animate from 0 to their target value
 * Renders nothing; mount once per page.
 */
export function ScrollFx() {
	useEffect(() => {
		const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		// Only hide .reveal content once the observer is actually running
		document.documentElement.classList.add('fx');

		const revealElements = document.querySelectorAll<HTMLElement>('.reveal');
		const revealObserver = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						entry.target.classList.add('is-visible');
						revealObserver.unobserve(entry.target);
					}
				}
			},
			{ threshold: 0.15 },
		);
		revealElements.forEach((el) => revealObserver.observe(el));

		const counters = document.querySelectorAll<HTMLElement>('[data-counter]');
		const animateCounter = (el: HTMLElement) => {
			const target = parseFloat(el.dataset.counter ?? '0');
			const decimals = parseInt(el.dataset.decimals ?? '0', 10);
			const prefix = el.dataset.prefix ?? '';
			const suffix = el.dataset.suffix ?? '';
			const render = (value: number) => {
				el.textContent = `${prefix}${value.toFixed(decimals)}${suffix}`;
			};
			if (reduceMotion) {
				render(target);
				return;
			}
			const duration = 1400;
			const start = performance.now();
			const tick = (now: number) => {
				const progress = Math.min(Math.max((now - start) / duration, 0), 1);
				const eased = 1 - Math.pow(1 - progress, 3);
				render(target * eased);
				if (progress < 1) requestAnimationFrame(tick);
			};
			requestAnimationFrame(tick);
		};
		const counterObserver = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						animateCounter(entry.target as HTMLElement);
						counterObserver.unobserve(entry.target);
					}
				}
			},
			{ threshold: 0.4 },
		);
		counters.forEach((el) => counterObserver.observe(el));

		return () => {
			document.documentElement.classList.remove('fx');
			revealObserver.disconnect();
			counterObserver.disconnect();
		};
	}, []);

	return null;
}
