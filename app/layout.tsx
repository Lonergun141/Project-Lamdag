import type { Metadata } from 'next';
import { Pacifico, Crimson_Text, Playfair_Display } from 'next/font/google';
import './globals.css';

const pacifico = Pacifico({
	subsets: ['latin'],
	weight: ['400'],
	variable: '--font-pacifico',
});

const crimson = Crimson_Text({
	subsets: ['latin'],
	weight: ['400', '600', '700'],
	variable: '--font-crimson',
});

const pd = Playfair_Display({
	subsets: ['latin'],
	weight: ['400', '600', '700', '800', '900'],
	variable: '--font-pd',
});

export const metadata: Metadata = {
	title: 'Lamdag Recipe App',
	description: 'Recipe app API Integration',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${pacifico.variable} ${crimson.variable} ${pd.variable} antialiased`}>{children}</body>
		</html>
	);
}
