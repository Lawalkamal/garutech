import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLocation } from 'react-router-dom';
import { useProductsContext } from '@/contexts/ProductsContext';
import { categories, getSubCategoriesByParent } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { 
  Search, 
  Filter, 
  Star, 
  Grid, 
  List,
  ChevronDown,
  ChevronRight,
  SlidersHorizontal
} from 'lucide-react';

const Shop: React.FC = () => {
  const { addItem } = useCart();
  const { products, loading, error } = useProductsContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSubCategory, setSelectedSubCategory] = useState('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 30000000]);
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  const location = useLocation();
  
  React.useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryFromUrl = params.get('category');
    const subCategoryFromUrl = params.get('subCategory');
    
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
      if (categoryFromUrl !== 'all') {
        setExpandedCategories(prev => new Set([...prev, categoryFromUrl]));
      }
    }
    if (subCategoryFromUrl) {
      setSelectedSubCategory(subCategoryFromUrl);
    }
  }, [location.search]);

  const toggleCategoryExpansion = (categoryId: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSelectedSubCategory('all'); // Reset sub-category when main category changes
    
    if (categoryId !== 'all') {
      setExpandedCategories(prev => new Set([...prev, categoryId]));
    }
  };

  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (product.brand || '').toLowerCase().includes(searchTerm.toLowerCase());
      
      // Handle both string and array categories
      const matchesCategory = selectedCategory === 'all' || (() => {
        if (Array.isArray(product.category)) {
          return product.category.includes(selectedCategory);
        }
        return product.category === selectedCategory;
      })();

      // Handle sub-category filtering
      const matchesSubCategory = selectedSubCategory === 'all' || (() => {
        if (!product.subCategory) return false;
        if (Array.isArray(product.subCategory)) {
          return product.subCategory.includes(selectedSubCategory);
        }
        return product.subCategory === selectedSubCategory;
      })();
      
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      
      return matchesSearch && matchesCategory && (selectedSubCategory === 'all' || matchesSubCategory) && matchesPrice;
    });

    // Sort products
    filtered.sort((a, b) => {

       const aPriority = a.priority !== undefined ? a.priority : Number.MAX_SAFE_INTEGER;
    const bPriority = b.priority !== undefined ? b.priority : Number.MAX_SAFE_INTEGER;

      if (aPriority !== bPriority) {
      return aPriority - bPriority;
    }

    if (aPriority !== bPriority) {
      return aPriority - bPriority;
    }

      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [products, searchTerm, selectedCategory, selectedSubCategory, priceRange, sortBy]);

  // Get sub-categories for selected main category
  const availableSubCategories = selectedCategory !== 'all' 
    ? getSubCategoriesByParent(selectedCategory) 
    : [];

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg">Loading products...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-600">
          <p className="text-lg mb-4">Error loading products: {error}</p>
          <Button 
            onClick={() => window.location.reload()} 
            className="btn-racing"
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-white py-12 border-b border-border text-gray-700">
        <div className="container mx-auto px-4">
          <h1 className="font-poppins font-bold text-4xl text-center mb-4">
            GaruTech Shop
          </h1>
          <p className="text-center text-black text-lg max-w-2xl mx-auto">
            Find the perfect tools and equipment for your vehicle from our extensive catalog of premium automotive equipment.
          </p>
          
          {/* Breadcrumb */}
          {(selectedCategory !== 'all' || selectedSubCategory !== 'all') && (
            <div className="flex items-center justify-center mt-4 text-sm">
              <Link to="/shop" className="text-muted-foreground hover:text-primary">
                All Products
              </Link>
              {selectedCategory !== 'all' && (
                <>
                  <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
                  <span className="text-primary font-medium">
                    {categories.find(c => c.id === selectedCategory)?.name}
                  </span>
                </>
              )}
              {selectedSubCategory !== 'all' && (
                <>
                  <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
                  <span className="text-primary font-medium">
                    {availableSubCategories.find(s => s.id === selectedSubCategory)?.name}
                  </span>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8 text-white">
          {/* Sidebar Filters */}
          <div className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-lg text-background">Filters</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('all');
                      setSelectedSubCategory('all');
                      setPriceRange([0, 30000000]);
                      setSortBy('name');
                    }}
                  >
                    Clear All
                  </Button>
                </div>

                {/* Search */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-background text-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Category Filter with Sub-categories */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Categories</label>
                  <div className="space-y-1">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        value="all"
                        checked={selectedCategory === 'all'}
                        onChange={(e) => handleCategoryChange(e.target.value)}
                        className="mr-2"
                      />
                      All Categories
                    </label>
                    
                    {categories.map((category) => (
                      <div key={category.id}>
                        <div className="flex items-center">
                          <label className="flex items-center flex-1">
                            <input
                              type="radio"
                              name="category"
                              value={category.id}
                              checked={selectedCategory === category.id}
                              onChange={(e) => handleCategoryChange(e.target.value)}
                              className="mr-2"
                            />
                            {category.name}
                          </label>
                          {category.subCategories && category.subCategories.length > 0 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleCategoryExpansion(category.id)}
                              className="p-1 h-auto"
                            >
                              <ChevronDown 
                                className={`h-3 w-3 transition-transform ${
                                  expandedCategories.has(category.id) ? 'rotate-180' : ''
                                }`} 
                              />
                            </Button>
                          )}
                        </div>
                        
                        {/* Sub-categories */}
                        {category.subCategories && 
                         category.subCategories.length > 0 && 
                         expandedCategories.has(category.id) && (
                          <div className="ml-6 mt-2 space-y-1 border-l border-border pl-3">
                            {category.subCategories.map((subCategory) => (
                              <label key={subCategory.id} className="flex items-center text-sm">
                                <input
                                  type="radio"
                                  name="subCategory"
                                  value={subCategory.id}
                                  checked={selectedSubCategory === subCategory.id && selectedCategory === category.id}
                                  onChange={(e) => {
                                    setSelectedCategory(category.id);
                                    setSelectedSubCategory(e.target.value);
                                  }}
                                  className="mr-2"
                                />
                                {subCategory.name}
                              </label>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sub-category Filter for Selected Main Category */}
                {/* {selectedCategory !== 'all' && availableSubCategories.length > 0 && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Sub-categories</label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="subCategory"
                          value="all"
                          checked={selectedSubCategory === 'all'}
                          onChange={(e) => setSelectedSubCategory(e.target.value)}
                          className="mr-2"
                        />
                        All {categories.find(c => c.id === selectedCategory)?.name}
                      </label>
                      {availableSubCategories.map((subCategory) => (
                        <label key={subCategory.id} className="flex items-center">
                          <input
                            type="radio"
                            name="subCategory"
                            value={subCategory.id}
                            checked={selectedSubCategory === subCategory.id}
                            onChange={(e) => setSelectedSubCategory(e.target.value)}
                            className="mr-2"
                          />
                          {subCategory.name}
                        </label>
                      ))}
                    </div>
                  </div>
                )} */}

                {/* Price Range */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Price Range</label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="30000000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>₦{priceRange[0]}</span>
                      <span>₦{priceRange[1]}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden"
                >
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                </Button>
                <p className="text-muted-foreground">
                  Showing {filteredProducts.length} of {products.length} products
                </p>
              </div>

              <div className="flex items-center gap-4">
                {/* Sort Dropdown */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-background border border-border rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="name">Sort by Name</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                </div>

                {/* View Mode Toggle */}
                <div className="flex border border-border rounded-lg overflow-hidden text-black">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="rounded-none"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="rounded-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            <div className={
              viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
                : 'space-y-4'
            }>
              {filteredProducts.map((product) => (
                <Card key={product.id} className="">
                  <CardContent className={viewMode === 'grid' ? 'p-0' : 'p-6'}>
                    {viewMode === 'grid' ? (
                      // Grid View
                      <>
                        <Link to={`/product/${product.id}`}>
                          <div className="aspect-square overflow-hidden rounded-t-lg">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        </Link>
                        <div className="p-6">
                          {/* Category/Sub-category badges */}
                          <div className="flex flex-wrap gap-1 mb-2">
                            {Array.isArray(product.category) ? 
                              product.category.map((cat) => (
                                <span key={cat} className="inline-block px-2 py-1 text-xs bg-primary/10 text-primary rounded">
                                  {categories.find(c => c.id === cat)?.name || cat}
                                </span>
                              )) : (
                                <span className="inline-block px-2 py-1 text-xs bg-primary/10 text-primary rounded">
                                  {categories.find(c => c.id === product.category)?.name || product.category}
                                </span>
                              )
                            }
                            {product.subCategory && (
                              <span className="inline-block px-2 py-1 text-xs bg-primary/10 text-primary rounded">
                                {Array.isArray(product.subCategory) 
                                  ? product.subCategory.map(sub => 
                                      availableSubCategories.find(s => s.id === sub)?.name || sub
                                    ).join(', ')
                                  : availableSubCategories.find(s => s.id === product.subCategory)?.name || product.subCategory
                                }
                              </span>
                            )}
                          </div>
                          
                          <div className="flex items-center mb-2">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < Math.floor(product.rating || 0)
                                      ? 'text-yellow-400 fill-current'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-muted-foreground ml-2">
                              ({product.reviews || 0})
                            </span>
                          </div>
                          <Link to={`/product/${product.id}`}>
                            <h3 className="font-semibold text-lg mb-2 hover:text-primary transition-colors line-clamp-2">
                              {product.name}
                            </h3>
                          </Link>
                          {/* <p className="text-sm text-muted-foreground mb-2">{product.brand}</p> */}
                          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                            {product.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <span className="font-bold text-xl text-primary">
                                 ₦{product.price.toLocaleString()}
                              </span>
                              {product.originalPrice && (
                                <span className="text-sm text-muted-foreground line-through">
                                  ₦{product.originalPrice.toLocaleString()}
                                </span>
                              )}
                            </div>
                            <Button
                              onClick={() => addItem(product)}
                              className="btn-racing"
                              size="sm"
                            >
                              Add to Cart
                            </Button>
                          </div>
                        </div>
                      </>
                    ) : (
                      // List View
                      <div className="flex gap-6">
                        <Link to={`/product/${product.id}`} className="flex-shrink-0">
                          <div className="w-32 h-32 overflow-hidden rounded-lg">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        </Link>
                        <div className="flex-1">
                          {/* Category/Sub-category badges */}
                          <div className="flex flex-wrap gap-1 mb-2">
                            {Array.isArray(product.category) ? 
                              product.category.map((cat) => (
                                <span key={cat} className="inline-block px-2 py-1 text-xs bg-primary/10 text-primary rounded">
                                  {categories.find(c => c.id === cat)?.name || cat}
                                </span>
                              )) : (
                                <span className="inline-block px-2 py-1 text-xs bg-primary/10 text-primary rounded">
                                  {categories.find(c => c.id === product.category)?.name || product.category}
                                </span>
                              )
                            }
                            {product.subCategory && (
                              <span className="inline-block px-2 py-1 text-xs bg-primary/10 text-primary rounded">
                                {Array.isArray(product.subCategory) 
                                  ? product.subCategory.map(sub => 
                                      availableSubCategories.find(s => s.id === sub)?.name || sub
                                    ).join(', ')
                                  : availableSubCategories.find(s => s.id === product.subCategory)?.name || product.subCategory
                                }
                              </span>
                            )}
                          </div>
                          
                          <div className="flex items-center mb-2">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < Math.floor(product.rating || 0)
                                      ? 'text-yellow-400 fill-current'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-muted-foreground ml-2">
                              ({product.reviews || 0})
                            </span>
                          </div>
                          <Link to={`/product/${product.id}`}>
                            <h3 className="font-semibold text-xl mb-2 hover:text-primary transition-colors">
                              {product.name}
                            </h3>
                          </Link>
                          <p className="text-sm text-muted-foreground mb-2">{product.brand}</p>
                          <p className="text-muted-foreground mb-4 line-clamp-3">
                            {product.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <span className="font-bold text-2xl text-primary">
                                 ₦{product.price.toLocaleString()}
                              </span>
                              {product.originalPrice && (
                                <span className="text-muted-foreground line-through">
                                   ₦{product.originalPrice.toLocaleString()}
                                </span>
                              )}
                            </div>
                            <Button
                              onClick={() => addItem(product)}
                              className="btn-racing"
                            >
                              Add to Cart
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg mb-4">
                  No products found matching your criteria.
                </p>
                <Button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                    setSelectedSubCategory('all');
                    setPriceRange([0, 30000000]);
                  }}
                  variant="outline"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;