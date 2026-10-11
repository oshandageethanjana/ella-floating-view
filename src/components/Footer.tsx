import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, MapPin, Phone } from 'lucide-react';
import { site } from '@/data/site';
import { SocialIcons } from '@/components/SocialIcons';
import { BookingTrigger } from '@/components/BookingTrigger';

export function Footer() {
  return (
    <footer>
      <div className="bg-[#10281d] text-white">
        <div className="mx-auto max-w-[1480px] px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
          <div className="grid min-w-0 gap-14 border-b border-white/14 pb-16 lg:grid-cols-[1.25fr_.72fr_.72fr_1.05fr] lg:gap-10">
            <div className="min-w-0">
              <Link href="/" className="footer-brand"><Image quality={90} src="/images/brand-logo.png" alt="Ella Floating View" width={490} height={490} className="footer-logo" /></Link>
              <p className="mt-7 max-w-sm text-sm leading-7 text-white/60">{site.description}</p><div className="footer-socials"><p>Follow our little corner of Ella</p><SocialIcons /></div>
            </div>
            <div>
              <p className="mb-6 text-[10px] font-semibold uppercase tracking-[.22em] text-white/38">Stay</p>
              <div className="grid gap-3.5 text-sm text-white/72">
                <Link className="transition hover:text-white" href="/rooms">Rooms & rates</Link>
                <Link className="transition hover:text-white" href="/gallery">Gallery</Link>
                <BookingTrigger className="w-fit text-left transition hover:text-white">Book your stay</BookingTrigger>
              </div>
            </div>
            <div>
              <p className="mb-6 text-[10px] font-semibold uppercase tracking-[.22em] text-white/38">Discover</p>
              <div className="grid gap-3.5 text-sm text-white/72">
                <Link className="transition hover:text-white" href="/explore">Explore Ella</Link>
                <Link className="transition hover:text-white" href="/about">Our story</Link>
                <Link className="transition hover:text-white" href="/contact">Contact</Link>
                <Link className="transition hover:text-white" href="/privacy">Privacy</Link><Link className="transition hover:text-white" href="/photo-credits">Photography credits</Link>
              </div>
            </div>
            <div className="min-w-0">
              <p className="mb-6 text-[10px] font-semibold uppercase tracking-[.22em] text-white/38">Ella Floating View</p>
              <div className="grid gap-5 text-sm leading-7 text-white/68">
                <div className="flex min-w-0 items-start gap-3"><MapPin size={17} strokeWidth={1.5} className="mt-1 shrink-0" /><span className="min-w-0 break-words">{site.address}</span></div>
                <a href={`tel:${site.phone.replace(/\s/g, '')}`} className="flex items-center gap-3 transition hover:text-white"><Phone size={17} strokeWidth={1.5} /><span>{site.phone}</span></a>
                <BookingTrigger className="mt-2 inline-flex w-fit items-center gap-2 border-b border-white/42 pb-1 text-[10px] font-semibold uppercase tracking-[.18em] text-white">Check availability <ArrowUpRight size={14} /></BookingTrigger>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 pt-8 text-[10px] uppercase tracking-[.12em] text-white/36 sm:flex-row sm:items-center sm:justify-between">
            <span>© {new Date().getFullYear()} Ella Floating View</span>
            <span>A little closer to nature · Ella, Sri Lanka</span>
          </div>
        </div>
      </div>
    </footer>
  );
}





