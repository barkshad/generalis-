import React, { useState, useEffect, useRef } from 'react';

const Events: React.FC = () => {
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
      id="events" 
      className={`bg-white py-20 scroll-mt-20 transition-all duration-700 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-heading text-3xl md:text-4xl">Events & Happy Hour</h2>
        <p className="mt-3 text-gray-700">Good food. Great music. Even better memories.</p>
        <div className="mt-6 grid md:grid-cols-3 gap-6">
          <div className="p-6 border rounded-lg bg-white shadow-sm">
            <h4 className="font-heading text-lg">Happy Hour</h4>
            <p className="mt-2 text-sm text-gray-600">Weekdays 3pm — 6pm. Select cocktails & beers at special prices.</p>
          </div>
          <div className="p-6 border rounded-lg bg-white shadow-sm">
            <h4 className="font-heading text-lg">Live DJ Nights</h4>
            <p className="mt-2 text-sm text-gray-600">Fridays & Saturdays — DJ from 8pm. No cover charge before 9pm.</p>
          </div>
          <div className="p-6 border rounded-lg bg-white shadow-sm">
            <h4 className="font-heading text-lg">Weekend BBQ Bash</h4>
            <p className="mt-2 text-sm text-gray-600">Saturdays from 6pm — family-friendly, music & grill specials.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Events;
