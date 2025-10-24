import type { Metadata } from 'next';

import { Geist, Geist_Mono } from 'next/font/google';

import { Toaster } from '@workspace/ui/components/sonner';
import '@workspace/ui/globals.css';

import { Providers } from '@/components/providers';

const fontSans = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
});

const fontMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'react-line-flex - LINE Flex Messages in React',
  description: 'A comprehensive React component library for rendering LINE Flex Messages with full TypeScript support',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
