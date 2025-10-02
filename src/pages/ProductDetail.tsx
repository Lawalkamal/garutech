import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useProductsContext } from '@/contexts/ProductsContext';
import { useCart } from '@/contexts/CartContext';
import YouTubeVideo from '@/components/YouTubeVideo';
import { 
  Star, 
  Plus, 
  Minus, 
  Shield, 
  Truck, 
  RotateCcw,
  ArrowLeft,
  Heart,
  Share2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';


const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCart();
  const { getProduct, getRelatedProducts, loading, error } = useProductsContext();
  const [quantity, setQuantity] = useState(1);
  const [selectedTab, setSelectedTab] = useState('description');
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showSpecs, setShowSpecs] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);

  // Scroll to top when product ID changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const product = getProduct(id || '');
  const related = getRelatedProducts(id || '');

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading product details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center text-red-600">
          <p className="mb-4">Error loading product: {error}</p>
          <Link to="/shop">
            <Button>Back to Shop</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Product not found
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-xl md:text-2xl font-bold mb-4">Product not found</h1>
          <Link to="/shop">
            <Button>Back to Shop</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Mobile Header - Only visible on mobile */}
      <div className="sticky top-0 z-10 bg-white border-b border-border px-4 py-3 md:hidden">
        <div className="flex items-center justify-between">
          <Link to="/shop" className="flex items-center text-muted-foreground">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="font-semibold text-sm truncate mx-4 flex-1">
            {product.name}
          </h1>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Heart className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Desktop Breadcrumb - Hidden on mobile */}
      <div className="bg-whitw py-4 hidden md:block">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-primary">
              Home
            </Link>
            <span className="text-muted-foreground">/</span>
            <Link to="/shop" className="text-muted-foreground hover:text-primary">
              Shop
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-black">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4 md:py-8 pb-20 md:pb-8">
        {/* Desktop Back Button - Hidden on mobile */}
        <Link to="/shop" className="hidden md:inline-flex items-center text-muted-foreground hover:text-primary mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 mb-8 lg:mb-16">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg bg-secondary">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-4 lg:space-y-6">
            <div>
              <div className="flex items-center mb-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 lg:h-5 lg:w-5 ${
                        i < Math.floor(product.rating || 0)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-muted-foreground ml-2 text-sm lg:text-base">
                  ({product.reviews || 0} reviews)
                </span>
              </div>
              <h1 className="font-poppins font-bold text-2xl lg:text-3xl mb-2">
                {product.name}
              </h1>
              
              <div className="flex items-center space-x-3 lg:space-x-4 mb-6">
                <span className="font-bold text-2xl lg:text-3xl text-primary">
                  ₦{product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-lg lg:text-xl text-muted-foreground line-through">
                    ₦{product.originalPrice.toLocaleString()}
                  </span>
                )}
                {product.originalPrice && (
                  <span className="bg-primary text-primary-foreground px-2 py-1 rounded text-xs lg:text-sm font-medium">
                    Save ₦{(product.originalPrice - product.price).toLocaleString()}
                  </span>
                )}
              </div>
            </div>

            {/* Mobile: Collapsible description, Desktop: Full description */}
            <div className="lg:block">
              <p className="text-muted-foreground leading-relaxed text-sm lg:text-base">
                <span className="md:hidden">
                  {showFullDescription 
                    ? product.description 
                    : `${product.description.substring(0, 120)}...`
                  }
                </span>
                <span className="hidden md:block">
                  {product.description}
                </span>
              </p>
              <button
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="text-primary text-sm font-medium mt-2 flex items-center md:hidden"
              >
                {showFullDescription ? 'Show less' : 'Read more'}
                {showFullDescription ? 
                  <ChevronUp className="h-4 w-4 ml-1" /> : 
                  <ChevronDown className="h-4 w-4 ml-1" />
                }
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 lg:h-5 lg:w-5 text-green-500" />
                <span className={`text-sm lg:text-base ${product.inStock ? 'text-green-500' : 'text-red-500'}`}>
                  {product.inStock ? `In Stock` : 'Out of Stock'}
                </span>
              </div>

              {product.inStock && (
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                  <div className="flex items-center justify-center sm:justify-start">
                    <span className="text-sm font-medium mr-4 sm:hidden">Quantity:</span>
                    <div className="flex items-center border border-border rounded-lg">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="rounded-r-none h-10 lg:h-auto"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="px-4 py-2 border-x border-border min-w-[60px] text-center">
                        {quantity}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setQuantity(Math.min(product.stockCount || 1, quantity + 1))}
                        className="rounded-l-none h-10 lg:h-auto"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <Button
                    onClick={handleAddToCart}
                    className="btn-racing  w-full "
                    size="lg"
                  >
                    Add to Cart - ₦{(product.price * quantity).toLocaleString()}
                  </Button>
                </div>
              )}

              {/* Desktop Action Buttons - Hidden on mobile */}
              <div className="hidden lg:flex space-x-4 ">
                <Button variant="outline" size="sm" className='bg-white'>
                  <Heart className="h-4 w-4 mr-2" />
                  Wishlist
                </Button>
                <Button variant="outline" size="sm" className='bg-white'>
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details - Desktop Tabs, Mobile Collapsible */}
        <div className="mb-8 lg:mb-16">
          {/* Desktop Tabs */}
          <div className="hidden lg:block">
            <div className="flex border-b border-border mb-6">
              {[
                { id: 'description', label: 'Description' },
                { id: 'specifications', label: 'Specifications' },
                { id: 'features', label: 'Features' },
                { id: 'reviews', label: 'Reviews' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`px-6 py-3 font-medium transition-colors ${
                    selectedTab === tab.id
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="max-w-4xl">
              {selectedTab === 'description' && (
                <div className="prose prose-invert max-w-none">
                  <p className="leading-relaxed">{product.description}</p>
                </div>
              )}

              {selectedTab === 'specifications' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(product.specifications || {}).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-border">
                      <span className="font-medium">{key}:</span>
                      <span className="text-muted-foreground">{value}</span>
                    </div>
                  ))}
                </div>
              )}

              {selectedTab === 'features' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(product.features || []).map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              )}

              {selectedTab === 'reviews' && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="text-4xl font-bold">{product.rating || 0}</div>
                    <div>
                      <div className="flex items-center mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${
                              i < Math.floor(product.rating || 0)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-muted-foreground">Based on {product.reviews || 0} reviews</p>
                    </div>
                  </div>
                  <div className="text-muted-foreground">
                    Customer reviews and ratings will be displayed here once available.
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Collapsible Sections */}
          <div className="space-y-4 lg:hidden">
            {/* Specifications */}
            {Object.keys(product.specifications || {}).length > 0 && (
              <div className="border border-border rounded-lg">
                <button
                  onClick={() => setShowSpecs(!showSpecs)}
                  className="w-full flex items-center justify-between p-4 text-left"
                >
                  <span className="font-medium">Specifications</span>
                  {showSpecs ? 
                    <ChevronUp className="h-4 w-4" /> : 
                    <ChevronDown className="h-4 w-4" />
                  }
                </button>
                {showSpecs && (
                  <div className="px-4 pb-4 border-t border-border">
                    <div className="space-y-2 mt-3">
                      {Object.entries(product.specifications || {}).map(([key, value]) => (
                        <div key={key} className="flex justify-between text-sm">
                          <span className="font-medium">{key}:</span>
                          <span className="text-muted-foreground text-right">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Features */}
            {(product.features || []).length > 0 && (
              <div className="border border-border rounded-lg">
                <button
                  onClick={() => setShowFeatures(!showFeatures)}
                  className="w-full flex items-center justify-between p-4 text-left"
                >
                  <span className="font-medium">Key Features</span>
                  {showFeatures ? 
                    <ChevronUp className="h-4 w-4" /> : 
                    <ChevronDown className="h-4 w-4" />
                  }
                </button>
                {showFeatures && (
                  <div className="px-4 pb-4 border-t border-border">
                    <div className="space-y-2 mt-3">
                      {(product.features || []).map((feature, index) => (
                        <div key={index} className="flex items-start space-x-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Reviews */}
            <div className="border border-border rounded-lg">
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-medium">Customer Reviews</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold">{product.rating || 0}</span>
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
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Based on {product.reviews || 0} reviews
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Customer reviews will be displayed here once available.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* PRODUCT VIDEOS SECTION - ALWAYS VISIBLE */}
        {product.videos && product.videos.length > 0 && (
          <div className="mb-8 lg:mb-16">
            <h2 className="font-poppins font-bold text-2xl lg:text-3xl mb-6 lg:mb-8">
              Product Videos
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {product.videos.map((videoUrl, index) => (
                <div key={index} className="bg-secondary rounded-lg p-4">
                  <YouTubeVideo 
                    videoUrl={videoUrl} 
                    title={`${product.name} - Video ${index + 1}`}
                  />
                  <p className="text-sm text-muted-foreground mt-2 text-center">
                    Video {index + 1}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Products */}
        <div>
          <h2 className="font-poppins font-bold text-2xl lg:text-3xl mb-6 lg:mb-8">
            <span className="md:hidden">You May Also Like</span>
            <span className="hidden md:block">Related Products</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {related.map((relatedProduct) => (
              <Card key={relatedProduct.id} className="group">
                <CardContent className="p-0">
                  <Link to={`/product/${relatedProduct.id}`}>
                    <div className="aspect-square overflow-hidden rounded-t-lg">
                      <img
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </Link>
                  <div className="p-3 lg:p-4">
                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-2.5 w-2.5 lg:h-3 lg:w-3 ${
                              i < Math.floor(relatedProduct.rating || 0)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground ml-1">
                        ({relatedProduct.reviews || 0})
                      </span>
                    </div>
                    <Link to={`/product/${relatedProduct.id}`}>
                      <h3 className="font-semibold text-sm lg:text-base mb-2 hover:text-primary transition-colors line-clamp-2">
                        {relatedProduct.name}
                      </h3>
                    </Link>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-primary text-sm lg:text-base">
                        ₦{relatedProduct.price.toLocaleString()}
                      </span>
                      <Button
                        onClick={() => addItem(relatedProduct)}
                        className="btn-racing text-xs lg:text-sm"
                        size="sm"
                      >
                        <span className="md:hidden">Add</span>
                        <span className="hidden md:block">Add to Cart</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Fixed Bottom Add to Cart - Mobile Only */}
      {product.inStock && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border p-4 z-10 md:hidden">
          <div className="flex items-center space-x-4">
            <div className="flex items-center border border-border rounded-lg">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="rounded-r-none h-10"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="px-3 py-2 border-x border-border min-w-[40px] text-center text-sm">
                {quantity}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setQuantity(Math.min(product.stockCount || 1, quantity + 1))}
                className="rounded-l-none h-10"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <Button
              onClick={handleAddToCart}
              className="btn-racing flex-1"
            >
              Add to Cart - ₦{(product.price * quantity).toLocaleString()}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;