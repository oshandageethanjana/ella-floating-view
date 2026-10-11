'use client';
import { useEffect, useRef } from 'react';

export function HeroVideo() {
  const video = useRef<HTMLVideoElement>(null);
  const allowPlay = useRef(true);
  useEffect(() => {
    const media = video.current;
    if (!media) return;
    allowPlay.current = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    media.autoplay = allowPlay.current;
    media.muted = true;
    if (allowPlay.current) media.play().catch(() => {});
    else media.pause();
  }, []);
  return <video ref={video} className="hero-background-video" autoPlay muted loop playsInline preload="auto" poster="/images/hero-poster.jpg" onCanPlay={() => { if (allowPlay.current) video.current?.play().catch(() => {}); }} aria-hidden="true">
    <source src="/videos/hero.mp4" type="video/mp4" />
  </video>;
}
