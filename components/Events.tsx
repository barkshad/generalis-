import React, { useState, useEffect, useRef } from 'react';

interface Event {
    image: string;
    title: string;
    date: string;
    description: string;
}

const Events: React.FC<{ events: Event[] }> = ({ events }) => {
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
  
  if (!events || events.length === 0) {
      return null;
  }

  return (
    <section 
      ref={sectionRef}
      id="events" 
      className={`bg-charcoal text-white py-20 scroll-mt-20 transition-all duration-700 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-heading text-3xl md:text-4xl">Events & Happy Hour</h2>
        <p className="mt-3 text-white/80">Good food. Great music. Even better memories.</p>
        <div className="mt-10 grid md:grid-cols-3 gap-8">
          {events.map((event, index) => (
              <div key={index} className="flex flex-col bg-white/5 rounded-lg overflow-hidden shadow-lg transform hover:-translate-y-2 transition-transform duration-300">
                  <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
                  <div className="p-6 flex flex-col flex-grow">
                      <p className="text-primary font-semibold text-sm uppercase">{event.date}</p>
                      <h3 className="font-heading text-xl mt-2">{event.title}</h3>
                      <p className="mt-2 text-white/70 text-sm flex-grow">{event.description}</p>
                  </div>
              </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Events;
