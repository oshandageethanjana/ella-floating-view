import type { Room } from '@/types';

export function roomVisual(room: Room) {
  if (room.image !== '/images/room-enhanced.webp') return { src: room.image, alt: room.name, caption: 'Room preview' };
  if (room.slug === 'deluxe-double-mountain-view') return { src: '/images/gallery/garden-corner.webp', alt: 'Garden and mountain scenery at Ella Floating View', caption: 'Around the stay · Garden view' };
  if (room.slug === 'family-mountain-view') return { src: '/images/gallery/breakfast-view.webp', alt: 'Breakfast on the terrace at Ella Floating View', caption: 'Around the stay · Breakfast on the terrace' };
  return { src: room.image, alt: 'Supplied bedroom preview at Ella Floating View', caption: 'A glimpse inside · Bedroom preview' };
}
