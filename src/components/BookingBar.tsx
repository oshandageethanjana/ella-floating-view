'use client';

import { FormEvent, useMemo, useState } from 'react';
import { ArrowRight } from 'lucide-react';

function localDate(offsetDays = 0) {
  const date = new Date();
  date.setHours(12, 0, 0, 0);
  date.setDate(date.getDate() + offsetDays);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}
function nextDay(value: string) {
  if (!value) return localDate(1);
  const [y,m,d] = value.split('-').map(Number);
  const date = new Date(y,m-1,d,12); date.setDate(date.getDate()+1);
  return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
}

export function BookingBar({ compact = false }: { compact?: boolean }) {
  const today = useMemo(() => localDate(0), []);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2');

  function submit(e: FormEvent) {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('efv:booking-open', { detail: { checkIn, checkOut, guests } }));
  }

  return (
    <form onSubmit={submit} className={`grid bg-paper text-ink shadow-soft ${compact ? 'gap-0 rounded-2xl sm:grid-cols-4' : 'rounded-[24px] p-2 sm:grid-cols-[1fr_1fr_.7fr_auto]'}`}>
      <label className="min-w-0 border-ink/10 px-5 py-3 sm:border-r">
        <span className="block text-[9px] font-bold uppercase tracking-[.2em] text-ink/45">Check in</span>
        <input min={today} required type="date" value={checkIn} onChange={(e) => { const value=e.target.value; setCheckIn(value); if (checkOut && checkOut <= value) setCheckOut(''); }} className="mt-1 w-full min-w-0 bg-transparent text-base outline-none sm:text-sm" />
      </label>
      <label className="min-w-0 border-ink/10 px-5 py-3 sm:border-r">
        <span className="block text-[9px] font-bold uppercase tracking-[.2em] text-ink/45">Check out</span>
        <input min={checkIn ? nextDay(checkIn) : localDate(1)} required type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="mt-1 w-full min-w-0 bg-transparent text-base outline-none sm:text-sm" />
      </label>
      <label className="min-w-0 px-5 py-3">
        <span className="block text-[9px] font-bold uppercase tracking-[.2em] text-ink/45">Guests</span>
        <select value={guests} onChange={(e) => setGuests(e.target.value)} className="mt-1 w-full min-w-0 bg-transparent text-base outline-none sm:text-sm">
          {[1, 2, 3, 4, 5, 6].map((n) => <option key={n} value={n}>{n} {n === 1 ? 'guest' : 'guests'}</option>)}
        </select>
      </label>
      <button type="submit" className="m-1 flex min-h-12 items-center justify-center gap-3 rounded-[18px] bg-ink px-6 py-4 text-[10px] font-bold uppercase tracking-[.18em] text-white transition hover:bg-forest">
        Check availability <ArrowRight size={15} />
      </button>
    </form>
  );
}


