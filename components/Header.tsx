import React, { useState, useEffect, useRef } from 'react';

const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#menu', label: 'Menu' },
    { href: '#events', label: 'Events' },
    { href: '#gallery', label: 'Gallery' },
    { href: '#contact', label: 'Contact' },
];

const Header: React.FC = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);

    const handleSmoothScroll = (e: MouseEvent) => {
        const target = e.currentTarget as HTMLAnchorElement;
        const href = target.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const targetElement = document.querySelector(href);
            if (targetElement) {
                const offset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    };
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', handleSmoothScroll as EventListener);
    });

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
        window.removeEventListener('scroll', handleScroll);
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
    const mobileClasses = `text-lg tracking-widest uppercase block py-4 text-center border-b border-charcoal/5 last:border-0 transition-colors ${isActive ? 'text-primary' : 'text-charcoal hover:text-primary'}`;
    const desktopClasses = `text-[10px] tracking-[0.2em] font-medium uppercase transition-all duration-300 relative group ${isActive ? 'text-primary' : 'hover:text-primary'}`;
    
    return (
        <a href={href} className={isMobile ? mobileClasses : desktopClasses} onClick={isMobile ? closeMobileMenu : undefined}>
            {label}
            {!isMobile && (
              <span className={`absolute -bottom-1 left-0 w-full h-[1px] bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left ${isActive ? 'scale-x-100' : ''}`}></span>
            )}
        </a>
    );
  };

  return (
    <header className={`w-full fixed top-0 z-50 transition-all duration-700 ${isScrolled ? 'bg-background/95 backdrop-blur-md py-3 shadow-sm' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
        <a href="#" className="flex items-center gap-4 group">
          <div className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center text-primary font-heading text-xl group-hover:border-primary transition-all">G</div>
          <div className={`hidden sm:block text-[11px] tracking-[0.25em] font-medium uppercase transition-colors duration-500 ${isScrolled ? 'text-charcoal' : 'text-white'}`}>Generali's</div>
        </a>
        
        <nav className="hidden md:flex items-center gap-12">
          {navLinks.map(link => (
            <div key={link.href} className={`transition-colors duration-500 ${!isScrolled ? 'text-white' : 'text-charcoal'}`}>
              <NavLink {...link} />
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-6">
          <a href="https://wa.me/254723836288" target="_blank" className={`hidden lg:block text-[10px] tracking-[0.2em] font-semibold uppercase border-b-2 pb-1 transition-all duration-300 ${isScrolled ? 'border-primary text-charcoal' : 'border-white text-white hover:border-primary'}`}>
            Reserve
          </a>
          <button className={`md:hidden p-2 transition-colors ${isScrolled ? 'text-charcoal' : 'text-white'}`} onClick={toggleMobileMenu}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={`fixed inset-0 top-[72px] bg-background z-40 md:hidden transition-transform duration-500 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="px-8 py-12 flex flex-col items-center">
          {navLinks.map(link => <NavLink key={link.href} {...link} isMobile />)}
          <a href="https://wa.me/254723836288" className="mt-12 text-sm tracking-widest uppercase font-bold text-primary border-b-2 border-primary pb-2">
            Make a Reservation
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;