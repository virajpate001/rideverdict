import './globals.css';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import site from '@/content/site.json';

const inter = Inter({ subsets: ['latin'], variable: '--font-body', display: 'swap' });

export const metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'Bike Comparisons, Reviews & Buying Guides in India | RideVerdict',
    template: '%s | RideVerdict',
  },
  description: site.description,
  openGraph: { siteName: site.name, type: 'website', locale: 'en_IN' },
  twitter: { card: 'summary_large_image' },
  alternates: { types: { 'application/rss+xml': '/feed.xml' } },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN" className={inter.variable}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        {site.gaId && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${site.gaId}`} strategy="afterInteractive" />
            <Script id="ga" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${site.gaId}');`}</Script>
          </>
        )}
      </body>
    </html>
  );
}