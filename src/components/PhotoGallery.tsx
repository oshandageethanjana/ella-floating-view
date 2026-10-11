'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { GalleryItem } from '@/types';

const groups = ['Dining', 'The stay', 'Slow moments', 'Dining', 'Slow moments', 'Dining', 'The stay'];

export function PhotoGallery({ items }: { items: GalleryItem[] }) {
  const [filter, setFilter] = useState('All photographs');
  const [active, setActive] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const previousOverflow = useRef('');
  const opener = useRef<HTMLButtonElement | null>(null);
  const visible = items.map((item, index) => ({ item, index })).filter(({ index }) => filter === 'All photographs' || groups[index] === filter);
  function move(direction: number) { setActive(current => (current + direction + items.length) % items.length); }
  function close() { dialog.current?.close(); }
  function open(index: number, button: HTMLButtonElement) {
    opener.current = button;
    setActive(index);
    previousOverflow.current = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.current?.showModal();
  }
  useEffect(() => { const modal = dialog.current; return () => { if (modal?.open) document.body.style.overflow = previousOverflow.current; }; }, []);
  return <section className="photo-gallery shell">
    <div className="gallery-intro"><div><p className="eyebrow">A closer look</p><h2>Our days,<br /><em>in photographs.</em></h2></div><p className="body-copy">Good food, green hills and time to yourself. Explore seven moments from our place in Ella.</p></div>
    <div className="gallery-toolbar"><div role="group" aria-label="Filter photographs">{['All photographs', 'The stay', 'Dining', 'Slow moments'].map(category => <button key={category} aria-pressed={filter === category} onClick={() => setFilter(category)}>{category}</button>)}</div><span aria-live="polite">{visible.length} photographs</span></div>
    <div className="photo-mosaic">{visible.map(({ item, index }) => <button key={item.src} className={`photo-tile photo-tile-${index}`} onClick={event => open(index, event.currentTarget)} aria-label={`View photograph: ${item.label}`}>
      <Image quality={90} src={item.src} alt={item.alt} fill sizes="(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 60vw" className="object-cover" />
      <span className="tile-shade" /><span className="tile-caption"><span><small>{String(index + 1).padStart(2, '0')} / {groups[index]}</small><strong>{item.label}</strong></span><span className="tile-open"><ArrowUpRight size={20} /></span></span>
    </button>)}</div>
    <p className="gallery-hint">Select a photograph to see the full frame.</p>
    <dialog ref={dialog} className="gallery-dialog" aria-labelledby="gallery-caption" onClick={event => { if (event.target === event.currentTarget) close(); }} onClose={() => { document.body.style.overflow = previousOverflow.current; opener.current?.focus(); }} onKeyDown={event => { if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1); } if (event.key === 'ArrowRight') { event.preventDefault(); move(1); } }}>
      <div className="lightbox-body"><div className="lightbox-top"><span>{String(active + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}</span><button autoFocus onClick={close} aria-label="Close photograph"><X size={24} /></button></div>
        <div className="lightbox-image"><Image quality={95} src={items[active].src} alt={items[active].alt} fill sizes="95vw" className="object-contain" /></div>
        <div className="lightbox-bottom"><div aria-live="polite"><p className="eyebrow">{groups[active]}</p><h3 id="gallery-caption">{items[active].label}</h3></div><div className="lightbox-controls"><button onClick={() => move(-1)} aria-label="Previous photograph"><ChevronLeft size={23} /></button><button onClick={() => move(1)} aria-label="Next photograph"><ChevronRight size={23} /></button></div></div>
      </div>
    </dialog>
  </section>;
}
