import React from 'react';

const Hero: React.FC<{ content: { title: string; subtitle: string } }> = ({ content }) => {

  return (
    <section className="relative h-[90vh] min-h-[500px] max-h-[700px] w-full overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center animate-kenburns"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=1920&q=80')` }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/40 to-transparent"></div>
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-6xl mx-auto px-6 text-white text-shadow-lg">
          <h1 className="font-heading text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-md" dangerouslySetInnerHTML={{ __html: content.title }}></h1>
          <p className="mt-4 max-w-2xl text-lg opacity-90 drop-shadow-sm">{content.subtitle}</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <a href="https://wa.me/254723836288?text=Hello%20Generali's%20Bar%20-%20I'd%20like%20to%20reserve%20a%20table" target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-3 font-semibold uppercase rounded-md border border-primary bg-primary text-white hover:bg-primary/90 transition-all transform hover:scale-105">Reserve a table</a>
            <a href="https://wa.me/254723836288?text=Hello%20Generali's%20Bar%20-%20I'd%20like%20to%20order%20via%20WhatsApp" target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-3 font-semibold uppercase rounded-md border border-white bg-white/10 hover:bg-white/20 transition-all transform hover:scale-105">Place an Order</a>
            <a href="#menu" className="inline-block px-6 py-3 font-semibold uppercase rounded-md border border-white bg-white/10 hover:bg-white/20 transition-all transform hover:scale-105">View Menu</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;