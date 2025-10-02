import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { categories } from '@/data/products';
import { useProductsContext } from '@/contexts/ProductsContext';
import { useCart } from '@/contexts/CartContext';
import HeroSlider from '@/components/ui/HeroSlider'; // Add this import
import { 
  ArrowRight, 
  Star, 
  Shield, 
  Truck, 
  Award, 
  Users,
  CheckCircle,
  Mail
} from 'lucide-react';
import heroImage from '@/assets/imagebg.jpeg';

const Index: React.FC = () => {
  const { addItem } = useCart();
  const { getFeaturedProducts } = useProductsContext();
  const featuredProducts = getFeaturedProducts();

  return (
    
    <div className="min-h-screen">
      <HeroSlider autoSlideInterval={6000} />
      {/* Hero Section */}
      {/* <section className="hero-section md:w-3/4 relative mx-auto h-[50vh] flex items-center justify-center overflow-hidden ">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat "
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="font-poppins font-bold text-5xl md:text-6xl text-white mb-6">
            Premium Garage Equipment
            <span className="block text-racing-red">Built for Performance</span>
          </h1>
          <p className="text-1xl md:text-1xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Discover high-quality automotive parts and equipment trusted by mechanics nationwide. 
            Your vehicle deserves the best.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/shop">
              <Button className="btn-racing text-lg px-8 py-4 h-auto">
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" className="btn-metallic text-lg px-8 py-4 h-auto">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section> */}

      {/* Featured Products */}
      <section className="py-20 ">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-poppins font-bold text-4xl mb-4">
              Featured Products
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Discover our most popular automotive tools, carefully selected for quality and performance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
  {featuredProducts.map((product) => (
    <Card key={product.id} className="group">
      <CardContent className="p-0">
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
          <div className="flex items-center mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground ml-2">
              ({product.reviews})
            </span>
          </div>
          <Link to={`/product/${product.id}`}>
            <h3 className="font-semibold text-lg mb-2 line-clamp-2 hover:text-primary transition-colors">
              {product.name}
            </h3>
          </Link>
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
      </CardContent>
    </Card>
  ))}
</div>

          <div className="text-center mt-12">
            <Link to="/shop">
              <Button className="btn-electric text-lg px-8 py-4 h-auto">
                View All Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 ">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-poppins font-bold text-4xl mb-4">
              Shop by Category
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Find exactly what you need for your vehicle with our comprehensive catalog.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link key={category.id} to={`/shop?category=${category.id}`}>
                <Card className=" text-center hover-lift cursor-pointer">
                  <CardContent className="p-6">
                    <div className="text-4xl mb-4">{category.icon}</div>
                    <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
                    <p className="text-muted-foreground text-sm">
                      {category.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-poppins font-bold text-4xl mb-4">
              Trusted by Professionals
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              See what our customers say about our products and service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Eze Okeke",
                role: "Auto Mechanic",
                content: "Best quality parts I've used in 20 years. Fast shipping and great customer service.",
                rating: 5
              },
              {
                name: "Sarah Chima",
                role: "Fleet Manager",
                content: "Reliable tools for our entire fleet. GaruTech has never let us down.",
                rating: 5
              },
              {
                name: "Oluwadare David",
                role: "DIY Enthusiast",
                content: "Great prices and expert advice. Everything I need for my weekend projects.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <Card key={index} className="">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Premium Quality</h3>
              <p className="text-muted-foreground text-sm">OEM and aftermarket parts</p>
            </div>
            <div className="text-center">
              <div className="bg-accent/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Truck className="h-8 w-8 text-accent" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Fast Shipping</h3>
              <p className="text-muted-foreground text-sm">Same day dispatch</p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Expert Support</h3>
              <p className="text-muted-foreground text-sm">Professional advice</p>
            </div>
            <div className="text-center">
              <div className="bg-accent/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-accent" />
              </div>
              <h3 className="font-semibold text-lg mb-2">10k+ Customers</h3>
              <p className="text-muted-foreground text-sm">Trusted by mechanics</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-primary/10 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
              <Mail className="h-8 w-8 text-primary" />
            </div>
            <h2 className="font-poppins font-bold text-4xl mb-4">
              Stay Updated
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Get the latest deals, new product announcements, and expert automotive tips 
              delivered straight to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <Button className="btn-racing px-8 py-3 h-auto">
                Subscribe
              </Button>
            </div>
            <div className="flex items-center justify-center mt-4 text-sm text-muted-foreground">
              <CheckCircle className="h-4 w-4 mr-2" />
              No spam, unsubscribe anytime
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;