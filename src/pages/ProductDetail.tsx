import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft, Heart, ShoppingCart, Star, Plus, Minus } from 'lucide-react';
import AnimatedButton from '../components/UI/AnimatedButton';
import { useCart } from '../context/CartContext';
import { Product } from '../types';

gsap.registerPlugin(ScrollTrigger);

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const imageRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const { dispatch } = useCart();

  // Sample product data (in a real app, this would be fetched)
  const product: Product = {
    id: id || '1',
    name: 'Midnight Rose',
    price: 89,
    description: 'A captivating blend of Bulgarian rose and dark vanilla, perfect for evening wear. This luxurious fragrance opens with fresh bergamot and pink pepper, revealing a heart of Bulgarian rose and jasmine, finished with a warm base of vanilla, sandalwood, and patchouli.',
    image: 'https://images.pexels.com/photos/1034651/pexels-photo-1034651.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Floral',
    fragrance_notes: ['Bergamot', 'Pink Pepper', 'Bulgarian Rose', 'Jasmine', 'Vanilla', 'Sandalwood', 'Patchouli'],
    in_stock: true,
    featured: true
  };

  const productImages = [
    'https://images.pexels.com/photos/1034651/pexels-photo-1034651.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1690351/pexels-photo-1690351.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1721932/pexels-photo-1721932.jpeg?auto=compress&cs=tinysrgb&w=800'
  ];

  useEffect(() => {
    // Image entrance animation
    if (imageRef.current) {
      gsap.fromTo(imageRef.current,
        { x: -100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power2.out" }
      );
    }

    // Details entrance animation
    if (detailsRef.current) {
      gsap.fromTo('.detail-item',
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          delay: 0.3
        }
      );
    }

    // Scroll-triggered animations
    gsap.fromTo('.fragrance-notes',
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: '.fragrance-notes',
          start: 'top 80%',
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_TO_CART', product, quantity });
  };

  const handleQuantityChange = (change: number) => {
    setQuantity(Math.max(1, quantity + change));
  };

  return (
    <div className="min-h-screen pt-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
          <Link to="/products" className="flex items-center gap-1 hover:text-purple-600 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div ref={imageRef} className="space-y-4">
            <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden">
              <img
                src={productImages[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? 'border-purple-600' : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div ref={detailsRef} className="space-y-6">
            <div>
              <span className="detail-item inline-block px-3 py-1 text-sm font-medium text-purple-600 bg-purple-100 rounded-full mb-3">
                {product.category}
              </span>
              <h1 className="detail-item text-4xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>
              <div className="detail-item flex items-center gap-4 mb-4">
                <span className="text-3xl font-bold text-purple-600">
                  ${product.price}
                </span>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="text-sm text-gray-600 ml-1">(124 reviews)</span>
                </div>
              </div>
              <p className="detail-item text-gray-600 text-lg leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="detail-item">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="p-2 hover:bg-gray-100 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 text-lg font-medium">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="p-2 hover:bg-gray-100 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-sm text-gray-600">
                  {product.in_stock ? 'In stock' : 'Out of stock'}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="detail-item flex gap-4">
              <AnimatedButton
                onClick={handleAddToCart}
                size="lg"
                className="flex-1 flex items-center justify-center gap-2"
                disabled={!product.in_stock}
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </AnimatedButton>
              <button className="p-3 border-2 border-gray-300 rounded-lg hover:border-red-500 hover:text-red-500 transition-colors">
                <Heart className="w-6 h-6" />
              </button>
            </div>

            {/* Product Features */}
            <div className="detail-item space-y-4 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-900">Size:</span>
                  <span className="text-gray-600 ml-2">50ml / 1.7 fl oz</span>
                </div>
                <div>
                  <span className="font-medium text-gray-900">Type:</span>
                  <span className="text-gray-600 ml-2">Eau de Parfum</span>
                </div>
                <div>
                  <span className="font-medium text-gray-900">Longevity:</span>
                  <span className="text-gray-600 ml-2">6-8 hours</span>
                </div>
                <div>
                  <span className="font-medium text-gray-900">Sillage:</span>
                  <span className="text-gray-600 ml-2">Moderate</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fragrance Notes */}
        <div className="fragrance-notes mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Fragrance Profile
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🍋</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Top Notes</h3>
              <p className="text-gray-600">Bergamot, Pink Pepper</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌹</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Heart Notes</h3>
              <p className="text-gray-600">Bulgarian Rose, Jasmine</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌿</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Base Notes</h3>
              <p className="text-gray-600">Vanilla, Sandalwood, Patchouli</p>
            </div>
          </div>
        </div>

        {/* All Fragrance Notes */}
        <div className="mt-12 bg-gray-50 rounded-2xl p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">All Notes</h3>
          <div className="flex flex-wrap gap-2">
            {product.fragrance_notes.map((note, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-purple-100 text-purple-700 text-sm font-medium rounded-full"
              >
                {note}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;