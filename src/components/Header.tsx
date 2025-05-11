import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Header: React.FC = () => {
  const { getCartItemCount } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setMobileMenuOpen(false);
  }, [location]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
  };

  const itemCount = getCartItemCount();

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="https://github.com/ARTEMIY-FCC/cubation/blob/main/5249341044313682152.jpg?raw=true" 
              alt="CUBATION" 
              className="h-10 w-10 object-contain mr-2"
            />
            <span className="text-2xl font-bold text-teal-500">CUBATION</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-teal-500 transition-colors">Главная</Link>
            <Link to="/category/puzzles" className="text-gray-700 hover:text-teal-500 transition-colors">Головоломки</Link>
            <Link to="/category/lubricants" className="text-gray-700 hover:text-teal-500 transition-colors">Смазки</Link>
            <Link to="/category/accessories" className="text-gray-700 hover:text-teal-500 transition-colors">Аксессуары</Link>
          </nav>

          {/* Search and Cart */}
          <div className="hidden md:flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Поиск товаров..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all w-40 focus:w-64"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </form>
            <Link to="/cart" className="relative">
              <ShoppingCart className="text-gray-700 hover:text-teal-500 transition-colors" size={24} />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-400 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center space-x-4">
            <Link to="/cart" className="relative">
              <ShoppingCart className="text-gray-700" size={24} />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-400 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <form onSubmit={handleSearch} className="relative mb-4">
              <input
                type="text"
                placeholder="Поиск товаров..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </form>
            <nav className="flex flex-col space-y-3">
              <Link to="/" className="text-gray-700 hover:text-teal-500 transition-colors py-2">Главная</Link>
              <Link to="/category/puzzles" className="text-gray-700 hover:text-teal-500 transition-colors py-2">Головоломки</Link>
              <Link to="/category/lubricants" className="text-gray-700 hover:text-teal-500 transition-colors py-2">Смазки</Link>
              <Link to="/category/accessories" className="text-gray-700 hover:text-teal-500 transition-colors py-2">Аксессуары</Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;