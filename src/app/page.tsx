import Image from 'next/image';
import { HeroVideo } from '@/components/HeroVideo';
import Link from 'next/link';
import { ArrowDown, ArrowUpRight, Coffee, Mountain, MapPin, Sunrise } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BookingBar } from '@/components/BookingBar';
import { BookingTrigger } from '@/components/BookingTrigger';
import { Reveal } from '@/components/Reveal';
import { RoomShowcase } from '@/components/RoomShowcase';
import { JourneyMap } from '@/components/JourneyMap';
import { getRooms } from '@/lib/content';
import { attractions, site } from '@/data/site';

export default async function HomePage() {
  const rooms = await getRooms();
  return (
    <main>
      <Header dark />
      <section className="destination-hero">
        <HeroVideo />
        <div className="hero-shade" />
        <div className="hero-content shell"><Reveal>
          <p className="eyebrow hero-eyebrow"><span /> A little closer to nature · Ella, Sri Lanka</p>
          <h1>Some places<br />make you <em>pause.</em></h1>
          <p className="hero-description">Wake up to the mountains. Take the morning slowly.<br className="hidden sm:block" /> Find your own little escape at Ella Floating View.</p>
          <div className="hero-actions"><BookingTrigger className="button button-copper">Find your stay <ArrowUpRight size={18} /></BookingTrigger><Link href="/rooms" className="hero-text-link">Explore our rooms <ArrowUpRight size={16} /></Link></div>
        </Reveal></div>
        <div className="hero-bottom shell"><a href="#welcome">A slower kind of getaway <ArrowDown size={15} /></a><span><MapPin size={14} /> Waterfall Road, Ella</span></div>
        <div className="hero-coordinate" aria-hidden="true">THE HILLS ARE CALLING</div>
      </section>
      <div className="reservation-wrap shell"><BookingBar /><p className="reservation-note">Your mountain escape starts here. Send a request to confirm availability.</p></div>
      <section id="welcome" className="welcome-section shell">
        <Reveal className="welcome-copy"><p className="eyebrow">Welcome to Ella Floating View</p><h2>A beautiful view.<br />A <em>quieter</em> way to stay.</h2><p className="body-copy">Away from the rush, surrounded by Ella’s green hills. Our comfortable rooms and peaceful setting give you the space to settle in, breathe a little deeper and enjoy the view.</p><p className="body-copy">A warm breakfast. A mountain morning. And a day that’s entirely yours.</p><Link href="/about" className="text-link">Get to know our place <ArrowUpRight size={17} /></Link><div className="welcome-facts"><div><Mountain size={23} strokeWidth={1.3} /><span>Mountain views</span></div><div><Coffee size={23} strokeWidth={1.3} /><span>Breakfast included</span></div><div><MapPin size={23} strokeWidth={1.3} /><span>In Ella Town</span></div></div></Reveal>
        <Reveal className="welcome-visual"><div className="welcome-photo"><Image quality={90} src="/images/property-enhanced.webp" alt="Ella Floating View surrounded by greenery" fill sizes="(max-width: 800px) 100vw, 50vw" className="object-cover" /></div><div className="welcome-inset"><Image quality={90} src="/images/gallery/garden-corner.webp" alt="A peaceful corner of Ella Floating View" fill sizes="260px" className="object-cover" /></div><div className="view-caption"><span>01 / A place to exhale</span><span>Ella, Sri Lanka</span></div></Reveal>
      </section>
      <section className="rooms-section"><div className="shell"><div className="section-intro"><Reveal><p className="eyebrow">Rest easy. Wake up somewhere beautiful.</p><h2>Your room.<br /><em>Your little retreat.</em></h2></Reveal><div><p className="body-copy">Simple comforts, mountain views and breakfast included. Find the stay that feels like you.</p><Link href="/rooms" className="text-link">Discover all rooms <ArrowUpRight size={17} /></Link></div></div><RoomShowcase rooms={rooms} /><p className="rate-note">Rates shown in Sri Lankan rupees. Final availability and rates are confirmed by the property.</p></div></section>
      <section className="slow-section"><div className="slow-image"><Image quality={90} src="/images/gallery/sunset-terrace.webp" alt="Green surroundings and open-air moments in Ella" fill sizes="(max-width: 800px) 100vw, 50vw" className="object-cover" /></div><Reveal className="slow-copy"><p className="eyebrow">Less rush. More wonder.</p><Sunrise size={36} strokeWidth={1} /><h2>Make time<br />for <em>doing nothing.</em></h2><p className="body-copy">Let the hills set the pace. Linger over breakfast, find a quiet corner, or head out to discover Ella. There’s no perfect itinerary—just the one that feels right.</p><Link href="/gallery" className="text-link">A glimpse of life here <ArrowUpRight size={17} /></Link></Reveal></section>
      <section className="explore-section shell"><Reveal className="explore-heading"><p className="eyebrow">A little adventure, a little wonder</p><h2>Step outside.<br /><em>Ella is waiting.</em></h2><p className="body-copy">Mountain trails, forested railway arches and the freedom to wander.<br />Find something beautiful just beyond your door.</p></Reveal><div className="destination-cards">{attractions.map((place,index)=><Reveal key={place.title} delay={index*.08}><Link href="/explore"><div className="destination-card-photo"><Image quality={90} src={place.image} alt={place.title} fill sizes="(max-width: 700px) 100vw, 33vw" className="object-cover" /></div><div className="destination-card-copy"><div><small>0{index+1} / Discover Ella</small><h3>{place.title}</h3></div><ArrowUpRight size={20}/></div><p className="destination-card-description">{place.text}</p></Link></Reveal>)}</div></section>
      <JourneyMap /><section className="escape-cta"><Image quality={90} src="/images/destinations/rock.webp" alt="" fill sizes="100vw" className="object-cover" /><div className="cta-shade" /><Reveal><p className="eyebrow">A change of scenery does wonders</p><h2>Come for the view.<br /><em>Stay for the feeling.</em></h2><BookingTrigger className="button button-light">Plan your Ella escape <ArrowUpRight size={18} /></BookingTrigger><p>Waterfall Road, Ella · <a href={`tel:${site.phone.replace(/\s/g,'')}`}>{site.phone}</a></p></Reveal></section>
      <Footer />
    </main>
  );
}




