import React, { useState, useEffect, useRef } from 'react';

const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#specials', label: 'Specials' },
    { href: '#menu', label: 'Menu' },
    { href: '#events', label: 'Events' },
    { href: '#gallery', label: 'Gallery' },
    { href: '#testimonials', label: 'Reviews' },
    { href: '#team', label: 'Team' },
    { href: '#contact', label: 'Contact' },
];

const Header: React.FC = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Smooth scrolling for anchor links
    const handleSmoothScroll = (e: MouseEvent) => {
        const target = e.currentTarget as HTMLAnchorElement;
        const href = target.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const targetElement = document.querySelector(href);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    };
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', handleSmoothScroll as EventListener);
    });

    // Intersection observer for active nav link
    observer.current = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setActiveSection(entry.target.id);
            }
        });
    }, { rootMargin: '-30% 0px -70% 0px' }); 

    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => observer.current?.observe(section));

    return () => {
        sections.forEach(section => observer.current?.unobserve(section));
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.removeEventListener('click', handleSmoothScroll as EventListener);
        });
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };
  
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  }

  const NavLink: React.FC<{href: string; label: string; isMobile?: boolean}> = ({ href, label, isMobile }) => {
    const isActive = activeSection === href.substring(1);
    const mobileClasses = "uppercase block py-2";
    const desktopClasses = `text-sm font-medium uppercase transition-colors ${isActive ? 'text-primary' : 'hover:text-primary'}`;
    return (
        <a href={href} className={isMobile ? mobileClasses : desktopClasses} onClick={isMobile ? closeMobileMenu : undefined}>
            {label}
        </a>
    );
  };


  return (
    <header className="w-full sticky top-0 bg-white/80 backdrop-blur z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-heading">G</div>
          <div className="text-sm font-heading">Generali's Bar & Kitchen</div>
        </a>
        <nav className="hidden md:flex items-center gap-4">
          {navLinks.map(link => <NavLink key={link.href} {...link} />)}
          <a href="https://wa.me/254723836288?text=Hello%20Generali's%20Bar%20-%20I'd%20like%20to%20reserve%20a%20table" target="_blank" rel="noopener noreferrer" className="ml-4 inline-block px-4 py-2 text-sm font-semibold uppercase rounded-md border border-primary bg-primary text-white hover:bg-primary/90 transition-colors">Reserve</a>
        </nav>
        <button id="mobileToggle" className="md:hidden p-2" onClick={toggleMobileMenu}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      {isMobileMenuOpen && (
        <div id="mobileNav" className="md:hidden border-t">
          <div className="px-6 py-4 flex flex-col gap-1">
            {navLinks.map(link => <NavLink key={link.href} {...link} isMobile />)}
            <a href="https://wa.me/254723836288?text=Hello%20Generali's%20Bar%20-%20I'd%20like%20to%20reserve%20a%20table" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block px-4 py-2 text-center font-semibold uppercase rounded-md border border-primary bg-primary text-white">Reserve</a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
