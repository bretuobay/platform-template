import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import localFont from 'next/font/local';

import { Providers } from './providers';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const jetBrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
});

const clashDisplay = localFont({
  src: './fonts/ClashDisplay.woff2',
  variable: '--font-clash-display',
});

export const metadata: Metadata = {
  title: 'Platform Template Docs',
  description:
    'Documentation site for the shared Turborepo template that mirrors the Connected TV brand.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetBrains.variable} ${clashDisplay.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
