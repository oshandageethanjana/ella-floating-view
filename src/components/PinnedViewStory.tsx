'use client';

import Image from 'next/image';
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

const story = [
  {
    eyebrow: 'Ella Floating View',
    title: 'The view stays. Everything else keeps moving.',
    text: 'A calm mountain backdrop while the story moves over it.'
  },
  {
    eyebrow: 'Scenic mountain views',
    title: 'Wake up to a different pace.',
    text: 'Comfortable stays, peaceful surroundings, and breakfast included.'
  },
  {
    eyebrow: 'More Than a Stay. A Higher View.',
    title: 'Keep Ella in the frame.',
    text: 'A simple place to stay, slow down and enjoy the surroundings.'
  }
];

export function PinnedViewStory() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = root.current;
    if (!section || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const image = section.querySelector('[data-fixed-image]');
      if (image) {
        gsap.fromTo(
          image,
          { scale: 1.04 },
          {
            scale: 1.11,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: 'bottom bottom',
              scrub: true
            }
          }
        );
      }

      gsap.utils.toArray<HTMLElement>('[data-story-card]').forEach((card) => {
        const inner = card.querySelector('[data-story-inner]');
        if (!inner) return;
        gsap.fromTo(
          inner,
          { autoAlpha: 0, y: 80 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 70%',
              end: 'top 35%',
              scrub: 0.8
            }
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative h-[300vh] bg-[#0d1712] text-white">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div data-fixed-image className="absolute inset-0 will-change-transform">
          <Image
            src="/images/destinations/peak.webp"
            alt="Ella mountain view"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-black/38" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/12 via-black/8 to-black/45" />
        <div className="absolute left-5 top-1/2 hidden -translate-y-1/2 text-[9px] font-semibold uppercase tracking-[.28em] text-white/45 lg:block lg:left-12 [writing-mode:vertical-rl]">
          Scroll to explore
        </div>
      </div>

      <div className="absolute inset-0 z-10">
        {story.map((item, index) => (
          <div
            data-story-card
            key={item.title}
            className="relative flex h-screen items-center px-5 sm:px-8 lg:px-12"
          >
            <div
              data-story-inner
              className={`w-full max-w-[1500px] ${
                index === 1 ? 'ml-auto text-right' : index === 2 ? 'mx-auto text-center' : ''
              }`}
            >
              <div
                className={`max-w-[880px] ${
                  index === 1 ? 'ml-auto' : index === 2 ? 'mx-auto' : ''
                }`}
              >
                <div className={`mb-8 flex items-center gap-4 ${index === 1 ? 'justify-end' : index === 2 ? 'justify-center' : ''}`}>
                  <span className="h-px w-10 bg-white/45" />
                  <p className="text-[10px] font-semibold uppercase tracking-[.22em] text-white/62">{item.eyebrow}</p>
                </div>
                <h2 className="text-[clamp(2.7rem,6.2vw,6.8rem)] font-medium leading-[.94] tracking-[-.05em] text-white">
                  {item.title}
                </h2>
                <p className={`mt-7 max-w-xl text-sm leading-7 text-white/68 sm:text-[15px] ${index === 1 ? 'ml-auto' : index === 2 ? 'mx-auto' : ''}`}>
                  {item.text}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}


