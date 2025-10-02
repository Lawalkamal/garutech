export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string | string[];
  subCategory?: string | string[]; // New field for sub-categories
  brand: string;
  description: string;
  specifications: {[key: string]: string;}
  inStock: boolean;
  stockCount: number;
  rating: number;
  reviews: number;
  features: string[];
  priority?: number; 
  videos?: string[];
  featured?: boolean;
}

export interface CartItem extends Product{
  quantity: number;
}

export interface SubCategory {
  id: string;
  name: string;
  parentCategory: string;
  description?: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  subCategories?: SubCategory[]; // Optional sub-categories
}

// Helper interface for filtering
export interface CategoryFilter {
  category: string;
  subCategory?: string;
}