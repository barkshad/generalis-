
import React from 'react';

interface GalleryProps {
  images: { src: string; caption: string }[];
  onImageClick: (src: string) => void;
}

const Gallery: React.FC<GalleryProps> = ({ images, onImageClick }) => {
  return (
    <section id="gallery" className="max-w-6xl mx-auto px-6 py-16 scroll-mt-20">
      <h2 className="font-heading text-3xl md:text-4xl">Gallery</h2>
      <p className="mt-3 text-gray-700">A glimpse of our space, food and vibe.</p>
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <figure key={index} className="group overflow-hidden rounded-lg shadow-md relative">
            <img
              src={image.src}
              alt={image.caption || `Gallery item ${index + 1}`}
              className="w-full h-48 object-cover rounded-lg cursor-pointer transform group-hover:scale-105 transition-transform duration-300 ease-in-out"
              onClick={() => onImageClick(image.src.replace('&w=800', '&w=2000'))}
            />
            {image.caption && (
              <figcaption className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
