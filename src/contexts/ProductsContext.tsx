// contexts/ProductsContext.tsx
import React, { createContext, useContext, ReactNode } from 'react';
import { useProducts } from '@/hooks/use-products';
import { Product, CategoryFilter } from '@/types/product';

interface ProductsContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
  getProductsByCategory: (category: string) => Product[];
  getProductsBySubCategory: (category: string, subCategory: string) => Product[];
  getProductsByFilter: (filter: CategoryFilter) => Product[];
  getProduct: (id: string) => Product | undefined;
  getFeaturedProducts: () => Product[];
  getRelatedProducts: (currentProductId: string, limit?: number) => Product[];
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export const ProductsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { products, loading, error, refetch } = useProducts();

  const getProductsByCategory = (category: string) => {
    return products.filter(product => {
      // Handle both string and string[] categories
      if (Array.isArray(product.category)) {
        return product.category.includes(category);
      }
      return product.category === category;
    });
  };

  const getProductsBySubCategory = (category: string, subCategory: string) => {
    return products.filter(product => {
      // Check if product belongs to the main category
      const belongsToCategory = Array.isArray(product.category) 
        ? product.category.includes(category)
        : product.category === category;
      
      if (!belongsToCategory) return false;

      // Check if product belongs to the sub-category
      if (!product.subCategory) return false;
      
      if (Array.isArray(product.subCategory)) {
        return product.subCategory.includes(subCategory);
      }
      return product.subCategory === subCategory;
    });
  };

  const getProductsByFilter = (filter: CategoryFilter) => {
    if (filter.subCategory) {
      return getProductsBySubCategory(filter.category, filter.subCategory);
    }
    return getProductsByCategory(filter.category);
  };

  const getProduct = (id: string) => {
    return products.find(product => product.id === id);
  };

  const getFeaturedProducts = () => {
    // First try to get products marked as featured
    const featured = products.filter(p => p.featured === true);
    
    // If we have featured products, return up to 3
    if (featured.length > 0) {
      return featured.slice(0, 3);
    }
    
    // Fallback: return top rated products if no featured products exist
    return products
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 3);
  };

  const getRelatedProducts = (currentProductId: string, limit = 4) => {
    const currentProduct = getProduct(currentProductId);
    if (!currentProduct) {
      return products
        .filter(product => product.id !== currentProductId)
        .slice(0, limit);
    }

    // Get products from the same category/sub-category first
    const currentCategory = Array.isArray(currentProduct.category) 
      ? currentProduct.category[0] 
      : currentProduct.category;
    
    const currentSubCategory = Array.isArray(currentProduct.subCategory)
      ? currentProduct.subCategory[0]
      : currentProduct.subCategory;

    let related = products.filter(product => {
      if (product.id === currentProductId) return false;
      
      // Check if product shares category
      const shareCategory = Array.isArray(product.category)
        ? product.category.includes(currentCategory)
        : product.category === currentCategory;
      
      // Check if product shares sub-category
      const shareSubCategory = currentSubCategory && product.subCategory && (
        Array.isArray(product.subCategory)
          ? product.subCategory.includes(currentSubCategory)
          : product.subCategory === currentSubCategory
      );

      return shareCategory || shareSubCategory;
    });

    // If not enough related products, fill with other products
    if (related.length < limit) {
      const additional = products
        .filter(product => 
          product.id !== currentProductId && 
          !related.find(r => r.id === product.id)
        )
        .slice(0, limit - related.length);
      
      related = [...related, ...additional];
    }

    return related.slice(0, limit);
  };

  const value: ProductsContextType = {
    products,
    loading,
    error,
    refetch,
    getProductsByCategory,
    getProductsBySubCategory,
    getProductsByFilter,
    getProduct,
    getFeaturedProducts,
    getRelatedProducts,
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProductsContext = () => {
  const context = useContext(ProductsContext);
  if (context === undefined) {
    throw new Error('useProductsContext must be used within a ProductsProvider');
  }
  return context;
};