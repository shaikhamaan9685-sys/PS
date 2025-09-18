import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ShoppingCart, Heart } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import AnimatedButton from './AnimatedButton';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { dispatch } = useCart();

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseEnter = () => {
      gsap.to(card, {
        y: -10,
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        y: 0,
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        duration: 0.3,
        ease: "power2.out"
      });
    };

    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_TO_CART', product, quantity: 1 });
  };

  return (
    <div
      ref={cardRef}
      className="bg-white rounded-xl shadow-md overflow-hidden group"
    >
      <div className="relative overflow-hidden">
        <Link to={`/products/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </Link>
        <button className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Heart className="w-4 h-4 text-gray-600 hover:text-red-500" />
        </button>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <Link to={`/products/${product.id}`}>
            <h3 className="text-lg font-semibold text-gray-900 hover:text-purple-600 transition-colors">
              {product.name}
            </h3>
          </Link>
          <span className="text-xl font-bold text-purple-600">
            ${product.price}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {product.fragrance_notes.slice(0, 3).map((note, index) => (
            <span
              key={index}
              className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full"
            >
              {note}
            </span>
          ))}
        </div>
        
        <div className="flex gap-2">
          <AnimatedButton
            onClick={handleAddToCart}
            className="flex-1 flex items-center justify-center gap-2"
            size="sm"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </AnimatedButton>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;