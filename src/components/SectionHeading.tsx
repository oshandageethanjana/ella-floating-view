import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Reveal } from '@/components/Reveal';

export function SectionHeading({
  eyebrow,
  title,
  text,
  href,
  linkLabel,
  align = 'left'
}: {
  eyebrow: string;
  title: string;
  text?: string;
  href?: string;
  linkLabel?: string;
  align?: 'left' | 'center';
}) {
  const center = align === 'center';
  return (
    <Reveal className={center ? 'mx-auto max-w-4xl text-center' : 'max-w-4xl'}>
      <p className="mb-5 text-[10px] font-semibold uppercase tracking-[.22em] text-ink/42">{eyebrow}</p>
      <h2 className="text-[clamp(2.6rem,5vw,5.65rem)] font-medium leading-[.94] tracking-[-.05em]">{title}</h2>
      {text && <p className={`mt-7 max-w-2xl text-sm leading-7 text-ink/58 sm:text-[15px] ${center ? 'mx-auto' : ''}`}>{text}</p>}
      {href && linkLabel && (
        <Link href={href} className="mt-8 inline-flex items-center gap-2 border-b border-ink/70 pb-1 text-[10px] font-semibold uppercase tracking-[.18em] transition-opacity hover:opacity-55">
          {linkLabel} <ArrowUpRight size={14} />
        </Link>
      )}
    </Reveal>
  );
}


