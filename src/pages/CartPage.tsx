import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import PaymentModal from '../components/PaymentModal';

const CartPage: React.FC = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  
  const totalPrice = getCartTotal();
  const isEmpty = cart.length === 0;

  return (
    <div className="container mx-auto px-4 py-32">
      <h1 className="text-3xl font-bold mb-6">Корзина</h1>
      
      {isEmpty ? (
        <div className="text-center py-12">
          <div className="flex justify-center mb-4">
            <ShoppingCart size={64} className="text-gray-300" />
          </div>
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Ваша корзина пуста</h2>
          <p className="text-gray-500 mb-8">Добавьте товары в корзину, чтобы оформить заказ</p>
          <Link 
            to="/" 
            className="inline-flex items-center bg-teal-500 hover:bg-teal-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            <ArrowLeft className="mr-2" size={20} />
            Вернуться к покупкам
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <h2 className="text-xl font-semibold">Товары в корзине</h2>
              </div>
              
              <div className="divide-y divide-gray-100">
                {cart.map(item => (
                  <div key={item.product.id} className="p-4">
                    <CartItem item={item} />
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-4">Итого</h2>
              
              <div className="mb-4 pb-4 border-b border-gray-100">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Стоимость товаров</span>
                  <span className="font-medium">{totalPrice} ₽</span>
                </div>
              </div>
              
              <div className="flex justify-between mb-6">
                <span className="text-lg font-semibold">К оплате</span>
                <span className="text-lg font-bold text-teal-600">{totalPrice} ₽</span>
              </div>
              
              <button
                onClick={() => setShowPaymentModal(true)}
                className="w-full py-3 bg-orange-400 hover:bg-orange-500 text-white font-bold rounded-lg transition-colors mb-4"
              >
                Оплатить {totalPrice} ₽
              </button>
              
              <Link 
                to="/" 
                className="block w-full text-center py-3 text-teal-600 hover:text-teal-500 font-medium transition-colors"
              >
                Продолжить покупки
              </Link>
              
              <button
                onClick={clearCart}
                className="block w-full text-center py-3 text-gray-500 hover:text-gray-700 font-medium transition-colors mt-2"
              >
                Очистить корзину
              </button>
            </div>
          </div>
        </div>
      )}
      
      <PaymentModal 
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        cart={cart}
        total={totalPrice}
      />
    </div>
  );
};

export default CartPage;