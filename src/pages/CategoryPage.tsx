import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductsByCategory } from '../data/products';
import ProductGrid from '../components/ProductGrid';

const getCategoryTitle = (category: string): string => {
  switch (category) {
    case 'puzzles':
      return 'Головоломки';
    case 'lubricants':
      return 'Смазки';
    case 'clocks':
      return 'Часы';
    case 'accessories':
      return 'Аксессуары';
    default:
      return 'Все товары';
  }
};

const CategoryPage: React.FC = () => {
  const { category = 'all' } = useParams<{ category?: string }>();
  const products = getProductsByCategory(category);
  const categoryTitle = getCategoryTitle(category);
  
  // Scroll to top when category changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [category]);

  return (
    <div className="container mx-auto px-4 py-32">
      <h1 className="text-3xl font-bold mb-8">{categoryTitle}</h1>
      
      {/* Filtering options could go here */}
      
      <ProductGrid products={products} />
    </div>
  );
};

export default CategoryPage;