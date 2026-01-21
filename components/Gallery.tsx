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
      className={`bg-charcoal py-32 transition-all duration-1000 transform ${
        isVisible ? 'opacity-100' : 'opacity-0 translate-y-12'
      }`}
    >
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div className="max-w-lg">
                <p className="text-primary text-[10px] tracking-[0.4em] uppercase mb-6">Visuals</p>
                <h2 className="font-heading text-4xl md:text-6xl text-white">Atmosphere & Soul</h2>
            </div>
            <p className="text-white/50 text-sm italic font-light">Explore the Generali experience.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {images.map((image, index) => {
            const spans = index % 3 === 0 ? 'md:col-span-8' : 'md:col-span-4';
            return (
                <div 
                    key={index} 
                    className={`${spans} relative group overflow-hidden cursor-pointer aspect-video md:aspect-auto md:h-[400px]`}
                    onClick={() => onImageClick(image.src.replace('&w=800', '&w=2000'))}
                >
                    <img
                        src={image.src}
                        alt={image.caption || `Gallery item ${index + 1}`}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-[4s] ease-out"
                    />
                    <div className="absolute inset-0 bg-charcoal/60 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-col justify-end p-8">
                        <div className="overflow-hidden">
                            <p className="text-white text-lg font-heading italic transform translate-y-full group-hover:translate-y-0 transition-transform duration-700 delay-100">
                                {image.caption}
                            </p>
                        </div>
                        <span className="w-12 h-px bg-primary mt-4 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 delay-300"></span>
                    </div>
                </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Gallery;