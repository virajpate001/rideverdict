import './globals.css';
import 'lenis/dist/lenis.css';
import { Sora, Manrope, Inter } from 'next/font/google';
import Script from 'next/script';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MotionProvider from '@/components/MotionProvider';
import Cursor from '@/components/Cursor';
import site from '@/content/site.json';

const sora = Sora({ subsets: ['latin'], variable: '--font-sora', display: 'swap' });
const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope', display: 'swap' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

export const viewport = { themeColor: '#090A0F', colorScheme: 'dark' };

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
    <html lang="en-IN" className={`${sora.variable} ${manrope.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        {/* Adds .js (enables hidden-until-animated states) + a failsafe if scripts never load */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js');window.__rvFail=setTimeout(function(){document.documentElement.classList.remove('js')},5000)" }} />
      </head>
      <body>
        <a className="skip" href="#main">Skip to content</a>
        <MotionProvider />
        <Cursor />
        <Header />
        <main id="main">{children}</main>
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