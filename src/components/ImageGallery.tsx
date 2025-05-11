import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageGalleryProps {
  images: string[];
  alt: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, alt }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const goToPrevious = () => {
    setCurrentImageIndex(prevIndex => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };
  
  const goToNext = () => {
    setCurrentImageIndex(prevIndex => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // If there's only one image, simplify the component
  if (images.length === 1) {
    return (
      <div className="w-full relative overflow-hidden rounded-lg bg-gray-100">
        <img
          src={images[0]}
          alt={alt}
          className="w-full h-auto object-contain"
        />
      </div>
    );
  }

  return (
    <div className="w-full relative">
      <div className="relative overflow-hidden rounded-lg bg-gray-100 aspect-square">
        {/* Main image */}
        <img
          src={images[currentImageIndex]}
          alt={alt}
          className="w-full h-full object-contain transition-opacity duration-300"
        />
        
        {/* Navigation buttons */}
        <button
          onClick={goToPrevious}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center shadow-md hover:bg-white transition-colors"
          aria-label="Предыдущее изображение"
        >
          <ChevronLeft size={24} />
        </button>
        
        <button
          onClick={goToNext}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center shadow-md hover:bg-white transition-colors"
          aria-label="Следующее изображение"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Thumbnail navigation */}
      {images.length > 1 && (
        <div className="flex mt-4 space-x-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-16 h-16 rounded border-2 transition-colors ${
                currentImageIndex === index
                  ? 'border-teal-500'
                  : 'border-transparent hover:border-gray-300'
              }`}
            >
              <img
                src={image}
                alt={`${alt} - миниатюра ${index + 1}`}
                className="w-full h-full object-cover rounded"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;