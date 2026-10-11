import Link from 'next/link';
import { ArrowUpRight, Check } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PageHero } from '@/components/PageHero';
import { RoomShowcase } from '@/components/RoomShowcase';
import { EditorialImage } from '@/components/EditorialImage';
import { FinalBookingCta } from '@/components/FinalBookingCta';
import { BookingTrigger } from '@/components/BookingTrigger';
import { getRooms } from '@/lib/content';

export const metadata = { title: 'Rooms & Rates' };
export default async function RoomsPage() {
  const rooms = await getRooms();
  return <main className="bg-paper" id="main-content"><Header dark />
    <PageHero eyebrow="Rooms & rates" title="Your room. Your little retreat." text="Mountain-view stays and breakfast included. Find the right room for your time in Ella." image="/images/gallery/sunset-terrace.webp" />
    <section className="shell room-collection"><div className="room-collection-intro"><div><p className="eyebrow">Three ways to stay</p><h2>A quieter place<br /><em>to wake up.</em></h2></div><p className="body-copy">Double, Deluxe Double or Family. Explore your options and ask us about the best fit for your dates.</p></div><RoomShowcase rooms={rooms} /><p className="room-photo-note">Photographs show a bedroom preview and shared spaces around the property. Ask us for the current photos of your chosen room.</p></section>
    <section className="room-rates-band"><div className="shell"><p className="eyebrow">At a glance</p><h2>Find your kind of stay.</h2><div className="room-rate-grid">{rooms.map((room,index)=><article key={room.slug}><p className="eyebrow">0{index+1} / {room.eyebrow}</p><h3>{room.name}</h3><p className="rate-amount">LKR {room.priceLkr.toLocaleString()}<span>Listed room rate</span></p><ul>{room.features.map(feature=><li key={feature}><Check size={15} />{feature}</li>)}</ul><div className="rate-actions"><BookingTrigger detail={{room:room.name}} className="text-link">Ask about dates <ArrowUpRight size={16}/></BookingTrigger><Link href={`/rooms/${room.slug}`} aria-label={`View details for ${room.name}`}>Room details <ArrowUpRight size={15}/></Link></div></article>)}</div></div></section>
    <section className="rooms-breakfast"><EditorialImage src="/images/gallery/breakfast-together.webp" alt="Guests enjoying breakfast at Ella Floating View" className="rooms-breakfast-photo" sizes="(max-width: 800px) 100vw, 50vw" /><div><p className="eyebrow">Included in your stay</p><h2>Start slowly.<br /><em>Breakfast is on us.</em></h2><p className="body-copy">A mountain-view morning, a table to linger at, and breakfast included in every room rate. It’s a lovely way to begin a day in Ella.</p><Link href="/gallery" className="text-link">More moments from the stay <ArrowUpRight size={16}/></Link></div></section>
    <FinalBookingCta title="A room for your next escape." /><Footer />
  </main>;
}
