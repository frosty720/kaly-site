import { notFound } from 'next/navigation';
import { getDictionary, isLocale } from '@/i18n';
import { getLiveStats } from '@/lib/stats';
import { Benchmark } from '@/components/landing/benchmark';
import { Cta } from '@/components/landing/cta';
import { Developers } from '@/components/landing/developers';
import { Ecosystem } from '@/components/landing/ecosystem';
import { Footer } from '@/components/landing/footer';
import { Governance } from '@/components/landing/governance';
import { Header } from '@/components/landing/header';
import { Hero } from '@/components/landing/hero';
import { Roadmap } from '@/components/landing/roadmap';
import { ScrollFx } from '@/components/landing/scroll-fx';
import { Technology } from '@/components/landing/technology';
import { Traction } from '@/components/landing/traction';
import { Why } from '@/components/landing/why';

export const revalidate = 300;

export default async function Page({ params }: { params: { locale: string } }) {
	if (!isLocale(params.locale)) notFound();
	const locale = params.locale;
	const dict = getDictionary(locale);
	const live = await getLiveStats();

	return (
		<div className='bg-ink text-zinc-50 overflow-x-hidden'>
			<ScrollFx />
			<Header nav={dict.nav} locale={locale} />
			<main className='relative overflow-x-hidden'>
				<Hero t={dict.hero} live={live} />
				<Traction t={dict.traction} yearsUnit={dict.hero.stats.yearsUnit} live={live} locale={locale} />
				<Why t={dict.why} />
				<Benchmark t={dict.benchmark} />
				<Ecosystem t={dict.ecosystem} />
				<Technology t={dict.tech} />
				<Developers t={dict.developers} />
				<Governance t={dict.governance} live={live} locale={locale} />
				<Roadmap t={dict.roadmap} />
				<Cta t={dict.cta} />
			</main>
			<Footer t={dict.footer} nav={dict.nav} locale={locale} />
		</div>
	);
}
