import { ArrowRight, MessageCircle } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { site } from '@/data/site';
import { BookingTrigger } from '@/components/BookingTrigger';

export function FinalBookingCta({ title = 'Your Ella stay starts here.' }: { title?: string }) {
  return (
    <section className="bg-[#10281d] py-28 text-white sm:py-32 lg:py-44">
      <div className="mx-auto max-w-[1180px] px-5 text-center sm:px-8">
        <Reveal>
          <p className="mb-7 text-[10px] font-semibold uppercase tracking-[.22em] text-white/42">Plan your stay</p>
          <h2 className="text-[clamp(3rem,6.5vw,7rem)] font-medium leading-[.9] tracking-[-.055em]">{title}</h2>
          <p className="mx-auto mt-8 max-w-xl text-sm leading-7 text-white/80">Choose your room, find your dates and let us help you plan a quieter escape to Ella.</p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <BookingTrigger className="button button-light">Check availability <ArrowRight size={15} /></BookingTrigger>
            <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 border border-white/28 px-7 py-4 text-[10px] font-semibold uppercase tracking-[.18em] text-white transition-colors hover:bg-white hover:text-ink"><MessageCircle size={15} /> WhatsApp</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}


