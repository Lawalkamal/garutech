// // src/components/admin/AdminDashboard.tsx
// import React, { useState, useEffect } from 'react';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import ProductForm from './productForm';
// import { productService, Product } from '@/services/productServices';
// import { useAuth } from '@/contexts/AuthContext';
// import { 
//   Plus, 
//   Edit, 
//   Trash2, 
//   Eye, 
//   Search,
//   Package,
//   DollarSign,
//   TrendingUp,
//   Users
// } from 'lucide-react';

// const AdminDashboard: React.FC = () => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [showProductForm, setShowProductForm] = useState(false);
//   const [editingProduct, setEditingProduct] = useState<Product | undefined>();
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('');
//   const { userProfile, isAdmin } = useAuth();

//   useEffect(() => {
//     if (!isAdmin) {
//       // Redirect non-admin users
//       window.location.href = '/';
//       return;
//     }
//     fetchProducts();
//   }, [isAdmin]);

//   useEffect(() => {
//     filterProducts();
//   }, [products, searchTerm, selectedCategory]);

//   const fetchProducts = async () => {
//     try {
//       setLoading(true);
//       const fetchedProducts = await productService.getAllProducts();
//       setProducts(fetchedProducts);
//     } catch (error) {
//       console.error('Failed to fetch products:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filterProducts = () => {
//     let filtered = products;

//     if (searchTerm) {
//       filtered = filtered.filter(product =>
//         product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         product.brand.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }

//     if (selectedCategory) {
//       filtered = filtered.filter(product => product.category === selectedCategory);
//     }

//     setFilteredProducts(filtered);
//   };

//   const handleAddProduct = () => {
//     setEditingProduct(undefined);
//     setShowProductForm(true);
//   };

//   const handleEditProduct = (product: Product) => {
//     setEditingProduct(product);
//     setShowProductForm(true);
//   };

//   const handleDeleteProduct = async (productId: string) => {
//     if (window.confirm('Are you sure you want to delete this product?')) {
//       try {
//         await productService.deleteProduct(productId);
//         await fetchProducts(); // Refresh the list
//       } catch (error) {
//         console.error('Failed to delete product:', error);
//         alert('Failed to delete product');
//       }
//     }
//   };

//   const handleProductSaved = () => {
//     setShowProductForm(false);
//     setEditingProduct(undefined);
//     fetchProducts(); // Refresh the list
//   };

//   const categories = [...new Set(products.map(p => p.category))];

//   // Dashboard stats
//   const totalProducts = products.length;
//   const inStockProducts = products.filter(p => p.inStock).length;
//   const totalValue = products.reduce((sum, p) => sum + (p.price * p.stockCount), 0);
//   const averagePrice = totalProducts > 0 ? totalValue / totalProducts : 0;

//   if (!isAdmin) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <Card>
//           <CardContent className="p-8 text-center">
//             <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
//             <p className="text-muted-foreground">You don't have permission to access this page.</p>
//           </CardContent>
//         </Card>
//       </div>
//     );
//   }

//   if (showProductForm) {
//     return (
//       <ProductForm
//         product={editingProduct}
//         onSave={handleProductSaved}
//         onCancel={() => {
//           setShowProductForm(false);
//           setEditingProduct(undefined);
//         }}
//       />
//     );
//   }

