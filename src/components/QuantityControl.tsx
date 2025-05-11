import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';

interface QuantityControlProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove?: () => void;
  small?: boolean;
}

const QuantityControl: React.FC<QuantityControlProps> = ({
  quantity,
  onIncrease,
  onDecrease,
  onRemove,
  small = false
}) => {
  const baseButtonClasses = `flex items-center justify-center transition-colors duration-200 ${
    small ? 'w-7 h-7' : 'w-9 h-9'
  }`;

  return (
    <div className="flex items-center">
      {quantity === 1 && onRemove ? (
        <button
          onClick={onRemove}
          className={`${baseButtonClasses} text-red-500 hover:bg-red-100 rounded-full`}
          aria-label="Удалить товар"
        >
          <Trash2 size={small ? 16 : 18} />
        </button>
      ) : (
        <button
          onClick={onDecrease}
          className={`${baseButtonClasses} bg-gray-100 hover:bg-gray-200 rounded-full`}
          aria-label="Уменьшить количество"
        >
          <Minus size={small ? 16 : 18} />
        </button>
      )}
      
      <span className={`mx-3 font-medium ${small ? 'text-sm' : 'text-base'}`}>
        {quantity}
      </span>
      
      <button
        onClick={onIncrease}
        className={`${baseButtonClasses} bg-teal-100 hover:bg-teal-200 text-teal-600 rounded-full`}
        aria-label="Увеличить количество"
      >
        <Plus size={small ? 16 : 18} />
      </button>
    </div>
  );
};

export default QuantityControl;