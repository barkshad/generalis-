
import React, { useState } from 'react';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };
  
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  }

  return (
    <header className="w-full sticky top-0 bg-white/80 backdrop-blur z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-heading">G</div>
          <div className="text-sm font-heading">Generali's Bar & Kitchen</div>
        </a>
        <nav className="hidden md:flex items-center gap-4">
          <a href="#menu" className="text-sm font-medium uppercase hover:text-primary transition-colors">Menu</a>
          <a href="#events" className="text-sm font-medium uppercase hover:text-primary transition-colors">Events</a>
          <a href="#gallery" className="text-sm font-medium uppercase hover:text-primary transition-colors">Gallery</a>
          <a href="#contact" className="text-sm font-medium uppercase hover:text-primary transition-colors">Contact</a>
          <a href="https://wa.me/254723836288?text=Hello%20Generali's%20Bar%20-%20I'd%20like%20to%20reserve%20a%20table" target="_blank" rel="noopener noreferrer" className="ml-4 inline-block px-4 py-2 text-sm font-semibold uppercase rounded-md border border-primary bg-primary text-white hover:bg-primary/90 transition-colors">Reserve a table</a>
        </nav>
        <button id="mobileToggle" className="md:hidden p-2" onClick={toggleMobileMenu}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      {isMobileMenuOpen && (
        <div id="mobileNav" className="md:hidden border-t">
          <div className="px-6 py-4 flex flex-col gap-3">
            <a href="#menu" className="uppercase" onClick={closeMobileMenu}>View Menu</a>
            <a href="#events" className="uppercase" onClick={closeMobileMenu}>Events</a>
            <a href="#gallery" className="uppercase" onClick={closeMobileMenu}>Gallery</a>
            <a href="#contact" className="uppercase" onClick={closeMobileMenu}>Contact</a>
            <a href="https://wa.me/254723836288?text=Hello%20Generali's%20Bar%20-%20I'd%20like%20to%20reserve%20a%20table" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block px-4 py-2 text-center font-semibold uppercase rounded-md border border-primary bg-primary text-white">Reserve</a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
