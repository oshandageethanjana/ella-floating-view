'use client';

import Image from 'next/image';
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

export function PageHero({ eyebrow, title, text, image = '/images/destinations/peak.webp' }: { eyebrow: string; title: string; text?: string; image?: string }) {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('[data-hero-copy] > *', { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 1, stagger: .1, ease: 'power3.out', delay: .12 });
      gsap.fromTo('[data-hero-img]', { scale: 1.05 }, { scale: 1, duration: 1.8, ease: 'power2.out' });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative min-h-[78svh] overflow-hidden bg-ink text-white">
      <div data-hero-img className="absolute inset-0">
        <Image quality={90} src={image} alt="" fill priority className="object-cover" sizes="100vw" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/34 via-black/12 to-black/58" />
      <div className="relative mx-auto flex min-h-[78svh] max-w-[1500px] items-end px-5 pb-16 pt-36 sm:px-8 sm:pb-20 lg:px-12 lg:pb-24">
        <div data-hero-copy className="max-w-[920px]">
          <p className="mb-6 text-[10px] font-semibold uppercase tracking-[.22em] text-white/62">{eyebrow}</p>
          <h1 className="text-[clamp(2.8rem,6vw,6.5rem)] font-medium leading-[.91] tracking-[-.055em]">{title}</h1>
          {text && <p className="mt-7 max-w-xl text-sm leading-7 text-white/72 sm:text-[15px]">{text}</p>}
        </div>
      </div>
    </section>
  );
}


