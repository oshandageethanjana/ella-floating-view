'use client';

import Image from 'next/image';
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

export function EditorialImage({
  src,
  alt,
  className = '',
  imageClassName = '',
  sizes = '100vw',
  priority = false,
  children
}: {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
  children?: React.ReactNode;
}) {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const image = el.querySelector<HTMLElement>('[data-editorial-image]');
    if (!image) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { clipPath: 'inset(7% 0 7% 0)' },
        {
          clipPath: 'inset(0% 0 0% 0)',
          duration: 1.25,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true }
        }
      );
      gsap.fromTo(
        image,
        { scale: 1.08, yPercent: -1.5 },
        {
          scale: 1,
          yPercent: 1.5,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 0.7 }
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className={`relative overflow-hidden bg-[#dce1d8] ${className}`}>
      <div data-editorial-image className="absolute inset-[-2%] will-change-transform">
        <Image quality={90} src={src} alt={alt} fill priority={priority} className={`object-cover ${imageClassName}`} sizes={sizes} />
      </div>
      {children}
    </div>
  );
}


