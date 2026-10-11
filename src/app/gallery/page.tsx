import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PageHero } from '@/components/PageHero';
import { PhotoGallery } from '@/components/PhotoGallery';
import { FinalBookingCta } from '@/components/FinalBookingCta';
import { gallery } from '@/data/site';

export const metadata = { title: 'Gallery', description: 'Breakfast in the hills, garden corners and slow terrace mornings at Ella Floating View.' };
export default function GalleryPage() {
  return <main className="bg-paper"><Header dark />
    <PageHero eyebrow="Life at Ella Floating View" title="Little moments. Lasting memories." text="Breakfast with a view. Misty mornings. A sunset worth staying for. Take a look at life here." image="/images/gallery/sunset-terrace.webp" />
    <PhotoGallery items={gallery} />
    <FinalBookingCta title="Picture yourself here." /><Footer />
  </main>;
}
