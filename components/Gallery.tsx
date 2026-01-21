import React, { useState, useEffect, useRef } from 'react';

interface GalleryProps {
  images: { src: string; caption: string }[];
  onImageClick: (src: string) => void;
}

const Gallery: React.FC<GalleryProps> = ({ images, onImageClick }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="gallery" 
      className={`bg-background max-w-6xl mx-auto px-6 py-20 scroll-mt-20 transition-all duration-700 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <h2 className="font-heading text-3xl md:text-4xl text-charcoal">Gallery</h2>
      <p className="mt-3 text-charcoal/80">A glimpse of our space, food and vibe.</p>
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <figure key={index} className="group shadow-md rounded-lg overflow-hidden flex flex-col bg-white transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div 
              className="overflow-hidden cursor-pointer relative" 
              onClick={() => onImageClick(image.src.replace('&w=800', '&w=2000'))}
            >
              <img
                src={image.src}
                alt={image.caption || `Gallery item ${index + 1}`}
                className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300 ease-in-out"
              />
               <div className="absolute inset-0 bg-primary/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 1v4m0 0h-4m4 0l-5-5" />
                  </svg>
              </div>
            </div>
            {image.caption && (
              <figcaption className="p-3 text-sm text-charcoal/80">
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