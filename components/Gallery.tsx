
import React from 'react';

interface GalleryProps {
  images: string[];
  onImageClick: (src: string) => void;
}

const Gallery: React.FC<GalleryProps> = ({ images, onImageClick }) => {
  return (
    <section id="gallery" className="max-w-6xl mx-auto px-6 py-16 scroll-mt-20">
      <h2 className="font-heading text-3xl md:text-4xl">Gallery</h2>
      <p className="mt-3 text-gray-700">A glimpse of our space, food and vibe.</p>
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((src, index) => (
          <div key={index} className="overflow-hidden rounded-lg shadow-md">
            <img
              src={src}
              alt={`Gallery item ${index + 1}`}
              className="w-full h-40 object-cover rounded-lg cursor-pointer transform hover:scale-105 transition-transform duration-300 ease-in-out"
              onClick={() => onImageClick(src.replace('&w=800', '&w=2000'))}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
