'use client';

import { useLayoutEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Room } from '@/types';
import { RoomCard } from '@/components/RoomCard';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

export function RoomSlider({ rooms }: { rooms: Room[] }) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const cards = el.querySelectorAll('[data-room-slide]');
    const ctx = gsap.context(() => {
      gsap.fromTo(cards, { autoAlpha: 0, y: 54 }, {
        autoAlpha: 1,
        y: 0,
        duration: 1,
        stagger: 0.11,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 84%', once: true }
      });
    }, el);
    return () => ctx.revert();
  }, []);

  function move(direction: number) {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: direction * Math.min(el.clientWidth * 0.86, 560), behavior: 'smooth' });
  }

  return (
    <div ref={root}>
      <div ref={track} className="smooth-track no-scrollbar -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 sm:-mx-8 sm:px-8 lg:-mx-12 lg:gap-7 lg:px-12">
        {rooms.map((room, index) => (
          <div data-room-slide key={room.slug} className="w-[84vw] max-w-[490px] shrink-0 snap-start sm:w-[58vw] lg:w-[31vw]">
            <RoomCard room={room} index={index} />
          </div>
        ))}
      </div>
      <div className="mt-8 flex items-center justify-between border-t border-ink/10 pt-5">
        <span className="text-[10px] font-semibold uppercase tracking-[.18em] text-ink/35">Swipe or drag to explore</span>
        <div className="flex gap-2">
          <button onClick={() => move(-1)} className="grid h-12 w-12 place-items-center border border-ink/15 transition hover:bg-ink hover:text-white" aria-label="Previous rooms"><ChevronLeft size={18} /></button>
          <button onClick={() => move(1)} className="grid h-12 w-12 place-items-center border border-ink/15 transition hover:bg-ink hover:text-white" aria-label="Next rooms"><ChevronRight size={18} /></button>
        </div>
      </div>
    </div>
  );
}


