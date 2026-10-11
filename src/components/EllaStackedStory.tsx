'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { site } from '@/data/site';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

const layers = [
  {
    kicker: 'The setting',
    title: 'Waterfall Road. Ella.',
    text: 'A quiet stay in Ella Town, surrounded by the green mountain landscape of Sri Lanka.',
    image: '/images/destinations/peak.webp',
    detail: site.address,
    position: 'center 48%',
  },
  {
    kicker: 'The stay',
    title: 'Wake up to the mountains.',
    text: 'Double, Deluxe Double and Family room options with breakfast included.',
    image: '/images/terrace-enhanced.webp',
    detail: 'Double · Deluxe Double · Family',
    position: 'center center',
  },
  {
    kicker: 'Explore Ella',
    title: 'Stay close to Ella.',
    text: "A simple base for discovering Ella's scenery, viewpoints and well-known places.",
    image: '/images/property-enhanced.webp',
    detail: 'Ella · Sri Lanka',
    position: 'center center',
    cta: true,
  },
];

export function EllaStackedStory() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = root.current;
    if (!section || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>('[data-stack-panel]');

      panels.forEach((panel) => {
        const image = panel.querySelector<HTMLElement>('[data-stack-image]');
        const content = panel.querySelector<HTMLElement>('[data-stack-content]');

        if (image) {
          gsap.fromTo(
            image,
            { scale: 1.08 },
            {
              scale: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: panel,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.7,
              },
            }
          );
        }

        if (content) {
          gsap.fromTo(
            content,
            { y: 42, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.9,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: panel,
                start: 'top 72%',
                once: true,
              },
            }
          );
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative isolate bg-black">
      {layers.map((layer, index) => (
        <article
          key={layer.title}
          data-stack-panel
          className="sticky top-0 h-[100svh] min-h-[640px] w-full overflow-hidden bg-[#102018]"
          style={{ zIndex: index + 1 }}
        >
          <div data-stack-image className="absolute inset-0 will-change-transform">
            <Image
              src={layer.image}
              alt=""
              fill
              priority={index === 0}
              className="object-cover"
              style={{ objectPosition: layer.position }}
              sizes="100vw"
            />
          </div>

          <div className="absolute inset-0 bg-black/18" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/26 via-black/5 to-black/70" />
          {index > 0 && <div className="absolute inset-x-0 top-0 h-px bg-white/20" />}

          <div className="relative mx-auto flex h-full max-w-[1600px] flex-col justify-between px-5 pb-8 pt-28 text-white sm:px-8 sm:pb-10 lg:px-12 lg:pb-12 lg:pt-32">
            <div className="flex items-start justify-between gap-6">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-white/55 sm:w-12" />
                <p className="text-[10px] font-semibold uppercase tracking-[.2em] text-white/74">{layer.kicker}</p>
              </div>
              <p className="text-[10px] font-semibold uppercase tracking-[.18em] text-white/58">0{index + 1} / 03</p>
            </div>

            <div data-stack-content className="max-w-[900px] pb-[5vh] sm:pb-[7vh]">
              <p className="mb-5 max-w-2xl text-[10px] font-semibold uppercase tracking-[.18em] text-white/58">{layer.detail}</p>
              <h3 className="max-w-[860px] text-[clamp(2.5rem,5.8vw,6.5rem)] font-medium leading-[.92] tracking-[-.05em] text-white">
                {layer.title}
              </h3>
              <p className="mt-6 max-w-xl text-sm leading-7 text-white/76 sm:text-[15px]">{layer.text}</p>

              {index === 0 && (
                <div className="mt-7 flex max-w-xl items-start gap-3 text-[10px] uppercase tracking-[.14em] text-white/62">
                  <MapPin size={16} strokeWidth={1.5} className="mt-0.5 shrink-0" />
                  <span>{site.address}</span>
                </div>
              )}

              {layer.cta && (
                <Link
                  href="/explore"
                  className="mt-8 inline-flex items-center gap-3 border-b border-white/70 pb-1 text-[10px] font-semibold uppercase tracking-[.18em] text-white transition-opacity hover:opacity-65"
                >
                  Explore Ella <ArrowUpRight size={15} />
                </Link>
              )}
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}


