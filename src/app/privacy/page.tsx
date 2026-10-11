import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata = { title: 'Privacy' };

export default function PrivacyPage() {
  return (
    <main className="bg-paper">
      <Header />
      <section className="mx-auto max-w-[1120px] px-5 pb-28 pt-40 sm:px-8 lg:pb-40 lg:pt-48">
        <div className="grid gap-12 lg:grid-cols-[.55fr_1.45fr] lg:gap-24">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[.22em] text-ink/42">Privacy</p>
            <p className="mt-5 text-sm leading-7 text-ink/52">Ella Floating View website</p>
          </div>
          <div>
            <h1 className="text-[clamp(3rem,6vw,6rem)] font-medium leading-[.92] tracking-[-.055em]">Privacy policy</h1>
            <div className="mt-12 border-t border-ink/12 pt-8 text-sm leading-8 text-ink/62">
              <p>This website includes contact and booking request forms. Before public launch, the final privacy policy should match the actual email provider, analytics tools, hosting setup and any guest information that is stored or processed.</p>
              <p className="mt-6">Do not publish placeholder privacy claims that do not match the final production configuration.</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}


