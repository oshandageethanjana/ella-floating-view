'use client';

import { FormEvent, useEffect, useState } from 'react';
import { getSupabaseClient } from '@/lib/supabase';

type AdminRoom = { id: string; name: string; price_lkr: number; is_published: boolean };

export default function AdminPage() {
  const supabase = getSupabaseClient();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authed, setAuthed] = useState(false);
  const [rooms, setRooms] = useState<AdminRoom[]>([]);
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => setAuthed(Boolean(data.session)));
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => setAuthed(Boolean(session)));
    return () => sub.subscription.unsubscribe();
  }, [supabase]);

  useEffect(() => {
    if (!supabase || !authed) return;
    supabase.from('rooms').select('id,name,price_lkr,is_published').order('sort_order').then(({ data }) => setRooms((data as AdminRoom[]) || []));
  }, [supabase, authed]);

  async function login(e: FormEvent) {
    e.preventDefault();
    if (!supabase) return;
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setStatus(error ? error.message : 'Signed in');
  }

  async function save(room: AdminRoom) {
    if (!supabase) return;
    const { error } = await supabase.from('rooms').update({ price_lkr: room.price_lkr, is_published: room.is_published }).eq('id', room.id);
    setStatus(error ? error.message : `Saved ${room.name}`);
  }

  if (!supabase) return <Shell><h1 className="font-serif text-5xl">Admin is ready to connect.</h1><p className="mt-5 max-w-xl text-sm leading-7 text-ink/60">Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local, run supabase/schema.sql, then reload this page.</p></Shell>;

  if (!authed) return <Shell><form onSubmit={login} className="max-w-md rounded-3xl bg-white p-8 shadow-soft"><p className="text-[10px] font-bold uppercase tracking-[.2em] text-ink/45">Hotel admin</p><h1 className="mt-4 font-serif text-5xl">Welcome back.</h1><input className="mt-8 w-full rounded-xl border border-ink/15 px-4 py-3 text-sm outline-none" type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required/><input className="mt-3 w-full rounded-xl border border-ink/15 px-4 py-3 text-sm outline-none" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required/><button className="mt-5 w-full rounded-xl bg-ink px-5 py-3 text-xs font-bold uppercase tracking-[.18em] text-white">Sign in</button>{status && <p className="mt-4 text-xs text-ink/55">{status}</p>}</form></Shell>;

  return <Shell><div className="flex items-end justify-between gap-5"><div><p className="text-[10px] font-bold uppercase tracking-[.2em] text-ink/45">Hotel admin</p><h1 className="mt-4 font-serif text-5xl">Room rates</h1></div><button onClick={() => supabase.auth.signOut()} className="text-xs font-bold uppercase tracking-[.15em]">Sign out</button></div><div className="mt-10 grid gap-4">{rooms.map((room) => <div key={room.id} className="grid items-center gap-4 rounded-2xl border border-ink/10 bg-white p-5 sm:grid-cols-[1fr_180px_auto_auto]"><strong className="text-sm">{room.name}</strong><input type="number" value={room.price_lkr} onChange={(e)=>setRooms(v=>v.map(r=>r.id===room.id?{...r,price_lkr:Number(e.target.value)}:r))} className="rounded-xl border border-ink/10 px-3 py-2 text-sm"/><label className="flex items-center gap-2 text-xs"><input type="checkbox" checked={room.is_published} onChange={(e)=>setRooms(v=>v.map(r=>r.id===room.id?{...r,is_published:e.target.checked}:r))}/> Published</label><button onClick={()=>save(room)} className="rounded-xl bg-ink px-4 py-2 text-[10px] font-bold uppercase tracking-[.15em] text-white">Save</button></div>)}</div>{status && <p className="mt-5 text-xs text-ink/55">{status}</p>}</Shell>;
}

function Shell({ children }: { children: React.ReactNode }) { return <main className="min-h-screen bg-ivory px-5 py-16 text-ink sm:px-8"><div className="mx-auto max-w-5xl"><a href="/" className="text-[10px] font-bold uppercase tracking-[.18em] text-ink/45">← Website</a><div className="mt-12">{children}</div></div></main>; }


