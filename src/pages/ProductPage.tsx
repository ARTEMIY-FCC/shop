import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Check } from 'lucide-react';
import { getProductById, getRelatedProducts } from '../data/products';
import { useCart } from '../context/CartContext';
import ImageGallery from '../components/ImageGallery';
import ProductGrid from '../components/ProductGrid';
import QuantityControl from '../components/QuantityControl';

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const productId = parseInt(id || '0');
  const product = getProductById(productId);
  const relatedProducts = getRelatedProducts(productId);
  
  const { addToCart, isInCart, getItemQuantity, updateQuantity } = useCart();
  const [isLoadingAnimation, setIsLoadingAnimation] = useState(true);
  
  const inCart = isInCart(productId);
  const quantity = getItemQuantity(productId);

  // Animation delay
  useEffect(() => {
    const timer = setTimeout(() => setIsLoadingAnimation(false), 100);
    return () => clearTimeout(timer);
  }, []);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <h1 className="text-3xl font-bold mb-4">Товар не найден</h1>
        <p className="text-gray-600 mb-8">Товар, который вы ищете, не существует или был удален.</p>
        <Link to="/" className="bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 px-6 rounded-lg transition-colors">
          Вернуться на главную
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleIncreaseQuantity = () => {
    updateQuantity(productId, quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      updateQuantity(productId, quantity - 1);
    }
  };

  return (
    <div className="container mx-auto px-4 py-32">
      <div className="mb-8">
        <Link to="/" className="text-teal-600 hover:text-teal-500 transition-colors">
          ← Вернуться к каталогу
        </Link>
      </div>

      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 transition-opacity duration-500 ${isLoadingAnimation ? 'opacity-0' : 'opacity-100'}`}>
        {/* Product Gallery */}
        <div>
          <ImageGallery images={product.images} alt={product.name} />
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
          
          <div className="flex items-center mb-6">
            <span className="text-3xl font-bold text-teal-600">{product.price} ₽</span>
          </div>
          
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-2">Категория</h2>
            <Link 
              to={`/category/${product.category}`}
              className="inline-block bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded transition-colors"
            >
              {product.category === 'puzzles' ? 'Головоломки' :
               product.category === 'lubricants' ? 'Смазки' :
               product.category === 'clocks' ? 'Часы' : 'Аксессуары'}
            </Link>
          </div>
          
          {/* Add to Cart */}
          <div className="mb-8">
            {!inCart ? (
              <button
                onClick={handleAddToCart}
                className="w-full py-3 bg-orange-400 hover:bg-orange-500 text-white font-bold rounded-lg transition-colors flex items-center justify-center"
              >
                <ShoppingCart className="mr-2" size={20} />
                Добавить в корзину
              </button>
            ) : (
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <Check className="text-green-500 mr-2" size={20} />
                  <span className="font-medium">Товар в корзине</span>
                </div>
                <QuantityControl
                  quantity={quantity}
                  onIncrease={handleIncreaseQuantity}
                  onDecrease={handleDecreaseQuantity}
                />
              </div>
            )}
          </div>
          
          {/* Delivery Info */}
          <div className="bg-gray-50 p-4 rounded-lg mb-8">
            <h2 className="text-lg font-semibold mb-2">Информация о доставке</h2>
            <p className="text-gray-600">Для уточнения сроков и способов доставки свяжитесь с продавцом при оформлении заказа.</p>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className={`transition-all duration-700 delay-300 ${isLoadingAnimation ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'}`}>
          <ProductGrid products={relatedProducts} title="Похожие товары" />
        </div>
      )}
    </div>
  );
};

export default ProductPage;