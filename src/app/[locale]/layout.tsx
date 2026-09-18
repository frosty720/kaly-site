import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import { notFound } from 'next/navigation';
import '../globals.css';
import { getDictionary, isLocale, locales, localePath } from '@/i18n';

const inter = Inter({
	subsets: ['latin'],
	weight: ['300', '400', '500', '600'],
	variable: '--font-inter',
});

const spaceGrotesk = Space_Grotesk({
	subsets: ['latin'],
	weight: ['400', '500', '600', '700'],
	variable: '--font-space-grotesk',
});

export function generateStaticParams() {
	return locales.map((locale) => ({ locale }));
}

interface LayoutProps {
	children: React.ReactNode;
	params: { locale: string };
}

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
	if (!isLocale(params.locale)) return {};
	const { meta } = getDictionary(params.locale);
	return {
		metadataBase: new URL('https://kalychain.io'),
		title: meta.title,
		description: meta.description,
		alternates: {
			canonical: localePath(params.locale),
			languages: {
				en: '/',
				fr: '/fr',
				es: '/es',
				'x-default': '/',
			},
		},
		icons: {
			icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }, { url: '/favicon.ico' }],
		},
		openGraph: {
			title: meta.ogTitle,
			description: meta.ogDescription,
			images: ['/og-image.png'],
			type: 'website',
		},
		twitter: {
			card: 'summary_large_image',
			title: meta.ogTitle,
			description: meta.ogDescription,
			images: ['/og-image.png'],
		},
	};
}

export default function RootLayout({ children, params }: LayoutProps) {
	if (!isLocale(params.locale)) notFound();

	return (
		<html lang={params.locale} suppressHydrationWarning>
			<body
				className={`${inter.variable} ${spaceGrotesk.variable} font-sans bg-ink text-zinc-50 antialiased overflow-x-hidden`}
			>
				{children}
			</body>
		</html>
	);
}
