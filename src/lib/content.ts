import { gallery as fallbackGallery, rooms as fallbackRooms } from '@/data/site';
import { getSupabaseClient } from '@/lib/supabase';
import type { GalleryItem, Room } from '@/types';

export async function getRooms(): Promise<Room[]> {
  const supabase = getSupabaseClient();
  if (!supabase) return fallbackRooms;

  const { data, error } = await supabase
    .from('rooms')
    .select('*')
    .eq('is_published', true)
    .order('sort_order', { ascending: true });

  if (error || !data?.length) return fallbackRooms;

  return data.map((row) => ({
    slug: row.slug,
    name: row.name,
    eyebrow: row.eyebrow ?? '',
    description: row.description ?? '',
    priceLkr: Number(row.price_lkr ?? 0),
    guests: Number(row.guests ?? 0),
    image: ['/images/room.webp', '/images/terrace.webp', '/images/property.webp'].includes(row.image_url) ? '/images/room-enhanced.webp' : (row.image_url || '/images/room-enhanced.webp'),
    features: Array.isArray(row.features) ? row.features : [],
    breakfastIncluded: Boolean(row.breakfast_included)
  }));
}

export async function getGallery(): Promise<GalleryItem[]> {
  const supabase = getSupabaseClient();
  if (!supabase) return fallbackGallery;

  const { data, error } = await supabase
    .from('gallery_items')
    .select('*')
    .eq('is_published', true)
    .order('sort_order', { ascending: true });

  if (error || !data?.length) return fallbackGallery;

  return data.map((row) => ({
    src: row.image_url,
    alt: row.alt_text || 'Ella Floating View',
    label: row.label || 'Ella Floating View',
    className: row.layout_class || ''
  }));
}

