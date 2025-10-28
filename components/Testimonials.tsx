import React, { useState, useEffect, useRef } from 'react';

interface Testimonial {
  quote: string;
  author: string;
  location: string;
}

const QuoteIcon: React.FC = () => (
    <svg className="w-8 h-8 text-primary/30" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
        <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z"/>
    </svg>
);


const Testimonials: React.FC<{ testimonials: Testimonial[] }> = ({ testimonials }) => {
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
  
  if (!testimonials || testimonials.length === 0) {
      return null;
  }

  return (
    <section 
      ref={sectionRef}
      id="testimonials" 
      className={`bg-gray-50 py-20 scroll-mt-20 transition-all duration-700 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-heading text-3xl md:text-4xl text-center">What Our Guests Say</h2>
        <p className="mt-3 text-gray-700 text-center">The moments that make us who we are.</p>
        <div className="mt-10 grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <figure key={index} className="p-6 border rounded-lg bg-white shadow-sm flex flex-col">
              <QuoteIcon />
              <blockquote className="mt-4 text-gray-700 flex-grow">
                <p>"{testimonial.quote}"</p>
              </blockquote>
              <figcaption className="mt-4 pt-4 border-t border-gray-100">
                <div className="font-semibold text-charcoal">{testimonial.author}</div>
                <div className="text-sm text-gray-500">{testimonial.location}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
