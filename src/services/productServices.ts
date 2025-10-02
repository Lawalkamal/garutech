// src/services/productService.ts
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs, 
  getDoc,
  query,
  orderBy,
  where,
  Timestamp 
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface Product {
  id?: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  description: string;
  image: string;
  imagePublicId?: string;
  category: string | string[];
  subCategory?: string | string[]; // Added sub-category support
  inStock: boolean;
  stockCount: number;
  rating: number;
  reviews: number;
  specifications: Record<string, string>;
  features: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  priority?: number;
  videos?: string[]; // ADD THIS LINE
}

export interface ProductFormData {
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  description: string;
  image: string;
  imagePublicId?: string;
  category: string | string[];
  subCategory?: string | string[]; // Added sub-category support
  stockCount: number;
  specifications: Record<string, string>;
  features: string[];
  priority: number;
  videos?: string[]; // ADD THIS LINE
}

const COLLECTION_NAME = 'products';

export const productService = {
  // Get all products
  async getAllProducts(): Promise<Product[]> {
    try {
      const q = query(
        collection(db, COLLECTION_NAME),
        where('isActive', '==', true),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date(),
      })) as Product[];
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  // Get products by category - Updated to handle both string and array categories
  async getProductsByCategory(category: string): Promise<Product[]> {
    try {
      // First try array-contains for products with multiple categories
      const arrayQuery = query(
        collection(db, COLLECTION_NAME),
        where('category', 'array-contains', category),
        where('isActive', '==', true),
        orderBy('createdAt', 'desc')
      );
      
      // Then try exact match for products with single category
      const stringQuery = query(
        collection(db, COLLECTION_NAME),
        where('category', '==', category),
        where('isActive', '==', true),
        orderBy('createdAt', 'desc')
      );

      const [arrayResults, stringResults] = await Promise.all([
        getDocs(arrayQuery).catch(() => ({ docs: [] })),
        getDocs(stringQuery).catch(() => ({ docs: [] }))
      ]);

      const products = new Map();
      
      // Add array results
      arrayResults.docs.forEach(doc => {
        products.set(doc.id, {
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() || new Date(),
          updatedAt: doc.data().updatedAt?.toDate() || new Date(),
        });
      });

      // Add string results (avoid duplicates)
      stringResults.docs.forEach(doc => {
        if (!products.has(doc.id)) {
          products.set(doc.id, {
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate() || new Date(),
            updatedAt: doc.data().updatedAt?.toDate() || new Date(),
          });
        }
      });

      return Array.from(products.values()) as Product[];
    } catch (error) {
      console.error('Error fetching products by category:', error);
      throw error;
    }
  },

  // Get products by sub-category - New method
  async getProductsBySubCategory(subCategory: string): Promise<Product[]> {
    try {
      // First try array-contains for products with multiple sub-categories
      const arrayQuery = query(
        collection(db, COLLECTION_NAME),
        where('subCategory', 'array-contains', subCategory),
        where('isActive', '==', true),
        orderBy('createdAt', 'desc')
      );
      
      // Then try exact match for products with single sub-category
      const stringQuery = query(
        collection(db, COLLECTION_NAME),
        where('subCategory', '==', subCategory),
        where('isActive', '==', true),
        orderBy('createdAt', 'desc')
      );

      const [arrayResults, stringResults] = await Promise.all([
        getDocs(arrayQuery).catch(() => ({ docs: [] })),
        getDocs(stringQuery).catch(() => ({ docs: [] }))
      ]);

      const products = new Map();
      
      // Add array results
      arrayResults.docs.forEach(doc => {
        products.set(doc.id, {
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() || new Date(),
          updatedAt: doc.data().updatedAt?.toDate() || new Date(),
        });
      });

      // Add string results (avoid duplicates)
      stringResults.docs.forEach(doc => {
        if (!products.has(doc.id)) {
          products.set(doc.id, {
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate() || new Date(),
            updatedAt: doc.data().updatedAt?.toDate() || new Date(),
          });
        }
      });

      return Array.from(products.values()) as Product[];
    } catch (error) {
      console.error('Error fetching products by sub-category:', error);
      throw error;
    }
  },

  // Get products by category and sub-category combination - New method
  async getProductsByCategoryAndSubCategory(category: string, subCategory: string): Promise<Product[]> {
    try {
      // This is more complex as we need to find products that match both category AND sub-category
      // We'll get all products and filter client-side for now
      // For better performance, consider creating composite indexes in Firestore
      
      const allProducts = await this.getAllProducts();
      
      return allProducts.filter(product => {
        // Check category match
        const categoryMatch = Array.isArray(product.category)
          ? product.category.includes(category)
          : product.category === category;
          
        if (!categoryMatch) return false;
        
        // Check sub-category match
        if (!product.subCategory) return false;
        
        const subCategoryMatch = Array.isArray(product.subCategory)
          ? product.subCategory.includes(subCategory)
          : product.subCategory === subCategory;
          
        return subCategoryMatch;
      });
    } catch (error) {
      console.error('Error fetching products by category and sub-category:', error);
      throw error;
    }
  },

  // Get single product
  async getProductById(id: string): Promise<Product | null> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data(),
          createdAt: docSnap.data().createdAt?.toDate() || new Date(),
          updatedAt: docSnap.data().updatedAt?.toDate() || new Date(),
        } as Product;
      }
      
      return null;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  },

  // Add new product
  async addProduct(productData: ProductFormData): Promise<string> {
    try {
      const product: Omit<Product, 'id'> = {
        ...productData,
        inStock: productData.stockCount > 0,
        rating: 5.0,
        reviews: 0,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        ...product,
        createdAt: Timestamp.fromDate(product.createdAt),
        updatedAt: Timestamp.fromDate(product.updatedAt),
      });
      
      return docRef.id;
    } catch (error) {
      console.error('Error adding product:', error);
      throw error;
    }
  },

  // Update product
  async updateProduct(id: string, productData: Partial<ProductFormData>): Promise<void> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      
      const updateData = {
        ...productData,
        inStock: productData.stockCount ? productData.stockCount > 0 : undefined,
        updatedAt: Timestamp.fromDate(new Date()),
      };

      // Remove undefined values
      Object.keys(updateData).forEach(key => {
        if (updateData[key as keyof typeof updateData] === undefined) {
          delete updateData[key as keyof typeof updateData];
        }
      });

      await updateDoc(docRef, updateData);
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  },

  // Soft delete product (mark as inactive)
  async deleteProduct(id: string): Promise<void> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(docRef, {
        isActive: false,
        updatedAt: Timestamp.fromDate(new Date()),
      });
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  },

  // Search products - Updated to handle categories and sub-categories
  async searchProducts(searchTerm: string): Promise<Product[]> {
    try {
      const allProducts = await this.getAllProducts();
      const searchLower = searchTerm.toLowerCase();
      
      return allProducts.filter(product => {
        const categoryText = Array.isArray(product.category) 
          ? product.category.join(' ')
          : product.category;
          
        const subCategoryText = product.subCategory
          ? Array.isArray(product.subCategory)
            ? product.subCategory.join(' ')
            : product.subCategory
          : '';
          
        return product.name.toLowerCase().includes(searchLower) ||
               product.description.toLowerCase().includes(searchLower) ||
               product.brand.toLowerCase().includes(searchLower) ||
               categoryText.toLowerCase().includes(searchLower) ||
               subCategoryText.toLowerCase().includes(searchLower);
      });
    } catch (error) {
      console.error('Error searching products:', error);
      throw error;
    }
  },

  // Get product categories - Updated to handle both string and array categories
  async getCategories(): Promise<string[]> {
    try {
      const products = await this.getAllProducts();
      const categoriesSet = new Set<string>();
      
      products.forEach(product => {
        if (Array.isArray(product.category)) {
          product.category.forEach(cat => categoriesSet.add(cat));
        } else {
          categoriesSet.add(product.category);
        }
      });
      
      const categories = Array.from(categoriesSet);
      categories.sort();
      return categories;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },

  // Get product sub-categories - New method
  async getSubCategories(): Promise<string[]> {
    try {
      const products = await this.getAllProducts();
      const subCategoriesSet = new Set<string>();
      
      products.forEach(product => {
        if (product.subCategory) {
          if (Array.isArray(product.subCategory)) {
            product.subCategory.forEach(subCat => subCategoriesSet.add(subCat));
          } else {
            subCategoriesSet.add(product.subCategory);
          }
        }
      });
      
      const subCategories = Array.from(subCategoriesSet);
      subCategories.sort();
      return subCategories;
    } catch (error) {
      console.error('Error fetching sub-categories:', error);
      throw error;
    }
  },

  // Update stock count
  async updateStock(id: string, newStockCount: number): Promise<void> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(docRef, {
        stockCount: newStockCount,
        inStock: newStockCount > 0,
        updatedAt: Timestamp.fromDate(new Date()),
      });
    } catch (error) {
      console.error('Error updating stock:', error);
      throw error;
    }
  }
};