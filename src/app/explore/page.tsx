import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PageHero } from '@/components/PageHero';
import { attractions, site } from '@/data/site';
import { Reveal } from '@/components/Reveal';
import { EditorialImage } from '@/components/EditorialImage';
import { SectionHeading } from '@/components/SectionHeading';
import { FinalBookingCta } from '@/components/FinalBookingCta';

export const metadata = { title: 'Explore Ella' };

export default function ExplorePage() {
  return (
    <main className="bg-paper">
      <Header dark />
      <PageHero eyebrow="Explore Ella" title="See more of Ella during your stay." text="A few well-known places to add to your Ella plan." image="/images/destinations/peak.webp" />

      <section className="mx-auto max-w-[1320px] px-5 py-28 sm:px-8 lg:px-12 lg:py-44">
        <div className="grid gap-14 lg:grid-cols-[.82fr_1.18fr] lg:gap-28">
          <SectionHeading eyebrow="Ella journeys" title="Start with the places Ella is known for." text="Little Adam’s Peak, Nine Arches Bridge and Ella Rock are three familiar names to consider while planning time in the area." />
          <Reveal className="lg:pt-16">
            <div className="border-y border-ink/12 py-7 text-sm leading-7 text-ink/58">
              <p>Stay base: {site.address}</p>
              <p className="mt-2">Contact Ella Floating View directly for room availability and booking questions.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1480px] px-5 pb-28 sm:px-8 lg:px-12 lg:pb-44">
        <div className="grid gap-28 lg:gap-40">
          {attractions.map((a, i) => (
            <article key={a.title} className={`grid items-center gap-14 lg:grid-cols-[1.08fr_.92fr] lg:gap-28 ${i % 2 ? 'lg:grid-cols-[.92fr_1.08fr]' : ''}`}>
              <EditorialImage src={a.image} alt={a.title} className={`min-h-[560px] lg:min-h-[760px] ${i % 2 ? 'lg:order-2' : ''}`} sizes="(max-width: 1024px) 100vw, 54vw" />
              <Reveal className="lg:px-6">
                <span className="text-[10px] font-semibold uppercase tracking-[.22em] text-ink/35">0{i + 1} · Explore Ella</span>
                <h2 className="mt-7 text-[clamp(2.7rem,5vw,5.3rem)] font-medium leading-[.94] tracking-[-.05em]">{a.title}</h2>
                <p className="mt-7 max-w-xl text-sm leading-7 text-ink/58">{a.text}</p>
                <Link href="/contact" className="mt-8 inline-flex items-center gap-2 border-b border-ink/70 pb-1 text-[10px] font-semibold uppercase tracking-[.18em]">Ask about your stay <ArrowUpRight size={14} /></Link>
              </Reveal>
            </article>
          ))}
        </div>
      </section>

      <section className="relative min-h-[84svh] overflow-hidden bg-ink text-white">
        <Image quality={90} src="/images/terrace-enhanced.webp" alt="Ella Floating View surroundings" fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-black/42" />
        <div className="relative mx-auto flex min-h-[84svh] max-w-[1480px] items-end px-5 pb-16 pt-32 sm:px-8 lg:px-12 lg:pb-24">
          <Reveal className="max-w-[920px]">
            <p className="text-[10px] font-semibold uppercase tracking-[.22em] text-white/56">Return to Waterfall Road</p>
            <h2 className="mt-6 text-[clamp(3rem,6.2vw,6.8rem)] font-medium leading-[.9] tracking-[-.055em]">Explore Ella. Then come back to the view.</h2>
          </Reveal>
        </div>
      </section>

      <FinalBookingCta />
      <Footer />
    </main>
  );
}


