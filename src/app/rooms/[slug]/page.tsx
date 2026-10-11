import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Check, Mountain, UtensilsCrossed } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Reveal } from '@/components/Reveal';
import { EditorialImage } from '@/components/EditorialImage';
import { roomVisual } from '@/lib/room-visual';
import { FinalBookingCta } from '@/components/FinalBookingCta';
import { BookingTrigger } from '@/components/BookingTrigger';
import { getRooms } from '@/lib/content';
import { rooms as fallbackRooms } from '@/data/site';

export async function generateStaticParams() { return fallbackRooms.map((room) => ({ slug: room.slug })); }

export default async function RoomDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const rooms = await getRooms();
  const room = rooms.find((r) => r.slug === slug) ?? fallbackRooms.find((r) => r.slug === slug);
  if (!room) notFound();
  const visual = roomVisual(room);
  const otherRooms = rooms.filter((r) => r.slug !== room.slug);

  return (
    <main className="bg-paper" id="main-content">
      <Header dark />
      <section className="relative min-h-[88svh] overflow-hidden bg-ink text-white">
        <Image quality={90} src={visual.src} alt={visual.alt} fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/28 via-black/12 to-black/66" />
        <div className="relative mx-auto flex min-h-[88svh] max-w-[1480px] items-end px-5 pb-16 pt-36 sm:px-8 sm:pb-20 lg:px-12 lg:pb-24">
          <Reveal className="max-w-[1000px]">
            <p className="mb-6 text-[10px] font-semibold uppercase tracking-[.22em] text-white/60">{room.eyebrow} · {visual.caption}</p>
            <h1 className="text-[clamp(2.8rem,6vw,6.6rem)] font-medium leading-[.91] tracking-[-.055em]">{room.name}</h1>
            <p className="mt-7 text-sm text-white/72">LKR {room.priceLkr.toLocaleString()} · Breakfast included</p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1380px] px-5 py-28 sm:px-8 lg:px-12 lg:py-44">
        <div className="grid gap-16 lg:grid-cols-[1.05fr_.65fr] lg:gap-28">
          <Reveal>
            <p className="mb-5 text-[10px] font-semibold uppercase tracking-[.22em] text-ink/40">Room overview</p>
            <h2 className="text-[clamp(2.6rem,5vw,5.3rem)] font-medium leading-[.94] tracking-[-.05em]">A mountain-view stay with breakfast included.</h2>
            <p className="mt-7 max-w-2xl text-sm leading-7 text-ink/58 sm:text-[15px]">{room.description}</p>
            <div className="mt-10 grid gap-0 border-y border-ink/12 sm:grid-cols-2">
              <div className="py-6 sm:pr-8">
                <Mountain size={18} strokeWidth={1.5} className="text-ink/42" />
                <p className="mt-4 text-[9px] font-semibold uppercase tracking-[.2em] text-ink/35">View</p>
                <p className="mt-2 text-sm text-ink/70">Mountain view</p>
              </div>
              <div className="border-t border-ink/12 py-6 sm:border-l sm:border-t-0 sm:pl-8">
                <UtensilsCrossed size={18} strokeWidth={1.5} className="text-ink/42" />
                <p className="mt-4 text-[9px] font-semibold uppercase tracking-[.2em] text-ink/35">Rate basis</p>
                <p className="mt-2 text-sm text-ink/70">Bed & Breakfast</p>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <aside className="h-fit border-t border-ink/12 pt-7 lg:sticky lg:top-32">
              <p className="text-[10px] font-semibold uppercase tracking-[.2em] text-ink/42">Listed rate</p>
              <div className="mt-4 text-[clamp(2.4rem,4vw,4rem)] font-medium tracking-[-.05em]">LKR {room.priceLkr.toLocaleString()}</div>
              <p className="mt-2 text-xs uppercase tracking-[.12em] text-ink/44">Bed & Breakfast</p>
              <div className="mt-8 grid gap-0 border-y border-ink/12">
                {room.features.map((feature) => <div key={feature} className="flex items-center gap-3 border-b border-ink/10 py-4 last:border-b-0 text-sm text-ink/68"><Check size={16} strokeWidth={1.5} /> {feature}</div>)}
              </div>
              <BookingTrigger detail={{ room: room.name }} className="mt-8 flex w-full items-center justify-center gap-3 bg-ink px-6 py-4 text-[10px] font-semibold uppercase tracking-[.18em] text-white transition-colors hover:bg-forest">Check availability <ArrowRight size={15} /></BookingTrigger>
            </aside>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1480px] px-5 pb-28 sm:px-8 lg:px-12 lg:pb-44">
        <div className="grid gap-5 md:grid-cols-12 lg:gap-7">
          <EditorialImage src="/images/gallery/breakfast-together.webp" alt="Guests enjoying breakfast at the property" className="min-h-[540px] md:col-span-7 lg:min-h-[760px]" sizes="(max-width: 768px) 100vw, 58vw" />
          <EditorialImage src="/images/gallery/balcony-morning.webp" alt="A guest enjoying a balcony morning at the property" className="min-h-[540px] md:col-span-5 lg:min-h-[760px]" sizes="(max-width: 768px) 100vw, 42vw" />
          <EditorialImage src="/images/property-enhanced.webp" alt="Ella Floating View property" className="min-h-[420px] md:col-span-5 lg:min-h-[520px]" sizes="(max-width: 768px) 100vw, 42vw" />
          <EditorialImage src="/images/gallery/misty-morning.webp" alt="A quiet moment on the shared terrace" className="min-h-[420px] md:col-span-7 lg:min-h-[520px]" sizes="(max-width: 768px) 100vw, 58vw" />
        </div>
      </section>

      {otherRooms.length > 0 && (
        <section className="bg-ivory py-28 lg:py-40">
          <div className="mx-auto max-w-[1480px] px-5 sm:px-8 lg:px-12">
            <Reveal className="mb-14 max-w-4xl">
              <p className="mb-5 text-[10px] font-semibold uppercase tracking-[.22em] text-ink/40">More rooms</p>
              <h2 className="text-[clamp(2.6rem,5vw,5.4rem)] font-medium leading-[.94] tracking-[-.05em]">Find your perfect mountain stay.</h2>
            </Reveal>
            <div className="room-alternatives">{otherRooms.map(other=><Link key={other.slug} href={`/rooms/${other.slug}`}><div><p className="eyebrow">{other.eyebrow}</p><h3>{other.name}</h3><p>LKR {other.priceLkr.toLocaleString()} · Breakfast included</p></div><ArrowRight size={22}/></Link>)}</div>
          </div>
        </section>
      )}

      <FinalBookingCta />
      <Footer />
    </main>
  );
}



