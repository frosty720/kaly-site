import { notFound } from 'next/navigation';
import { getDictionary, isLocale } from '@/i18n';
import { getLiveStats } from '@/lib/stats';
import { Audiences } from '@/components/landing/audiences';
import { Benchmark } from '@/components/landing/benchmark';
import { Developers } from '@/components/landing/developers';
import { Ecosystem } from '@/components/landing/ecosystem';
import { FloatButton } from '@/components/landing/float-button';
import { Footer } from '@/components/landing/footer';
import { Governance } from '@/components/landing/governance';
import { Grants } from '@/components/landing/grants';
import { Header } from '@/components/landing/header';
import { Heritage } from '@/components/landing/heritage';
import { Hero } from '@/components/landing/hero';
import { Kalybot } from '@/components/landing/kalybot';
import { Manifesto } from '@/components/landing/manifesto';
import { Problem } from '@/components/landing/problem';
import { Roadmap } from '@/components/landing/roadmap';
import { ScrollFx } from '@/components/landing/scroll-fx';
import { Security } from '@/components/landing/security';
import { Solution } from '@/components/landing/solution';
import { Sustainability } from '@/components/landing/sustainability';
import { Synergy } from '@/components/landing/synergy';
import { Traction } from '@/components/landing/traction';

export const revalidate = 300;

export default async function Page({ params }: { params: { locale: string } }) {
	if (!isLocale(params.locale)) notFound();
	const locale = params.locale;
	const dict = getDictionary(locale);
	const live = await getLiveStats();

	return (
		<div className='bg-ink text-cream overflow-x-hidden'>
			<ScrollFx />
			<Header nav={dict.nav} locale={locale} />
			<main id='top'>
				<Hero t={dict.hero} live={live} />
				<Problem t={dict.problem} />
				<Heritage t={dict.heritage} />
				<Solution t={dict.solution} />
				<Benchmark t={dict.benchmark} />
				<Ecosystem t={dict.ecosystem} />
				<Developers t={dict.developers} />
				<Kalybot t={dict.kalybot} />
				<Synergy t={dict.synergy} />
				<Governance t={dict.governance} live={live} />
				<Traction t={dict.traction} live={live} />
				<Roadmap t={dict.roadmap} />
				<Grants t={dict.grants} />
				<Audiences t={dict.audiences} />
				<Manifesto t={dict.manifesto} />
				<Security t={dict.security} />
				<Sustainability t={dict.sustainability} />
			</main>
			<FloatButton label={dict.floatBtn} locale={locale} />
			<Footer t={dict.footer} locale={locale} />
		</div>
	);
}
