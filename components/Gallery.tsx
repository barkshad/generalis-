
import React from 'react';

interface GalleryProps {
  images: { src: string; caption: string }[];
  onImageClick: (src: string) => void;
}

const Gallery: React.FC<GalleryProps> = ({ images, onImageClick }) => {
  return (
    <section id="gallery" className="bg-gray-50 max-w-6xl mx-auto px-6 py-20 scroll-mt-20">
      <h2 className="font-heading text-3xl md:text-4xl">Gallery</h2>
      <p className="mt-3 text-gray-700">A glimpse of our space, food and vibe.</p>
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <figure key={index} className="group shadow-md rounded-lg overflow-hidden flex flex-col bg-white">
            <div 
              className="overflow-hidden cursor-pointer relative" 
              onClick={() => onImageClick(image.src.replace('&w=800', '&w=2000'))}
            >
              <img
                src={image.src}
                alt={image.caption || `Gallery item ${index + 1}`}
                className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300 ease-in-out"
              />
               <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 1v4m0 0h-4m4 0l-5-5" />
                  </svg>
              </div>
            </div>
            {image.caption && (
              <figcaption className="p-3 text-sm text-gray-700">
                {image.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
