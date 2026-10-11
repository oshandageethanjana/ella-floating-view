import type { GalleryItem, Room } from '@/types';

export const site = {
  name: 'Ella Floating View',
  location: 'Ella Town, Sri Lanka',
  tagline: 'More Than a Stay. A Higher View.',
  description: 'Comfortable stays, peaceful surroundings, and breakfast included.',
  phone: '+94 75 200 0030',
  whatsapp: '94752000030',
  email: '',
  bookingUrl: '',
  address: 'Waterfall Road, Ella, Ella Town, Sri Lanka, 900090',
  socials: {
    youtube: '',
    instagram: 'https://www.instagram.com/ellafloating.view/?__pwa=1',
    tiktok: '',
    facebook: 'https://web.facebook.com/profile.php?id=61562573027753',
    tripadvisor: '',
    linkedin: '',
    rednote: '',
    wechat: ''
  }
};

export const rooms: Room[] = [
  {
    slug: 'double-mountain-view',
    name: 'Double Room with Mountain View',
    eyebrow: 'Bed & Breakfast',
    description: 'Double room with mountain view. Breakfast included.',
    priceLkr: 8000,
    guests: 0,
    image: '/images/room-enhanced.webp',
    features: ['Mountain view', 'Breakfast included'],
    breakfastIncluded: true
  },
  {
    slug: 'deluxe-double-mountain-view',
    name: 'Deluxe Double Room with Mountain View',
    eyebrow: 'Bed & Breakfast',
    description: 'Deluxe double room with mountain view. Breakfast included.',
    priceLkr: 10000,
    guests: 0,
    image: '/images/room-enhanced.webp',
    features: ['Mountain view', 'Breakfast included'],
    breakfastIncluded: true
  },
  {
    slug: 'family-mountain-view',
    name: 'Family Room with Mountain View',
    eyebrow: 'Bed & Breakfast',
    description: 'Family room with mountain view. Breakfast included.',
    priceLkr: 12000,
    guests: 0,
    image: '/images/room-enhanced.webp',
    features: ['Mountain view', 'Breakfast included'],
    breakfastIncluded: true
  }
];

export const gallery: GalleryItem[] = [
  { src: '/images/gallery/breakfast-together.webp', alt: 'A couple enjoying breakfast with the Ella hills behind them', label: 'Breakfast above the hills' },
  { src: '/images/gallery/garden-corner.webp', alt: 'Stone building, water feature and garden at Ella Floating View', label: 'A quiet garden corner' },
  { src: '/images/gallery/balcony-morning.webp', alt: 'Guest with a laptop and breakfast on the mountain-facing balcony', label: 'A morning of your own' },
  { src: '/images/gallery/table-for-four.webp', alt: 'Rice and accompaniments served on a wooden dining table', label: 'Good food. Good company.' },
  { src: '/images/gallery/misty-morning.webp', alt: 'Guest enjoying a drink on the terrace in the mountain mist', label: 'Slow mornings in the mist' },
  { src: '/images/gallery/breakfast-view.webp', alt: 'Breakfast with a blue teapot and mountain scenery', label: 'A table with a view' },
  { src: '/images/gallery/sunset-terrace.webp', alt: 'Two guests watching sunset from the covered terrace', label: 'Stay for the sunset' }
];
export const attractions = [
  {title: "Little Adam's Peak",text:'Walk into the green hills and take in one of Ella’s favourite viewpoints.',image:'/images/destinations/peak.webp'},
  {title:'Nine Arches Bridge',text:'Stone arches, forested hills and a memorable piece of Ella’s railway heritage.',image:'/images/destinations/bridge.webp'},
  {title:'Ella Rock',text:'A mountain trail and sweeping views for those who love to explore on foot.',image:'/images/destinations/rock.webp'}
];
