import React from 'react';
import { Link } from 'react-router-dom';
import { CartItem as CartItemType } from '../types';
import { Trash2 } from 'lucide-react';
import QuantityControl from './QuantityControl';
import { useCart } from '../context/CartContext';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity } = item;

  const handleIncrease = () => {
    updateQuantity(product.id, quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    }
  };

  const handleRemove = () => {
    removeFromCart(product.id);
  };

  return (
    <div className="flex items-center py-4 border-b border-gray-200 animate-fadeIn">
      {/* Product Image */}
      <Link to={`/product/${product.id}`} className="block flex-shrink-0 w-20 h-20 bg-gray-100 rounded overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover"
        />
      </Link>
      
      {/* Product Information */}
      <div className="ml-4 flex-grow">
        <Link to={`/product/${product.id}`} className="font-medium text-gray-800 hover:text-teal-600 transition-colors">
          {product.name}
        </Link>
        <div className="text-teal-600 font-semibold mt-1">{product.price} ₽</div>
      </div>
      
      {/* Quantity Controls */}
      <div className="flex items-center">
        <QuantityControl
          quantity={quantity}
          onIncrease={handleIncrease}
          onDecrease={handleDecrease}
        />
        
        {/* Remove button */}
        <button 
          onClick={handleRemove}
          className="ml-4 p-2 text-gray-400 hover:text-red-500 transition-colors"
          aria-label="Удалить из корзины"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;