//   return (
//     <div className="min-h-screen bg-white p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-8">
//           <div>
//             <h1 className="text-3xl font-bold">Admin Dashboard</h1>
//             <p className="text-muted-foreground">
//               Welcome back, {userProfile?.displayName}
//             </p>
//           </div>
//           <Button onClick={handleAddProduct} className="btn-racing">
//             <Plus className="h-4 w-4 mr-2" />
//             Add Product
//           </Button>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//           <Card>
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-muted-foreground">Total Products</p>
//                   <p className="text-2xl font-bold">{totalProducts}</p>
//                 </div>
//                 <Package className="h-8 w-8 text-primary" />
//               </div>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-muted-foreground">In Stock</p>
//                   <p className="text-2xl font-bold">{inStockProducts}</p>
//                 </div>
//                 <TrendingUp className="h-8 w-8 text-green-500" />
//               </div>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-muted-foreground">Total Value</p>
//                   <p className="text-2xl font-bold">${totalValue.toFixed(0)}</p>
//                 </div>
//                 <DollarSign className="h-8 w-8 text-green-500" />
//               </div>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-muted-foreground">Avg. Price</p>
//                   <p className="text-2xl font-bold">${averagePrice.toFixed(0)}</p>
//                 </div>
//                 <Users className="h-8 w-8 text-blue-500" />
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Filters */}
//         <Card className="mb-6">
//           <CardContent className="p-6">
//             <div className="flex flex-col md:flex-row gap-4">
//               <div className="flex-1 relative">
//                 <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                 <input
//                   type="text"
//                   placeholder="Search products..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary bg-background"
//                 />
//               </div>
//               <select
//                 value={selectedCategory}
//                 onChange={(e) => setSelectedCategory(e.target.value)}
//                 className="px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary bg-background"
//               >
//                 <option value="">All Categories</option>
//                 {categories.map((category) => (
//                   <option key={category} value={category}>
//                     {category}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Products Table */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Products ({filteredProducts.length})</CardTitle>
//           </CardHeader>
//           <CardContent>
//             {loading ? (
//               <div className="text-center py-8">
//                 <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
//                 <p className="mt-4 text-muted-foreground">Loading products...</p>
//               </div>
//             ) : filteredProducts.length === 0 ? (
//               <div className="text-center py-8">
//                 <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
//                 <p className="text-muted-foreground">No products found</p>
//               </div>
//             ) : (
//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <thead>
//                     <tr className="border-b border-border">
//                       <th className="text-left p-4">Product</th>
//                       <th className="text-left p-4">Category</th>
//                       <th className="text-left p-4">Price</th>
//                       <th className="text-left p-4">Stock</th>
//                       <th className="text-left p-4">Status</th>
//                       <th className="text-left p-4">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {filteredProducts.map((product) => (
//                       <tr key={product.id} className="border-b border-border hover:bg-secondary/50">
//                         <td className="p-4">
//                           <div className="flex items-center space-x-3">
//                             <img
//                               src={product.image}
//                               alt={product.name}
//                               className="w-12 h-12 object-cover rounded"
//                             />
//                             <div>
//                               <p className="font-medium">{product.name}</p>
//                               <p className="text-sm text-muted-foreground">{product.brand}</p>
//                             </div>
//                           </div>
//                         </td>
//                         <td className="p-4">
//                           <span className="bg-secondary px-2 py-1 rounded text-sm">
//                             {product.category}
//                           </span>
//                         </td>
//                         <td className="p-4">
//                           <div>
//                             <span className="font-medium">${product.price}</span>
//                             {product.originalPrice && (
//                               <span className="text-sm text-muted-foreground line-through ml-2">
//                                 ${product.originalPrice}
//                               </span>
//                             )}
//                           </div>
//                         </td>
//                         <td className="p-4">
//                           <span className={`${
//                             product.stockCount > 10 ? 'text-green-500' : 
//                             product.stockCount > 0 ? 'text-yellow-500' : 'text-red-500'
//                           }`}>
//                             {product.stockCount}
//                           </span>
//                         </td>
//                         <td className="p-4">
//                           <span className={`inline-flex px-2 py-1 rounded text-xs font-medium ${
//                             product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
//                           }`}>
//                             {product.inStock ? 'In Stock' : 'Out of Stock'}
//                           </span>
//                         </td>
//                         <td className="p-4">
//                           <div className="flex items-center space-x-2">
//                             <Button
//                               variant="outline"
//                               size="sm"
//                               onClick={() => window.open(`/product/${product.id}`, '_blank')}
//                             >
//                               <Eye className="h-4 w-4" />
//                             </Button>
//                             <Button
//                               variant="outline"
//                               size="sm"
//                               onClick={() => handleEditProduct(product)}
//                             >
//                               <Edit className="h-4 w-4" />
//                             </Button>
//                             <Button
//                               variant="outline"
//                               size="sm"
//                               onClick={() => handleDeleteProduct(product.id!)}
//                               className="text-red-500 hover:text-red-600"
//                             >
//                               <Trash2 className="h-4 w-4" />
//                             </Button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

