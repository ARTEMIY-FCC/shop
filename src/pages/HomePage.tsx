import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid';
import { products } from '../data/products';

const HomePage: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Set isLoaded to true after component mounts to trigger animations
  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Get featured and newest products
  const featuredProducts = products.slice(0, 8);
  const newestProducts = [...products].reverse().slice(0, 4);

  // Categories for display
  const categories = [
    { name: 'Головоломки', slug: 'puzzles', image: 'https://github.com/ARTEMIY-FCC/cubation/blob/main/5190960825169471020.jpg?raw=true' },
    { name: 'Смазки', slug: 'lubricants', image: 'https://github.com/ARTEMIY-FCC/cubation/blob/main/5190960825169472184.jpg?raw=true' },
    { name: 'Часы', slug: 'clocks', image: 'https://github.com/ARTEMIY-FCC/cubation/blob/main/5190960825169471544.jpg?raw=true' },
    { name: 'Аксессуары', slug: 'accessories', image: 'https://github.com/ARTEMIY-FCC/cubation/blob/main/5211197641621370266.jpg?raw=true' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(https://github.com/ARTEMIY-FCC/cubation/blob/main/5190960825169471020.jpg?raw=true)`,
            filter: 'brightness(0.5)'
          }}
        ></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className={`max-w-2xl transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Головоломки для всех уровней</h1>
            <p className="text-xl text-white/80 mb-8">Широкий выбор качественных головоломок, смазок и аксессуаров для спидкубинга</p>
            <Link 
              to="/category/all" 
              className="inline-flex items-center bg-teal-500 hover:bg-teal-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              Смотреть каталог
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Category Navigation */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Категории товаров</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link 
                key={category.slug}
                to={`/category/${category.slug}`}
                className={`bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="h-40 overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-xl font-semibold text-gray-800">{category.name}</h3>
                  <span className="inline-block mt-2 text-teal-600 font-medium group-hover:text-teal-500 transition-colors">
                    Смотреть все
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Популярные товары</h2>
            <Link to="/category/all" className="text-teal-600 hover:text-teal-500 font-medium inline-flex items-center">
              Смотреть все
              <ArrowRight className="ml-1" size={18} />
            </Link>
          </div>
          <ProductGrid products={featuredProducts} />
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-teal-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Почему выбирают нас</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 mx-auto bg-teal-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Качественные товары</h3>
              <p className="text-gray-600">Мы тщательно отбираем каждый товар, чтобы предложить вам только лучшее</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 mx-auto bg-teal-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Быстрая доставка</h3>
              <p className="text-gray-600">Доставляем заказы в кратчайшие сроки по всей России</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 mx-auto bg-teal-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Широкий ассортимент</h3>
              <p className="text-gray-600">От простых головоломок до профессиональных аксессуаров для спидкубинга</p>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Новинки</h2>
          <ProductGrid products={newestProducts} />
        </div>
      </section>
    </div>
  );
};

export default HomePage;