import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Room } from '@/types';
import { roomVisual } from '@/lib/room-visual';

export function RoomCard({ room, index = 0 }: { room: Room; index?: number }) {
  const visual = roomVisual(room);
  return (
    <article className="group">
      <Link href={`/rooms/${room.slug}`} className="block overflow-hidden bg-[#d9dccf]">
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image
            quality={90}
            src={visual.src}
            alt={visual.alt}
            fill
            className="object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.035]"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/28 via-transparent to-transparent" />
          <span className="absolute left-5 top-5 text-[10px] font-semibold uppercase tracking-[.18em] text-white">0{index + 1}</span>
          <span className="absolute inset-x-5 bottom-5 text-[10px] text-white">{visual.caption}</span>
        </div>
      </Link>
      <div className="flex items-start justify-between gap-6 border-b border-ink/15 py-5">
        <div>
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[.18em] text-ink/42">{room.eyebrow}</p>
          <h3 className="max-w-sm text-[27px] font-medium leading-[1.04] tracking-[-.035em] text-ink sm:text-[30px]">{room.name}</h3>
          <p className="mt-3 text-sm text-ink/58">LKR {room.priceLkr.toLocaleString()} · Breakfast included</p>
        </div>
        <Link
          href={`/rooms/${room.slug}`}
          className="grid h-11 w-11 shrink-0 place-items-center border border-ink/18 transition-colors duration-300 hover:bg-ink hover:text-white"
          aria-label={`View ${room.name}`}
        >
          <ArrowUpRight size={17} />
        </Link>
      </div>
    </article>
  );
}


