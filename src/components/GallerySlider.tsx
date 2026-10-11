'use client';

import Image from 'next/image';
import { useLayoutEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { GalleryItem } from '@/types';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

export function GallerySlider({ items }: { items: GalleryItem[] }) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const cards = el.querySelectorAll('[data-gallery-slide]');
    const ctx = gsap.context(() => {
      gsap.fromTo(cards, { autoAlpha: 0, y: 60 }, {
        autoAlpha: 1,
        y: 0,
        duration: 1.1,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 86%', once: true }
      });
    }, el);
    return () => ctx.revert();
  }, []);

  function move(direction: number) {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: direction * Math.min(el.clientWidth * 0.88, 760), behavior: 'smooth' });
  }

  return (
    <div ref={root}>
      <div ref={track} className="smooth-track no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 sm:-mx-8 sm:px-8 lg:-mx-12 lg:gap-6 lg:px-12">
        {items.map((item, index) => (
          <figure data-gallery-slide key={`${item.src}-${index}`} className="group relative h-[520px] w-[88vw] max-w-[820px] shrink-0 snap-center overflow-hidden bg-[#d8dfd4] sm:h-[650px] sm:w-[72vw] lg:h-[720px] lg:w-[62vw]">
            <Image quality={90} src={item.src} alt={item.alt} fill className="object-cover transition-transform duration-[1300ms] ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.025]" sizes="(max-width: 768px) 92vw, 64vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/48 via-transparent to-transparent" />
            <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-6 text-white sm:p-9">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[.18em] text-white/55">0{index + 1}</p>
                <h3 className="mt-2 text-2xl font-medium tracking-[-.03em] sm:text-3xl">{item.label}</h3>
              </div>
              <span className="hidden text-[10px] uppercase tracking-[.18em] text-white/55 sm:block">Ella Floating View</span>
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="mt-8 flex items-center justify-between border-t border-ink/10 pt-5">
        <span className="text-[10px] font-semibold uppercase tracking-[.18em] text-ink/35">Gallery</span>
        <div className="flex gap-2">
          <button onClick={() => move(-1)} className="grid h-12 w-12 place-items-center border border-ink/15 transition hover:bg-ink hover:text-white" aria-label="Previous gallery image"><ChevronLeft size={18} /></button>
          <button onClick={() => move(1)} className="grid h-12 w-12 place-items-center border border-ink/15 transition hover:bg-ink hover:text-white" aria-label="Next gallery image"><ChevronRight size={18} /></button>
        </div>
      </div>
    </div>
  );
}


