import React, { useState, useEffect, useRef } from 'react';

const Contact: React.FC<{ content: { address: string; phone: string }, rules: string[] }> = ({ content, rules }) => {
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

  const telLink = `tel:${content.phone.replace(/\s/g, '')}`;
  const whatsappLink = `https://wa.me/${content.phone.replace(/\s/g, '').replace('+', '')}?text=Hi%20Generali's%20Bar%20-%20I'd%20like%20to%20book%20a%20table`;
  
  return (
    <section 
      ref={sectionRef}
      id="contact" 
      className={`bg-background py-32 scroll-mt-20 transition-all duration-1000 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid lg:grid-cols-2 gap-24">
          <div className="space-y-12">
            <div>
              <p className="text-primary text-[10px] tracking-[0.4em] uppercase mb-6">Find Us</p>
              <h2 className="font-heading text-4xl md:text-6xl text-charcoal mb-8">Location & Details</h2>
              <p className="text-charcoal/70 text-lg font-light leading-relaxed max-w-md">
                {content.address}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 pt-12 border-t border-charcoal/10">
              <div>
                <h4 className="text-[10px] tracking-[0.2em] uppercase font-bold text-charcoal/50 mb-4">Reservations</h4>
                <a href={telLink} className="font-heading text-2xl text-charcoal hover:text-primary transition-colors">{content.phone}</a>
                <p className="text-xs text-charcoal/40 mt-2 italic">Bookings via WhatsApp encouraged.</p>
              </div>
              <div>
                <h4 className="text-[10px] tracking-[0.2em] uppercase font-bold text-charcoal/50 mb-4">Hours</h4>
                <p className="text-charcoal text-sm leading-relaxed">
                  Daily: 10:00 — 23:00<br/>
                  Kitchen: 11:30 — 22:00
                </p>
              </div>
            </div>

            <div className="bg-charcoal/5 p-8 rounded-sm">
                <h4 className="text-[10px] tracking-[0.2em] uppercase font-bold text-charcoal mb-6">House Rules</h4>
                <ul className="space-y-4">
                  {rules.map((rule, index) => (
                    <li key={index} className="flex gap-4 text-xs text-charcoal/70 leading-relaxed italic">
                        <span className="text-primary font-bold">0{index + 1}.</span>
                        {rule}
                    </li>
                  ))}
                </ul>
            </div>
          </div>

          <div className="relative">
            <div className="w-full h-full min-h-[500px] grayscale contrast-125 opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700 rounded-sm overflow-hidden shadow-2xl">
              <iframe className="w-full h-full" frameBorder="0" referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3981.980045554153!2d39.84711381530263!3d-3.633887044023249!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x183f3ee3e8983949%3A0x6b4a2b25ae64b18c!2sKilifi%2C%20Kenya!5e0!3m2!1sen!2sus!4v1628884245132!5m2!1sen!2sus"
                allowFullScreen></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;