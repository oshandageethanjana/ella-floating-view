import Link from 'next/link';
import { ArrowUpRight, MapPin, Mountain, UtensilsCrossed } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { EditorialImage } from '@/components/EditorialImage';
import { SectionHeading } from '@/components/SectionHeading';
import { FinalBookingCta } from '@/components/FinalBookingCta';
import { site } from '@/data/site';

export const metadata = { title: 'About' };

export default function AboutPage() {
  return (
    <main className="bg-paper" id="main-content">
      <Header dark />
      <PageHero eyebrow="Ella Floating View" title="More Than a Stay. A Higher View." text="A garden in the hills, breakfast with a view and a little time to yourself." image="/images/gallery/garden-corner.webp" />

      <section className="mx-auto max-w-[1380px] px-5 py-28 sm:px-8 lg:px-12 lg:py-44">
        <div className="grid items-center gap-16 lg:grid-cols-[1.08fr_.92fr] lg:gap-28">
          <EditorialImage src="/images/property-enhanced.webp" alt="Ella Floating View property" className="min-h-[620px] lg:min-h-[820px]" sizes="(max-width: 1024px) 100vw, 55vw" />
          <div className="lg:px-4">
            <SectionHeading eyebrow="Our place" title="A stay on Waterfall Road, Ella." text="Ella Floating View is located in Ella Town, Sri Lanka. Our rooms include Double, Deluxe Double and Family mountain-view room options, with breakfast included in every room rate." />
            <Reveal className="mt-10 border-y border-ink/12 py-7">
              <p className="text-[10px] font-semibold uppercase tracking-[.18em] text-ink/38">Direct contact</p>
              <p className="mt-3 text-sm text-ink/70">{site.phone}</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-ivory py-28 lg:py-40">
        <div className="mx-auto max-w-[1480px] px-5 sm:px-8 lg:px-12">
          <SectionHeading eyebrow="What defines the stay" title="The essentials, kept simple." align="center" />
          <div className="mt-16 grid border-y border-ink/12 md:grid-cols-3">
            <Reveal className="py-10 md:pr-10">
              <Mountain size={21} strokeWidth={1.4} className="text-ink/42" />
              <p className="mt-8 text-[10px] font-semibold uppercase tracking-[.2em] text-ink/38">Mountain views</p>
              <p className="mt-4 text-2xl font-medium tracking-[-.035em]">The landscape is part of the stay.</p>
            </Reveal>
            <Reveal className="border-t border-ink/12 py-10 md:border-l md:border-t-0 md:px-10" delay={.08}>
              <UtensilsCrossed size={21} strokeWidth={1.4} className="text-ink/42" />
              <p className="mt-8 text-[10px] font-semibold uppercase tracking-[.2em] text-ink/38">Breakfast included</p>
              <p className="mt-4 text-2xl font-medium tracking-[-.035em]">A lovely start to every morning.</p>
            </Reveal>
            <Reveal className="border-t border-ink/12 py-10 md:border-l md:border-t-0 md:pl-10" delay={.16}>
              <MapPin size={21} strokeWidth={1.4} className="text-ink/42" />
              <p className="mt-8 text-[10px] font-semibold uppercase tracking-[.2em] text-ink/38">Ella Town</p>
              <p className="mt-4 text-2xl font-medium tracking-[-.035em]">Waterfall Road, Ella, Sri Lanka.</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1480px] px-5 py-28 sm:px-8 lg:px-12 lg:py-44">
        <div className="grid gap-5 md:grid-cols-12 lg:gap-7">
          <EditorialImage src="/images/destinations/peak.webp" alt="Ella mountain view" className="min-h-[580px] md:col-span-8 lg:min-h-[760px]" sizes="65vw" />
          <div className="flex min-h-[580px] items-end bg-[#193b2c] p-7 text-white md:col-span-4 sm:p-9 lg:min-h-[760px] lg:p-12">
            <Reveal>
              <p className="text-[10px] font-semibold uppercase tracking-[.22em] text-white/42">The setting</p>
              <h2 className="mt-6 text-[clamp(2.4rem,4.2vw,4.7rem)] font-medium leading-[.95] tracking-[-.05em]">Ella outside. A comfortable stay inside.</h2>
              <Link href="/gallery" className="mt-8 inline-flex items-center gap-2 border-b border-white/55 pb-1 text-[10px] font-semibold uppercase tracking-[.18em]">View gallery <ArrowUpRight size={14} /></Link>
            </Reveal>
          </div>
          <EditorialImage src="/images/room-enhanced.webp" alt="Room at Ella Floating View" className="min-h-[430px] md:col-span-5 lg:min-h-[560px]" sizes="42vw" />
          <EditorialImage src="/images/gallery/misty-morning.webp" alt="A quiet morning on the terrace at Ella Floating View" className="min-h-[430px] md:col-span-7 lg:min-h-[560px]" sizes="58vw" />
        </div>
      </section>

      <FinalBookingCta />
      <Footer />
    </main>
  );
}





