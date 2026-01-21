import React, { useState, useEffect, useRef } from 'react';

interface MenuItem {
  name: string;
  price: string;
  image?: string;
}

interface MenuCategory {
  title: string;
  items: MenuItem[];
}

const MenuCategoryCard: React.FC<{ category: MenuCategory }> = ({ category }) => (
  <div className="py-8 border-b border-charcoal/10 last:border-0 group">
    <h3 className="font-heading text-2xl text-charcoal mb-6 group-hover:text-primary transition-colors duration-500 italic">
      {category.title}
    </h3>
    <ul className="space-y-4">
      {category.items.map((item) => (
        <li key={item.name} className="flex justify-between items-baseline gap-4">
          <div className="flex-1">
            <h4 className="text-[11px] tracking-[0.1em] font-semibold uppercase text-charcoal/80 mb-0.5">
              {item.name}
            </h4>
          </div>
          <div className="flex-grow border-b border-dotted border-charcoal/20"></div>
          <span className="font-heading text-lg text-charcoal">{item.price}</span>
        </li>
      ))}
    </ul>
  </div>
);

const Menu: React.FC<{ content: { overview: MenuCategory[]; fullMenu: MenuCategory[] } }> = ({ content }) => {
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
      id="menu" 
      className={`bg-background py-32 scroll-mt-20 transition-all duration-1000 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-col items-center text-center mb-24">
          <p className="text-primary text-[10px] tracking-[0.4em] uppercase mb-6">Our Gastronomy</p>
          <h2 className="font-heading text-4xl md:text-6xl text-charcoal mb-8">The Collection</h2>
          <p className="max-w-xl text-charcoal/60 text-sm tracking-wide leading-relaxed">
            Crafted with local ingredients and international expertise. From the wood-fire BBQ to the freshest catches of the Indian Ocean.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-x-24 items-start">
          <div className="space-y-4">
            {content.overview.map((category) => (
              <MenuCategoryCard key={category.title} category={category} />
            ))}
          </div>
          <div className="mt-12 lg:mt-0 relative group">
            <div className="overflow-hidden aspect-[4/5] rounded-sm">
                <img 
                    src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80" 
                    alt="Signature Platter" 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[3s]" 
                />
            </div>
            <div className="absolute -bottom-8 -left-8 bg-charcoal text-white p-12 max-w-xs shadow-2xl">
                <p className="text-primary text-[9px] tracking-[0.3em] uppercase mb-4">Chef's Signature</p>
                <h4 className="font-heading text-2xl mb-4 italic">Seafood Tapas Platter</h4>
                <p className="text-white/60 text-xs leading-relaxed mb-6">A curated selection of the day's freshest catch, grilled over charcoal with traditional coastal spices.</p>
                <a href="https://wa.me/254723836288" className="text-primary text-[10px] tracking-[0.2em] font-bold uppercase border-b border-primary/50 pb-1">Order Now</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Menu;