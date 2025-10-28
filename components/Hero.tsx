import React from 'react';

const Hero: React.FC<{ content: { title: string; subtitle: string } }> = ({ content }) => {
  const heroStyle = {
    backgroundImage: `url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <section style={heroStyle}>
      <div className="bg-gradient-to-t from-black/60 to-transparent">
        <div className="max-w-6xl mx-auto px-6 py-28 md:py-40 text-white">
          <h1 className="font-heading text-4xl md:text-6xl font-extrabold leading-tight" dangerouslySetInnerHTML={{ __html: content.title }}></h1>
          <p className="mt-4 max-w-2xl text-lg opacity-90">{content.subtitle}</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <a href="https://wa.me/254723836288?text=Hello%20Generali's%20Bar%20-%20I'd%20like%20to%20reserve%20a%20table" target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-3 font-semibold uppercase rounded-md border border-primary bg-primary text-charcoal hover:bg-primary/90 transition-colors">Reserve a table</a>
            <a href="#menu" className="inline-block px-6 py-3 font-semibold uppercase rounded-md border border-white bg-white/10 hover:bg-white/20 transition-colors">View Menu</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
