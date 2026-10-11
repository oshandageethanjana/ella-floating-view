import type { Metadata, Viewport } from 'next';
import './globals.css';
import { MobileBookBar } from '@/components/MobileBookBar';
import { BookingPanel } from '@/components/BookingPanel';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'Ella Floating View | Boutique Stay in Ella, Sri Lanka',
    template: '%s | Ella Floating View'
  },
  description: 'A peaceful boutique stay in Ella with mountain surroundings, comfortable rooms and breakfast included.',
  icons: { icon: '/icon.png' },
  openGraph: {
    title: 'Ella Floating View',
    description: 'More than a stay. A higher view.',
    images: ['/images/destinations/peak.webp']
  }
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#10281d'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <div id="main-content" tabIndex={-1}>{children}</div>
        <BookingPanel />
        <MobileBookBar />
      </body>
    </html>
  );
}


