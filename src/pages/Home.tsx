import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { ArrowRight, Star, Users, Award, Sparkles } from 'lucide-react';
import AnimatedButton from '../components/UI/AnimatedButton';
import ProductCard from '../components/UI/ProductCard';
import { Product } from '../types';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  // Sample featured products
  const featuredProducts: Product[] = [
    {
      id: '1',
      name: 'Midnight Rose',
      price: 89,
      description: 'A captivating blend of Bulgarian rose and dark vanilla',
      image: 'https://images.pexels.com/photos/1034651/pexels-photo-1034651.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'Floral',
      fragrance_notes: ['Rose', 'Vanilla', 'Sandalwood'],
      in_stock: true,
      featured: true
    },
    {
      id: '2',
      name: 'Ocean Breeze',
      price: 75,
      description: 'Fresh aquatic scent with citrus and marine notes',
      image: 'https://images.pexels.com/photos/1690351/pexels-photo-1690351.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'Fresh',
      fragrance_notes: ['Bergamot', 'Sea Salt', 'Driftwood'],
      in_stock: true,
      featured: true
    },
    {
      id: '3',
      name: 'Golden Amber',
      price: 95,
      description: 'Warm and luxurious with amber and spice',
      image: 'https://images.pexels.com/photos/1721932/pexels-photo-1721932.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'Oriental',
      fragrance_notes: ['Amber', 'Cinnamon', 'Musk'],
      in_stock: true,
      featured: true
    },
    {
      id: '4',
      name: 'Wild Jasmine',
      price: 82,
      description: 'Intoxicating jasmine with hints of white tea',
      image: 'https://images.pexels.com/photos/1557980/pexels-photo-1557980.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'Floral',
      fragrance_notes: ['Jasmine', 'White Tea', 'Cedar'],
      in_stock: true,
      featured: true
    }
  ];

  useEffect(() => {
    // Hero animations
    if (heroRef.current) {
      const tl = gsap.timeline();
      tl.fromTo('.hero-title', 
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
      )
      .fromTo('.hero-subtitle',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.8"
      )
      .fromTo('.hero-cta',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
        "-=0.4"
      );

      // Floating bottle animation
      gsap.to('.floating-bottle', {
        y: -20,
        rotation: 5,
        duration: 3,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1
      });
    }

    // Featured section animation
    gsap.fromTo('.featured-title',
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: featuredRef.current,
          start: 'top 80%',
        }
      }
    );

    // Stats animation
    gsap.fromTo('.stat-item',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: statsRef.current,
          start: 'top 80%',
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-900 via-purple-800 to-pink-800">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="text-left">
              <h1 className="hero-title text-5xl md:text-7xl font-bold text-white mb-6">
                Discover the
                <span className="block bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">
                  Essence
                </span>
                of Luxury
              </h1>
              <p className="hero-subtitle text-xl text-purple-200 mb-8 max-w-lg">
                Immerse yourself in our curated collection of premium perfumes, 
                crafted for those who appreciate the finer things in life.
              </p>
              <div className="hero-cta flex flex-col sm:flex-row gap-4">
                <Link to="/products">
                  <AnimatedButton size="lg" className="flex items-center gap-2">
                    Explore Collection
                    <ArrowRight className="w-5 h-5" />
                  </AnimatedButton>
                </Link>
                <AnimatedButton variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-purple-900">
                  Watch Story
                </AnimatedButton>
              </div>
            </div>

            {/* Floating Bottle */}
            <div className="relative">
              <div className="floating-bottle">
                <img
                  src="https://images.pexels.com/photos/1034651/pexels-photo-1034651.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Luxury Perfume"
                  className="w-96 h-auto mx-auto drop-shadow-2xl"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 to-transparent rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section ref={featuredRef} className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="featured-title text-4xl font-bold text-gray-900 mb-4">
              Featured Fragrances
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our most beloved scents, carefully selected for their exceptional quality and timeless appeal.
            </p>
          </div>

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000 }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 }
            }}
            className="pb-12"
          >
            {featuredProducts.map((product) => (
              <SwiperSlide key={product.id}>
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="stat-item text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">50K+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            
            <div className="stat-item text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">200+</div>
              <div className="text-gray-600">Unique Fragrances</div>
            </div>
            
            <div className="stat-item text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">25</div>
              <div className="text-gray-600">Awards Won</div>
            </div>
            
            <div className="stat-item text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">4.9</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Stay in the Scent
          </h2>
          <p className="text-xl text-purple-200 mb-8">
            Subscribe to our newsletter and be the first to know about new arrivals and exclusive offers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-300"
            />
            <AnimatedButton className="bg-white text-purple-600 hover:bg-gray-100">
              Subscribe
            </AnimatedButton>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;