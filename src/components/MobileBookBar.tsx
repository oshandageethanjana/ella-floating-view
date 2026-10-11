'use client';

import { BookingTrigger } from '@/components/BookingTrigger';

export function MobileBookBar() {
  return (
    <div className="fixed inset-x-3 z-40 border border-white/18 bg-[#10281d]/96 p-2 text-white shadow-2xl lg:hidden" style={{ bottom: 'max(12px, env(safe-area-inset-bottom))' }}>
      <div className="flex min-w-0 items-center justify-between gap-3 pl-3">
        <div className="min-w-0">
          <div className="truncate text-[9px] font-bold uppercase tracking-[.16em] text-white/45">Ella, Sri Lanka</div>
          <div className="mt-1 truncate text-xs">Rates from LKR 8,000</div>
        </div>
        <BookingTrigger className="shrink-0 bg-white px-5 py-3 text-[10px] font-bold uppercase tracking-[.16em] text-ink">Book now</BookingTrigger>
      </div>
    </div>
  );
}


