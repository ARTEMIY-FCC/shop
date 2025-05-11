import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { CartItem } from '../types';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  total: number;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, cart, total }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const cartItemsList = cart.map(item => `${item.product.name} (${item.quantity} шт.)`).join(', ');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Инструкция по оплате</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <p className="mb-3">Напишите продавцу <a href="https://t.me/Burguss" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline font-medium">t.me/Burguss</a>, и отправьте сообщение:</p>
          <div className="bg-white p-3 rounded border border-gray-200">
            <p className="text-gray-700 break-words">"Привет! хочу заказать у вас {cartItemsList}"</p>
          </div>
        </div>
        
        <p className="text-gray-600 mb-4">Общая сумма вашего заказа: <span className="font-bold text-teal-600">{total} ₽</span></p>
        
        <p className="text-gray-600">После отправки сообщения ожидайте ответа от продавца с дальнейшими инструкциями по оплате и доставке.</p>
        
        <button
          onClick={onClose}
          className="mt-6 w-full py-3 bg-teal-500 hover:bg-teal-600 text-white font-medium rounded-lg transition-colors"
        >
          Понятно
        </button>
      </div>
    </div>
  );
};

export default PaymentModal;