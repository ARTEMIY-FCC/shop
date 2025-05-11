import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { ShoppingCart, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, isInCart } = useCart();
  const alreadyInCart = isInCart(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div 
      className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 group"
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-gray-800 mb-2 h-12 line-clamp-2">{product.name}</h3>
          
          <div className="flex justify-between items-center mt-2">
            <span className="text-lg font-bold text-teal-600">{product.price} ₽</span>
            
            <button
              onClick={handleAddToCart}
              className={`p-2 rounded-full transition-colors ${
                alreadyInCart 
                  ? 'bg-green-500 text-white' 
                  : 'bg-orange-400 text-white hover:bg-orange-500'
              }`}
              aria-label={alreadyInCart ? 'Добавлено в корзину' : 'Добавить в корзину'}
            >
              {alreadyInCart ? <Check size={18} /> : <ShoppingCart size={18} />}
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;