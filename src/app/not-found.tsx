import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function NotFound() {
  return (
    <main className="bg-paper">
      <Header />
      <section className="mx-auto flex min-h-[80svh] max-w-[1180px] items-center px-5 pb-24 pt-36 sm:px-8">
        <div className="max-w-4xl">
          <p className="text-[10px] font-semibold uppercase tracking-[.22em] text-ink/40">404 · Ella Floating View</p>
          <h1 className="mt-6 text-[clamp(3.2rem,8vw,8rem)] font-medium leading-[.88] tracking-[-.06em]">This page is not part of the stay.</h1>
          <Link href="/" className="mt-10 inline-flex items-center gap-3 bg-ink px-6 py-4 text-[10px] font-semibold uppercase tracking-[.18em] text-white"><ArrowLeft size={15} /> Back home</Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}


