import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { searchProducts } from '../data/products';
import ProductGrid from '../components/ProductGrid';
import { Search } from 'lucide-react';

const SearchPage: React.FC = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q') || '';
  const [searchTerm, setSearchTerm] = useState(query);
  const [results, setResults] = useState(searchProducts(query));

  // Update results when query changes
  useEffect(() => {
    setSearchTerm(query);
    setResults(searchProducts(query));
    window.scrollTo(0, 0);
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchTerm.trim()) return;
    
    // Update URL with new search term
    const newUrl = `/search?q=${encodeURIComponent(searchTerm)}`;
    window.history.pushState({ path: newUrl }, '', newUrl);
    
    // Update results
    setResults(searchProducts(searchTerm));
  };

  return (
    <div className="container mx-auto px-4 py-32">
      <h1 className="text-3xl font-bold mb-6">Поиск товаров</h1>
      
      <form onSubmit={handleSearch} className="mb-8">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Введите название товара или категории"
            className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
          />
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <Search className="text-gray-400" size={20} />
          </div>
          <button 
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Найти
          </button>
        </div>
      </form>

      {query && (
        <div className="mb-6">
          <p className="text-gray-600">
            Результаты поиска по запросу: <span className="font-semibold">"{query}"</span>
          </p>
        </div>
      )}
      
      <ProductGrid products={results} />
    </div>
  );
};

export default SearchPage;