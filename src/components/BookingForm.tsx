'use client';

import { FormEvent, useMemo, useState } from 'react';
import { ArrowRight, CheckCircle2, Mail, MessageCircle } from 'lucide-react';
import { rooms, site } from '@/data/site';
import { TurnstileWidget } from '@/components/TurnstileWidget';

function localDate(offsetDays = 0) {
  const date = new Date();
  date.setHours(12, 0, 0, 0);
  date.setDate(date.getDate() + offsetDays);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function addDays(dateValue: string, days: number) {
  if (!dateValue) return localDate(days);
  const [year, month, day] = dateValue.split('-').map(Number);
  const date = new Date(year, month - 1, day, 12, 0, 0, 0);
  date.setDate(date.getDate() + days);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

export function BookingForm({ initialCheckIn = '', initialCheckOut = '', initialGuests = '2', initialRoom = '' }: { initialCheckIn?: string; initialCheckOut?: string; initialGuests?: string; initialRoom?: string }) {
  const today = useMemo(() => localDate(0), []);
  const tomorrow = useMemo(() => localDate(1), []);
  const safeInitialCheckIn = initialCheckIn && initialCheckIn >= today ? initialCheckIn : '';
  const safeInitialCheckOut = initialCheckOut && initialCheckOut > (safeInitialCheckIn || today) ? initialCheckOut : '';
  const [form, setForm] = useState({ checkIn: safeInitialCheckIn, checkOut: safeInitialCheckOut, guests: initialGuests, room: initialRoom, name: '', email: '', message: '', website: '' });
  const [state, setState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');
  const roomOptions = useMemo(() => rooms.map((r) => r.name), []);
  const checkOutMin = form.checkIn ? addDays(form.checkIn, 1) : tomorrow;

  function update(key: keyof typeof form, value: string) {
    setForm((before) => {
      const next = { ...before, [key]: value };
      if (key === 'checkIn' && next.checkOut && next.checkOut <= value) next.checkOut = '';
      return next;
    });
  }

  function validateDates() {
    if (!form.checkIn || form.checkIn < today) return 'Check-in must be today or a future date.';
    if (!form.checkOut || form.checkOut <= form.checkIn) return 'Check-out must be after check-in.';
    return '';
  }

  function whatsapp() {
    const dateError = validateDates();
    if (dateError) { setError(dateError); setState('error'); return; }
    const text = encodeURIComponent(`Hello Ella Floating View, I would like to check availability.\n\nName: ${form.name || '-'}\nCheck-in: ${form.checkIn}\nCheck-out: ${form.checkOut}\nGuests: ${form.guests}\nRoom: ${form.room || 'Any available room'}${form.message ? `\nMessage: ${form.message}` : ''}`);
    window.open(`https://wa.me/${site.whatsapp}?text=${text}`, '_blank', 'noopener,noreferrer');
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === 'sending') return;
    const dateError = validateDates();
    if (dateError) { setError(dateError); setState('error'); return; }
    setState('sending'); setError('');
    const target = event.currentTarget;
    const turnstileToken = String(new FormData(target).get('cf-turnstile-response') || '');
    try {
      const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ kind: 'booking', ...form, turnstileToken }) });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data?.message || 'Unable to send your booking request right now.');
      setState('success');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to send your booking request right now.');
      setState('error');
    }
  }

  return (
    <form onSubmit={submit} className="relative border-t border-ink/12 pt-7">
      <div className="mb-9 flex items-center gap-3">
        <Mail size={18} strokeWidth={1.4} />
        <div><p className="text-[10px] font-semibold uppercase tracking-[.2em] text-ink/42">Booking request</p><p className="mt-1 text-sm text-ink/58">Send by email or continue on WhatsApp.</p></div>
      </div>
      <div className="grid gap-x-6 gap-y-7 sm:grid-cols-2">
        <Field label="Check in"><input required min={today} type="date" value={form.checkIn} onChange={(e) => update('checkIn', e.target.value)} /></Field>
        <Field label="Check out"><input required min={checkOutMin} type="date" value={form.checkOut} onChange={(e) => update('checkOut', e.target.value)} /></Field>
        <Field label="Guests"><select value={form.guests} onChange={(e) => update('guests', e.target.value)}>{[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n}</option>)}</select></Field>
        <Field label="Room"><select value={form.room} onChange={(e) => update('room', e.target.value)}><option value="">Any available room</option>{roomOptions.map(r => <option key={r}>{r}</option>)}</select></Field>
        <Field label="Your name"><input required maxLength={80} autoComplete="name" type="text" value={form.name} onChange={(e) => update('name', e.target.value)} /></Field>
        <Field label="Email"><input required maxLength={160} autoComplete="email" type="email" value={form.email} onChange={(e) => update('email', e.target.value)} /></Field>
        <Field label="Message (optional)" wide><textarea maxLength={2000} rows={4} value={form.message} onChange={(e) => update('message', e.target.value)} /></Field>
      </div>
      <label className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">Website<input tabIndex={-1} autoComplete="off" type="text" value={form.website} onChange={(e) => update('website', e.target.value)} /></label>
      <div className="mt-6"><TurnstileWidget /></div>
      {state === 'success' && <div className="mt-5 flex items-center gap-2 bg-[#eef4ec] px-4 py-3 text-sm text-[#1d4a31]"><CheckCircle2 size={17} /> Booking request sent successfully.</div>}
      {state === 'error' && <div className="mt-5 bg-[#fff2ef] px-4 py-3 text-sm text-[#8b2f22]">{error}</div>}
      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        <button type="submit" disabled={state === 'sending'} className="flex min-h-12 items-center justify-center gap-3 bg-ink px-6 py-4 text-[10px] font-semibold uppercase tracking-[.18em] text-white transition-colors hover:bg-forest disabled:cursor-not-allowed disabled:opacity-50">{state === 'sending' ? 'Sending…' : 'Send request'} <ArrowRight size={15} /></button>
        <button type="button" onClick={whatsapp} className="flex min-h-12 items-center justify-center gap-3 border border-ink/18 px-6 py-4 text-[10px] font-semibold uppercase tracking-[.18em] text-ink transition-colors hover:bg-white">WhatsApp <MessageCircle size={15} /></button>
      </div>
    </form>
  );
}

