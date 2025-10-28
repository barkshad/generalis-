import React from 'react';

const Footer: React.FC<{onAdminClick: () => void}> = ({ onAdminClick }) => {
  return (
    <footer className="bg-charcoal text-white">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between">
        <div className="text-sm text-center md:text-left">© 2025 Generali's Bar & Kitchen. All Rights Reserved.</div>
        <div className="flex gap-4 mt-4 md:mt-0 items-center">
          <a href="#" className="text-sm uppercase hover:text-primary transition-colors">Instagram</a>
          <a href="#" className="text-sm uppercase hover:text-primary transition-colors">Facebook</a>
          <a href="#" className="text-sm uppercase hover:text-primary transition-colors">Newsletter</a>
          <button onClick={onAdminClick} className="ml-2 text-sm uppercase text-white/50 hover:text-primary transition-colors">Admin</button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
