import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, Filter } from 'lucide-react';
import ProductCard from '../components/UI/ProductCard';
import { Product } from '../types';

gsap.registerPlugin(ScrollTrigger);

const Products = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 200]);

  // Sample products data
  const products: Product[] = [
    {
      id: '1',
      name: 'Midnight Rose',
      price: 89,
      description: 'A captivating blend of Bulgarian rose and dark vanilla, perfect for evening wear.',
      image: 'https://images.pexels.com/photos/1034651/pexels-photo-1034651.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'Floral',
      fragrance_notes: ['Rose', 'Vanilla', 'Sandalwood', 'Patchouli'],
      in_stock: true,
      featured: true
    },
    {
      id: '2',
      name: 'Ocean Breeze',
      price: 75,
      description: 'Fresh aquatic scent with citrus and marine notes for a refreshing experience.',
      image: 'https://images.pexels.com/photos/1690351/pexels-photo-1690351.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'Fresh',
      fragrance_notes: ['Bergamot', 'Sea Salt', 'Driftwood', 'Lemon'],
      in_stock: true,
      featured: true
    },
    {
      id: '3',
      name: 'Golden Amber',
      price: 95,
      description: 'Warm and luxurious with amber and spice, creating an unforgettable presence.',
      image: 'https://images.pexels.com/photos/1721932/pexels-photo-1721932.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'Oriental',
      fragrance_notes: ['Amber', 'Cinnamon', 'Musk', 'Oud'],
      in_stock: true,
      featured: true
    },
    {
      id: '4',
      name: 'Wild Jasmine',
      price: 82,
      description: 'Intoxicating jasmine with hints of white tea for a sophisticated floral experience.',
      image: 'https://images.pexels.com/photos/1557980/pexels-photo-1557980.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'Floral',
      fragrance_notes: ['Jasmine', 'White Tea', 'Cedar', 'Lily'],
      in_stock: true,
      featured: true
    },
    {
      id: '5',
      name: 'Citrus Burst',
      price: 68,
      description: 'Energizing citrus blend perfect for daily wear and active lifestyles.',
      image: 'https://images.pexels.com/photos/1190829/pexels-photo-1190829.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'Citrus',
      fragrance_notes: ['Orange', 'Grapefruit', 'Mint', 'Basil'],
      in_stock: true,
      featured: false
    },
    {
      id: '6',
      name: 'Velvet Woods',
      price: 105,
      description: 'Rich woody fragrance with notes of sandalwood and cedar.',
      image: 'https://images.pexels.com/photos/1668863/pexels-photo-1668863.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'Woody',
      fragrance_notes: ['Sandalwood', 'Cedar', 'Vetiver', 'Leather'],
      in_stock: true,
      featured: false
    }
  ];

  const categories = ['all', 'Floral', 'Fresh', 'Oriental', 'Citrus', 'Woody'];

  useEffect(() => {
    // Header animation
    if (headerRef.current) {
      gsap.fromTo('.products-title',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
      );
    }

    // Product cards animation
    gsap.fromTo('.product-card',
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.products-grid',
          start: 'top 80%',
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      {/* Header */}
      <div ref={headerRef} className="bg-gradient-to-r from-purple-600 to-pink-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="products-title text-4xl md:text-5xl font-bold text-white mb-4">
            Our Fragrance Collection
          </h1>
          <p className="text-xl text-purple-200 max-w-2xl mx-auto">
            Discover your signature scent from our carefully curated selection of luxury perfumes.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Filters
              </h2>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search fragrances..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <div className="space-y-2">
                  {categories.map(category => (
                    <label key={category} className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        value={category}
                        checked={selectedCategory === category}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="text-purple-600 focus:ring-purple-500"
                      />
                      <span className="ml-2 text-sm text-gray-700 capitalize">
                        {category}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range: ${priceRange[0]} - ${priceRange[1]}
                </label>
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setPriceRange([0, 200]);
                }}
                className="w-full px-4 py-2 text-sm text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-semibold text-gray-900">
                {filteredProducts.length} Products Found
              </h2>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                <option>Sort by: Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Name: A-Z</option>
              </select>
            </div>

            <div className="products-grid grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <div key={product.id} className="product-card">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;