function Field({ label, children, wide = false }: { label: string; children: React.ReactNode; wide?: boolean }) {
  return <label className={`${wide ? 'sm:col-span-2' : ''} min-w-0 block text-[9px] font-semibold uppercase tracking-[.18em] text-ink/38 [&_input]:mt-2 [&_input]:w-full [&_input]:min-w-0 [&_input]:border-0 [&_input]:border-b [&_input]:border-ink/16 [&_input]:bg-transparent [&_input]:px-0 [&_input]:py-3 [&_input]:text-base [&_input]:font-normal [&_input]:normal-case [&_input]:tracking-normal [&_input]:text-ink [&_input]:outline-none [&_select]:mt-2 [&_select]:w-full [&_select]:min-w-0 [&_select]:border-0 [&_select]:border-b [&_select]:border-ink/16 [&_select]:bg-transparent [&_select]:px-0 [&_select]:py-3 [&_select]:text-base [&_select]:font-normal [&_select]:normal-case [&_select]:tracking-normal [&_select]:text-ink [&_select]:outline-none [&_textarea]:mt-2 [&_textarea]:w-full [&_textarea]:min-w-0 [&_textarea]:resize-none [&_textarea]:border-0 [&_textarea]:border-b [&_textarea]:border-ink/16 [&_textarea]:bg-transparent [&_textarea]:px-0 [&_textarea]:py-3 [&_textarea]:text-base [&_textarea]:font-normal [&_textarea]:normal-case [&_textarea]:tracking-normal [&_textarea]:text-ink [&_textarea]:outline-none`}>{label}{children}</label>;
}


