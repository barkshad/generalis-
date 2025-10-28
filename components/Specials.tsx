import React, { useState, useEffect, useRef } from 'react';

const Specials: React.FC<{ content: string }> = ({ content }) => {
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

  if (!content || content.trim() === '') {
    return null;
  }

  return (
    <section 
      ref={sectionRef}
      id="specials" 
      className={`bg-white py-20 scroll-mt-20 transition-all duration-700 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="font-heading text-3xl md:text-4xl text-center">Today's Specials</h2>
        <p className="mt-2 text-gray-700 text-center">Freshly prepared just for you. Available for dine-in or delivery!</p>
        <div className="mt-8 p-8 border-2 border-dashed border-primary/50 rounded-lg bg-white shadow-xl text-charcoal leading-relaxed">
           {content.split('\n').map((line, index) => (
             <p 
                key={index} 
                className="my-1"
                dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-charcoal/90">$1</strong>') || '&nbsp;'}}
             />
           ))}
        </div>
      </div>
    </section>
  );
};

export default Specials;
