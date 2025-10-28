
import React, { useEffect } from 'react';

interface LightboxProps {
  src: string;
  onClose: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({ src, onClose }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black/85 flex items-center justify-center z-50 animate-fade-in"
      onClick={onClose}
    >
      <div className="relative w-full h-full flex items-center justify-center p-4" onClick={(e) => e.stopPropagation()}>
         <img
            src={src}
            alt="Enlarged view"
            className="max-w-[92%] max-h-[92%] object-contain rounded-lg shadow-2xl"
        />
        <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white text-4xl hover:text-primary transition-colors"
            aria-label="Close lightbox"
        >
            &times;
        </button>
      </div>
    </div>
  );
};

export default Lightbox;
