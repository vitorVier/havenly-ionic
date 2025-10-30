export type Hotel = {
  id: number | string;
  name: string;
  location: string;
  address: string[];
  price: number;
  oldPrice?: number | null;
  rating: number;
  reviews: number;
  perks: string[];
  image: string;
  images: string[];
  slogan: string;
  description: string;
  avaliationAmount: number;
};