// hooks/use-products.ts
import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Product } from '@/types/product';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const productsRef = collection(db, 'products');
      const q = query(productsRef, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const fetchedProducts: Product[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        fetchedProducts.push({
          id: doc.id,
          name: data.name,
          price: data.price,
          originalPrice: data.originalPrice || null,
          image: data.image,
          category: data.category,
          subCategory: data.subCategory,
          brand: data.brand,
          description: data.description,
          specifications: data.specifications || {},
          inStock: data.inStock,
          stockCount: data.stockCount,
          rating: data.rating || 4.0,
          reviews: data.reviews || 0,
          features: data.features || [],
          priority: data.priority,
          videos: data.videos || [], // Add videos field - this was missing!
        });
      });
      
      setProducts(fetchedProducts);
      setError(null);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, loading, error, refetch: fetchProducts };
};