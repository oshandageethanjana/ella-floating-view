export type Room = {
  slug: string;
  name: string;
  eyebrow: string;
  description: string;
  priceLkr: number;
  guests: number;
  image: string;
  features: string[];
  breakfastIncluded: boolean;
};

export type GalleryItem = {
  src: string;
  alt: string;
  label: string;
  className?: string;
};

