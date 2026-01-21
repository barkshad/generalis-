import React from 'react';

const Hero: React.FC<{ content: { title: string; subtitle: string } }> = ({ content }) => {

  return (
    <section className="relative h-screen w-full overflow-hidden bg-charcoal">
      <div 
        className="absolute inset-0 bg-cover bg-center animate-kenburns opacity-60"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1544145945-f904253d0c7b?auto=format&fit=crop&w=1920&q=90')` }}
      ></div>
      <div className="absolute inset-0 bg-charcoal/30"></div>
      
      <div className="relative z-10 h-full flex items-center justify-center text-center">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-white/70 text-[10px] tracking-[0.5em] uppercase mb-6 animate-fade-in delay-100">Kilifi, Kenya</p>
          <h1 
            className="font-heading text-5xl md:text-8xl text-white mb-8 italic animate-fade-in leading-[1.1]" 
            dangerouslySetInnerHTML={{ __html: content.title.replace('text-primary', 'text-primary italic') }}
          ></h1>
          <p className="text-white/80 text-lg md:text-xl font-light tracking-wide max-w-xl mx-auto mb-12 animate-fade-in delay-300">
            {content.subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 animate-fade-in delay-500">
            <a href="#menu" className="text-white text-[11px] tracking-[0.3em] uppercase font-semibold border-b border-primary/50 pb-2 hover:border-primary transition-all">
              Discover the Menu
            </a>
            <span className="hidden sm:block w-px h-12 bg-white/20"></span>
            <a href="https://wa.me/254723836288" target="_blank" className="text-white text-[11px] tracking-[0.3em] uppercase font-semibold border-b border-primary/50 pb-2 hover:border-primary transition-all">
              Reserve a Table
            </a>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-40">
        <span className="text-[10px] tracking-widest uppercase text-white">Scroll</span>
        <div className="w-px h-12 bg-white"></div>
      </div>
    </section>
  );
};

export default Hero;