import React, { useState, useEffect, useRef } from 'react';

const About: React.FC<{ content: string }> = ({ content }) => {
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
      id="about"
      className={`bg-background py-32 scroll-mt-20 transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      <div className="max-w-5xl mx-auto px-8 flex flex-col items-center text-center">
        <p className="text-primary text-[10px] tracking-[0.4em] uppercase mb-8">Established 2023</p>
        <h2 className="font-heading text-4xl md:text-6xl text-charcoal mb-10 max-w-2xl leading-tight">
          A Symphony of Coastal Flavours & Vibrant Energy
        </h2>
        <div className="w-16 h-px bg-primary/40 mb-10"></div>
        <p className="text-charcoal/70 text-lg md:text-xl font-light leading-relaxed max-w-3xl">
          {content}
        </p>
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-12 w-full max-w-4xl border-y border-charcoal/5 py-12">
          <div className="flex flex-col items-center">
            <span className="font-heading text-3xl text-charcoal mb-2">10am</span>
            <span className="text-[9px] tracking-widest uppercase text-charcoal/50">Kitchen Opens</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-heading text-3xl text-charcoal mb-2">3-6pm</span>
            <span className="text-[9px] tracking-widest uppercase text-charcoal/50">Happy Hour</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-heading text-3xl text-charcoal mb-2">11pm</span>
            <span className="text-[9px] tracking-widest uppercase text-charcoal/50">Bar Closes</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-heading text-3xl text-charcoal mb-2">Live</span>
            <span className="text-[9px] tracking-widest uppercase text-charcoal/50">Weekend DJs</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;