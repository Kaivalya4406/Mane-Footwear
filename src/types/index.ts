export type ShoeIconKind = "sneaker" | "formal" | "sandal" | "boot" | "kids" | "leather";

export type Collection = {
  id: string;
  name: string;
  description: string;
  href: string;
  image?: string;
  iconKind: ShoeIconKind;
};

export type Product = {
  id: string;
  name: string;
  category: string;
  collectionId: string;
  description: string;
  priceInPaise: number;
  badge?: "New" | "Popular";
  image?: string;
  iconKind: ShoeIconKind;
  sizes?: string[];
  inStock?: boolean;
  isDemo: boolean;
  isActive: boolean;
};

export type Branch = {
  id: string;
  name: string;
  yearsOfService: string;
  location: string;
  mapsQuery: string;
  image?: string;
  address?: string;
  phone?: string;
  whatsapp?: string;
  hours?: string;
};

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  location?: string;
  rating: number;
  isDemo: true;
};