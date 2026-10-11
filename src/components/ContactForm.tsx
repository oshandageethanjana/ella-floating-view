'use client';

import { FormEvent, useState } from 'react';
import { ArrowRight, CheckCircle2, Mail } from 'lucide-react';
import { TurnstileWidget } from '@/components/TurnstileWidget';

const initial = { name: '', email: '', phone: '', message: '', website: '' };

export function ContactForm() {
  const [form, setForm] = useState(initial);
  const [state, setState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  function update(key: keyof typeof form, value: string) { setForm((current) => ({ ...current, [key]: value })); }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === 'sending') return;
    setState('sending');
    setError('');
    const target = event.currentTarget;
    const turnstileToken = String(new FormData(target).get('cf-turnstile-response') || '');
    try {
      const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ kind: 'contact', ...form, turnstileToken }) });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data?.message || 'Unable to send your message right now.');
      setForm(initial);
      setState('success');
      target.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to send your message right now.');
      setState('error');
    }
  }

  return (
    <form onSubmit={submit} className="contact-form relative border-t border-ink/12 pt-7" aria-label="Send a message to Ella Floating View" aria-busy={state === 'sending'}>
      <div className="mb-10 flex items-center gap-3">
        <Mail size={18} strokeWidth={1.4} />
        <div><p className="text-[10px] font-semibold uppercase tracking-[.2em] text-ink/42">Send a message</p><p className="mt-1 text-sm text-ink/58">A question, a plan or just a hello.</p></div>
      </div>
      <div className="grid gap-x-7 gap-y-7 sm:grid-cols-2">
        <Field label="Your name"><input required maxLength={80} autoComplete="name" type="text" value={form.name} onChange={(e) => update('name', e.target.value)} /></Field>
        <Field label="Email"><input required maxLength={160} autoComplete="email" type="email" value={form.email} onChange={(e) => update('email', e.target.value)} /></Field>
        <Field label="Phone (optional)" wide><input maxLength={40} autoComplete="tel" type="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} /></Field>
        <Field label="Message" wide><textarea required maxLength={2000} rows={5} value={form.message} onChange={(e) => update('message', e.target.value)} /></Field>
      </div>
      <label className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">Website<input tabIndex={-1} autoComplete="off" type="text" value={form.website} onChange={(e) => update('website', e.target.value)} /></label>
      <div className="mt-6"><TurnstileWidget /></div>
      {state === 'success' && <div role="status" className="mt-5 flex items-center gap-2 bg-[#eef4ec] px-4 py-3 text-sm text-[#1d4a31]"><CheckCircle2 size={17} /> Message sent successfully.</div>}
      {state === 'error' && <div role="alert" className="mt-5 bg-[#fff2ef] px-4 py-3 text-sm text-[#8b2f22]">{error}</div>}
      <button type="submit" disabled={state === 'sending'} className="mt-8 inline-flex items-center justify-center gap-3 bg-ink px-7 py-4 text-[10px] font-semibold uppercase tracking-[.18em] text-white transition-colors hover:bg-forest disabled:cursor-not-allowed disabled:opacity-50">
        {state === 'sending' ? 'Sending…' : 'Send message'} <ArrowRight size={15} />
      </button>
    </form>
  );
}

function Field({ label, children, wide = false }: { label: string; children: React.ReactNode; wide?: boolean }) {
  return <label className={`block ${wide ? 'sm:col-span-2' : ''} text-[9px] font-semibold uppercase tracking-[.18em] text-ink/38 [&_input]:mt-2 [&_input]:w-full [&_input]:border-0 [&_input]:border-b [&_input]:border-ink/16 [&_input]:bg-transparent [&_input]:px-0 [&_input]:py-3 [&_input]:text-sm [&_input]:font-normal [&_input]:normal-case [&_input]:tracking-normal [&_input]:text-ink [&_input]:outline-none [&_input]:transition-colors focus-within:[&_input]:border-ink/70 [&_textarea]:mt-2 [&_textarea]:w-full [&_textarea]:resize-none [&_textarea]:border-0 [&_textarea]:border-b [&_textarea]:border-ink/16 [&_textarea]:bg-transparent [&_textarea]:px-0 [&_textarea]:py-3 [&_textarea]:text-sm [&_textarea]:font-normal [&_textarea]:normal-case [&_textarea]:tracking-normal [&_textarea]:text-ink [&_textarea]:outline-none focus-within:[&_textarea]:border-ink/70`}>{label}{children}</label>;
}