// src/components/admin/AdminDashboard.tsx
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ProductForm from './productForm';
import { SyncProductsButton } from './SyncProducts'; // Add this import
import { productService, Product } from '@/services/productServices';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Search,
  Package,
  DollarSign,
  TrendingUp,
  Users
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const { userProfile, isAdmin } = useAuth();

  useEffect(() => {
    if (!isAdmin) {
      // Redirect non-admin users
      window.location.href = '/';
      return;
    }
    fetchProducts();
  }, [isAdmin]);

  useEffect(() => {
    filterProducts();
  }, [products, searchTerm, selectedCategory]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const fetchedProducts = await productService.getAllProducts();
      setProducts(fetchedProducts);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    setFilteredProducts(filtered);
  };

  const handleAddProduct = () => {
    setEditingProduct(undefined);
    setShowProductForm(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setShowProductForm(true);
  };

  const handleDeleteProduct = async (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await productService.deleteProduct(productId);
        await fetchProducts(); // Refresh the list
      } catch (error) {
        console.error('Failed to delete product:', error);
        alert('Failed to delete product');
      }
    }
  };

  const handleProductSaved = () => {
    setShowProductForm(false);
    setEditingProduct(undefined);
    fetchProducts(); // Refresh the list
  };

  const categories = [...new Set(products.map(p => p.category))];

  // Dashboard stats
  const totalProducts = products.length;
  const inStockProducts = products.filter(p => p.inStock).length;
  const totalValue = products.reduce((sum, p) => sum + (p.price * p.stockCount), 0);
  const averagePrice = totalProducts > 0 ? totalValue / totalProducts : 0;

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
            <p className="text-muted-foreground">You don't have permission to access this page.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showProductForm) {
    return (
      <ProductForm
        product={editingProduct}
        onSave={handleProductSaved}
        onCancel={() => {
          setShowProductForm(false);
          setEditingProduct(undefined);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {userProfile?.displayName}
            </p>
          </div>
          <Button onClick={handleAddProduct} className="btn-racing">
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </div>

        {/* Add Sync Products Button here - REMOVE AFTER FIRST USE */}
        <SyncProductsButton />

        {/* Stats Cards
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Products</p>
                  <p className="text-2xl font-bold">{totalProducts}</p>
                </div>
                <Package className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">In Stock</p>
                  <p className="text-2xl font-bold">{inStockProducts}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Value</p>
                  <p className="text-2xl font-bold">₦{totalValue.toFixed(0)}</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Price</p>
                  <p className="text-2xl font-bold">₦{averagePrice.toFixed(0)}</p>
                </div>
                <Users className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
        </div> */}

        {/* Filters */}
        {/* <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary bg-background"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary bg-background"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </CardContent>
        </Card> */}

        {/* Products Table */}
        {/* <Card>
          <CardHeader>
            <CardTitle>Products ({filteredProducts.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                <p className="mt-4 text-muted-foreground">Loading products...</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-8">
                <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No products found</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-4">Product</th>
                      <th className="text-left p-4">Category</th>
                      <th className="text-left p-4">Price</th>
                      <th className="text-left p-4">Stock</th>
                      <th className="text-left p-4">Status</th>
                      <th className="text-left p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((product) => (
                      <tr key={product.id} className="border-b border-border hover:bg-secondary/50">
                        <td className="p-4">
                          <div className="flex items-center space-x-3">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-12 h-12 object-cover rounded"
                            />
                            <div>
                              <p className="font-medium">{product.name}</p>
                              <p className="text-sm text-muted-foreground">{product.brand}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="bg-secondary px-2 py-1 rounded text-sm">
                            {product.category}
                          </span>
                        </td>
                        <td className="p-4">
                          <div>
                            <span className="font-medium">₦{product.price.toLocaleString()}</span>
                            {product.originalPrice && (
                              <span className="text-sm text-muted-foreground line-through ml-2">
                                ₦{product.originalPrice.toLocaleString()}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="p-4">
                          <span className={`${
                            product.stockCount > 10 ? 'text-green-500' : 
                            product.stockCount > 0 ? 'text-yellow-500' : 'text-red-500'
                          }`}>
                            {product.stockCount}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className={`inline-flex px-2 py-1 rounded text-xs font-medium ${
                            product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {product.inStock ? 'In Stock' : 'Out of Stock'}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => window.open(`/product/${product.id}`, '_blank')}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditProduct(product)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteProduct(product.id!)}
                              className="text-red-500 hover:text-red-600"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card> */}
      </div>
    </div>
  );
};

export default AdminDashboard;