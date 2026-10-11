'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { BookingTrigger } from '@/components/BookingTrigger';
import type { Room } from '@/types';
import { roomVisual } from '@/lib/room-visual';

export function RoomShowcase({ rooms }: { rooms: Room[] }) {
  const [index, setIndex] = useState(0);
  if (!rooms.length) return null;
  const room = rooms[index];
  const visual = roomVisual(room);
  const move = (direction: number) => setIndex(previous => (previous + direction + rooms.length) % rooms.length);
  return <div className="room-showcase" role="region" aria-roledescription="carousel" aria-label="Mountain-view rooms">
    <div className="room-showcase-window"><article className="room-showcase-slide" key={room.slug} aria-roledescription="slide" aria-label={`${index + 1} of ${rooms.length}`}>
      <div className="room-showcase-photo"><Image quality={90} src={visual.src} alt={visual.alt} fill sizes="(max-width: 700px) 100vw, 48vw" className="object-cover" /><span>{visual.caption}</span></div>
      <div className="room-showcase-copy"><p className="eyebrow">A mountain view. A slower morning.</p><h3>{room.name}</h3><p>{room.description}</p><div className="showcase-price">LKR {room.priceLkr.toLocaleString()}<span>{room.breakfastIncluded ? 'Breakfast included' : room.eyebrow}</span></div><Link href={`/rooms/${room.slug}`} className="text-link">Explore this room <ArrowUpRight size={16} /></Link><BookingTrigger detail={{room: room.name}} className="showcase-book">Ask about availability <ArrowUpRight size={14} /></BookingTrigger></div>
    </article></div>
    <div className="showcase-controls"><span aria-live="polite" aria-atomic="true"><strong>{String(index+1).padStart(2,'0')}</strong> / {String(rooms.length).padStart(2,'0')}</span><div className="showcase-progress" aria-hidden="true"><span style={{width:`${((index+1)/rooms.length)*100}%`}} /></div><div><button type="button" onClick={()=>move(-1)} aria-label="Previous room"><ArrowLeft size={31} strokeWidth={1} /></button><button type="button" onClick={()=>move(1)} aria-label="Next room"><ArrowRight size={31} strokeWidth={1} /></button></div></div>
  </div>;
}


