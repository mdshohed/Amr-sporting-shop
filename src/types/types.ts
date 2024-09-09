export interface TProduct {
  name: string;
  description: string;
  category: string;
  brand: string;
  stockQuantity: number;
  rating: number; 
  productDescription: string;
  price: number;
  image: string;
  isAvailable?: boolean;
}