'use client';

import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { BookingForm } from '@/components/BookingForm';

type BookingDetail = {
  checkIn?: string;
  checkOut?: string;
  guests?: string;
  room?: string;
};

export function BookingPanel() {
  const [open, setOpen] = useState(false);
  const [detail, setDetail] = useState<BookingDetail>({});
  const dialog = useRef<HTMLElement>(null);

  useEffect(() => {
    function handle(event: Event) {
      const bookingEvent = event as CustomEvent<BookingDetail>;
      setDetail(bookingEvent.detail || {});
      setOpen(true);
    }
    window.addEventListener('efv:booking-open', handle as EventListener);
    return () => window.removeEventListener('efv:booking-open', handle as EventListener);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    const previousFocus = document.activeElement as HTMLElement | null;
    const content = document.getElementById('main-content');
    if (content) content.inert = true;
    document.body.style.overflow = 'hidden';
    dialog.current?.querySelector<HTMLButtonElement>('button')?.focus();
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false);
      if (event.key === 'Tab') {
        const controls = Array.from(dialog.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input:not([tabindex="-1"]), select, textarea') || []).filter(el => el.getClientRects().length);
        const first = controls[0], last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    }
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      if (content) content.inert = false;
      previousFocus?.focus();
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div className={`fixed inset-0 z-[120] ${open ? 'pointer-events-auto' : 'pointer-events-none'}`} aria-hidden={!open} inert={!open}>
      <button
        type="button"
        aria-label="Close booking panel"
        onClick={() => setOpen(false)}
        className={`absolute inset-0 bg-[#0c1712]/28 transition-opacity duration-500 ${open ? 'opacity-100' : 'opacity-0'}`}
      />
      <aside
        ref={dialog}
        role="dialog"
        aria-modal="true"
        aria-label="Booking request"
        className={`absolute inset-y-0 right-0 w-full max-w-[640px] overflow-y-auto bg-[#f7f4ec] shadow-[-28px_0_80px_rgba(12,23,18,.18)] transition-transform duration-500 ease-[cubic-bezier(.22,.75,.18,1)] ${open ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ paddingTop: 'max(24px, env(safe-area-inset-top))', paddingBottom: 'max(24px, env(safe-area-inset-bottom))' }}
      >
        <div className="px-5 sm:px-8 lg:px-10">
          <div className="flex items-start justify-between gap-6 border-b border-ink/10 pb-7">
            <div className="max-w-md">
              <p className="text-[10px] font-semibold uppercase tracking-[.22em] text-ink/38">Check availability</p>
              <h2 className="mt-3 text-[clamp(2rem,5vw,3.6rem)] font-medium leading-[.96] tracking-[-.05em]">Plan your Ella stay.</h2>
              <p className="mt-4 text-sm leading-6 text-ink/56">Choose valid future dates and send a booking request directly to Ella Floating View.</p>
            </div>
            <button type="button" onClick={() => setOpen(false)} className="grid h-11 w-11 shrink-0 place-items-center border border-ink/12 text-ink transition hover:bg-white" aria-label="Close booking panel">
              <X size={20} strokeWidth={1.6} />
            </button>
          </div>
          <div className="py-8 sm:py-10">
            <BookingForm
              key={`${detail.checkIn || ''}-${detail.checkOut || ''}-${detail.guests || ''}-${detail.room || ''}`}
              initialCheckIn={detail.checkIn || ''}
              initialCheckOut={detail.checkOut || ''}
              initialGuests={detail.guests || '2'}
              initialRoom={detail.room || ''}
            />
          </div>
        </div>
      </aside>
    </div>
  );
}


