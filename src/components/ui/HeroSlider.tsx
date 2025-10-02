// components/ui/HeroSlider.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import immage1 from '@/assets/201374161358833.jpg'
import postlift from '@/assets/4PostLift.jpg'
import booth from '@/assets/201374161358833.jpg'

// You can replace these with your actual hero images
// For now, I'll use placeholder images that you can replace
const heroSlides = [
  {
    id: 1,
    image: immage1, // Replace with your hero image path
    title: "Premium Garage Equipment",
    subtitle: "Built for Performance",
    description: "Discover high-quality automotive parts and equipment trusted by mechanics nationwide. Your vehicle deserves the best.",
    primaryButton: { text: "Shop Now", link: "/shop" },
    secondaryButton: { text: "Learn More", link: "/about" }
  },
  {
    id: 2,
    image: postlift, // Replace with your hero image path
    title: "4 post Lift",
    subtitle: "₦4,500,000.00",
    description: "Heavy-duty 4-post car lift designed for vehicle lifting, alignment, and maintenance tasks in professional garages.",
    primaryButton: { text: "Buy Now", link: "/shop" },
    secondaryButton: { text: "Details", link: "/about" }
  },
  {
    id: 3,
    image: booth, // Replace with your hero image path
    title: " Garutech SprayBooth",
    subtitle: "₦27,000,000.00",
    description: "Semi-Down Draft: Air enter booth cabin through top front filtered plenum, and exhausted from the rear centered exhaust plenum",
    primaryButton: { text: "Buy Now", link: "/shop" },
    secondaryButton: { text: "Details", link: "/contact" }
  }
];

interface HeroSliderProps {
  autoSlideInterval?: number;
}

const HeroSlider: React.FC<HeroSliderProps> = ({ autoSlideInterval = 5000 }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto slide functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, autoSlideInterval);

    return () => clearInterval(interval);
  }, [autoSlideInterval, isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <section className="hero-section md:w-3/4 relative mx-auto h-[50vh] flex items-center justify-center overflow-hidden">
      {/* Slide Images */}
      {heroSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0  bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
      ))}
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {heroSlides.map((slide, index) => (
            <div
              key={`content-${slide.id}`}
              className={`transition-all duration-500 ${
                index === currentSlide 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-4 absolute inset-x-0'
              }`}
            >
              <h1 className="font-poppins font-bold text-1xl md:text-6xl text-white mb-6">
                {slide.title}
                <span className="block text-racing-red">{slide.subtitle}</span>
              </h1>
              <p className="text-l md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
                {slide.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to={slide.primaryButton.link}>
                  <Button className="btn-racing text-lg px-5 py-2 h-auto">
                    {slide.primaryButton.text}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to={slide.secondaryButton.link}>
                  <Button variant="outline" className="btn-metallic text-lg px-5 py-2 h-auto">
                    {slide.secondaryButton.text}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white scale-125' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      {/* <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/30">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-red-500 transition-all duration-100 ease-linear"
          style={{ 
            width: isAutoPlaying ? '100%' : '0%',
            animation: isAutoPlaying ? `progress ${autoSlideInterval}ms linear infinite` : 'none'
          }}
        />
      </div> */}

      <style >{`
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </section>
  );
};

export default HeroSlider;