// // components/admin/SyncProducts.tsx
// import React, { useState } from 'react';
// import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
// import { db } from '@/lib/firebase';
// import { products } from '@/data/products';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// export const syncStaticProductsToFirebase = async () => {
//   try {
//     console.log('Starting to sync products to Firebase...');
    
//     for (const product of products) {
//       // Check if product already exists
//       const productsRef = collection(db, 'products');
//       const q = query(productsRef, where('name', '==', product.name));
//       const existingProduct = await getDocs(q);
      
//       if (existingProduct.empty) {
//         // Product doesn't exist, add it
//         const productData = {
//           ...product,
//           createdAt: new Date(),
//           isActive: true,
//           imagePublicId: null,
//         };
        
//         await addDoc(productsRef, productData);
//         console.log(`Added product: ${product.name}`);
//       } else {
//         console.log(`Product already exists: ${product.name}`);
//       }
//     }
    
//     console.log('Sync completed successfully!');
//   } catch (error) {
//     console.error('Error syncing products:', error);
//     throw error;
//   }
// };

// export const SyncProductsButton: React.FC = () => {
//   const [syncing, setSyncing] = useState(false);
//   const [message, setMessage] = useState('');

//   const handleSync = async () => {
//     setSyncing(true);
//     setMessage('');
    
//     try {
//       await syncStaticProductsToFirebase();
//       setMessage('Products synced successfully!');
//     } catch (error) {
//       setMessage('Error syncing products. Check console for details.');
//     } finally {
//       setSyncing(false);
//     }
//   };

//   return (
//     <Card className="mb-6">
//       <CardHeader>
//         <CardTitle>Sync Static Products</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <p className="text-sm text-muted-foreground mb-4">
//           This will add all products from your static file to Firebase (one-time operation).
//         </p>
        
//         <Button
//           onClick={handleSync}
//           disabled={syncing}
//           className={`${syncing ? 'opacity-50 cursor-not-allowed' : ''}`}
//         >
//           {syncing ? 'Syncing...' : 'Sync Products'}
//         </Button>
        
//         {message && (
//           <p className={`mt-2 text-sm ${
//             message.includes('Error') ? 'text-red-600' : 'text-green-600'
//           }`}>
//             {message}
//           </p>
//         )}
//       </CardContent>
//     </Card>
//   );
// };

// components/admin/SyncProducts.tsx
import React, { useState } from 'react';
import { collection, addDoc, getDocs, query, where, updateDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { products } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const syncStaticProductsToFirebase = async () => {
  try {
    console.log('Starting to sync products to Firebase...');
    
    for (const product of products) {
      const productsRef = collection(db, 'products');
      const q = query(productsRef, where('name', '==', product.name));
      const existingProductQuery = await getDocs(q);
      
      const productData = {
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice || null,
        image: product.image,
        category: product.category,
        subCategory: product.subCategory || null, // This will now be updated!
        brand: product.brand || 'Unknown',
        description: product.description,
        specifications: product.specifications || {},
        inStock: product.inStock,
        stockCount: product.stockCount || 0,
        rating: product.rating || 4.0,
        reviews: product.reviews || 0,
        features: product.features || [],
        videos: product.videos || [], // Add videos field - this was missing!
        isActive: true,
        imagePublicId: null,
      };
      
      if (existingProductQuery.empty) {
        // Add new product
        await addDoc(productsRef, {
          ...productData,
          createdAt: new Date(),
        });
        console.log(`Added new product: ${product.name}`);
      } else {
        // Update existing product
        const existingDoc = existingProductQuery.docs[0];
        await updateDoc (doc(db, 'products', existingDoc.id), {
          ...productData,
          updatedAt: new Date(),
        });
        console.log(`Updated existing product: ${product.name}`);
      }
    }
    
    console.log('Sync completed successfully!');
  } catch (error) {
    console.error('Error syncing products:', error);
    throw error;
  }
};

export const SyncProductsButton: React.FC = () => {
  const [syncing, setSyncing] = useState(false);
  const [message, setMessage] = useState('');

  const handleSync = async () => {
    setSyncing(true);
    setMessage('');
    
    try {
      await syncStaticProductsToFirebase();
      setMessage('Products synced successfully!');
    } catch (error) {
      setMessage('Error syncing products. Check console for details.');
    } finally {
      setSyncing(false);
    }
  };

  const clearFirebaseProducts = async () => {
    if (window.confirm('Are you sure you want to clear all products from Firebase? This cannot be undone!')) {
      try {
        setSyncing(true);
        const productsRef = collection(db, 'products');
        const querySnapshot = await getDocs(productsRef);
        
        const deletePromises = querySnapshot.docs.map(doc => 
          import('firebase/firestore').then(({ deleteDoc, doc: docRef }) => 
            deleteDoc(docRef(db, 'products', doc.id))
          )
        );
        
        await Promise.all(deletePromises);
        setMessage('All products cleared from Firebase!');
      } catch (error) {
        setMessage('Error clearing products. Check console for details.');
      } finally {
        setSyncing(false);
      }
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Sync Static Products</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          This will add all products from your static file to Firebase (one-time operation).
        </p>
        
        <div className="flex space-x-4">
          <Button
            onClick={handleSync}
            disabled={syncing}
            className={`${syncing ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {syncing ? 'Syncing...' : 'Sync Products'}
          </Button>
          
          {/* <Button
            onClick={clearFirebaseProducts}
            disabled={syncing}
            variant="destructive"
            className={`${syncing ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Clear Firebase Products
          </Button> */}
        </div>
        
        {message && (
          <p className={`mt-2 text-sm ${
            message.includes('Error') ? 'text-red-600' : 'text-green-600'
          }`}>
            {message}
          </p>
        )}
      </CardContent>
    </Card>
  );
};