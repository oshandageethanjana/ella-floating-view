import { Phone, UtensilsCrossed, Mountain } from 'lucide-react';
import { site } from '@/data/site';

export function StayDetailsBand() {
  const details = [
    { label: 'Setting', value: 'Ella Town, Sri Lanka', icon: Mountain },
    { label: 'Stay', value: 'Mountain-view rooms', icon: Mountain },
    { label: 'Rates', value: 'Breakfast included', icon: UtensilsCrossed },
    { label: 'Contact', value: site.phone, icon: Phone }
  ];

  return (
    <section className="border-y border-ink/10 bg-paper">
      <div className="mx-auto grid max-w-[1480px] divide-y divide-ink/10 px-5 sm:px-8 md:grid-cols-2 md:divide-x md:divide-y-0 lg:grid-cols-4 lg:px-12">
        {details.map(({ label, value, icon: Icon }) => (
          <div key={label} className="flex min-h-[150px] items-center gap-4 py-8 md:px-7 lg:min-h-[170px] lg:px-8 first:pl-0 last:pr-0">
            <Icon size={19} strokeWidth={1.4} className="shrink-0 text-ink/42" />
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[.2em] text-ink/35">{label}</p>
              <p className="mt-2 text-sm leading-6 text-ink/72">{value}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}


