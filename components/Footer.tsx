import React, { useState } from 'react';

const Footer: React.FC<{onAdminClick: () => void}> = ({ onAdminClick }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
      e.preventDefault();
      if (email) {
          setSubscribed(true);
          setEmail('');
          setTimeout(() => setSubscribed(false), 3000);
      }
  }

  return (
    <footer className="bg-charcoal text-white pt-32 pb-12">
      <div className="max-w-7xl mx-auto px-8 flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-full border border-primary/40 flex items-center justify-center text-primary font-heading text-2xl mb-12">G</div>
        
        <div className="max-w-2xl mb-24">
            <h4 className="text-[10px] tracking-[0.5em] uppercase text-white/40 mb-8 font-bold">Newsletter</h4>
            <h2 className="font-heading text-3xl md:text-5xl mb-10 italic">Stay connected with the Coast</h2>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4">
                <input 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-mail Address"
                    className="flex-1 bg-transparent border-b border-white/20 px-4 py-4 focus:border-primary outline-none transition-all text-sm font-light tracking-widest text-center sm:text-left"
                    required
                />
                <button type="submit" className="text-[10px] tracking-[0.3em] uppercase font-bold text-primary border border-primary/30 px-12 py-4 hover:bg-primary hover:text-charcoal transition-all">Subscribe</button>
            </form>
            {subscribed && <p className="text-primary text-xs mt-4 animate-fade-in italic">Your invitation to the coast is confirmed.</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 w-full border-t border-white/5 pt-24 mb-24 items-start">
            <div>
                <h5 className="text-[10px] tracking-[0.3em] uppercase font-bold mb-8 text-white/50">Location</h5>
                <p className="text-white/70 text-xs leading-relaxed max-w-[200px] mx-auto uppercase tracking-tighter">
                    Kwa Mwango, Kilifi Town — opposite the new Fire Station.
                </p>
            </div>
            <div>
                <h5 className="text-[10px] tracking-[0.3em] uppercase font-bold mb-8 text-white/50">Follow</h5>
                <div className="flex flex-col gap-4">
                    <a href="#" className="text-white text-xs uppercase tracking-widest hover:text-primary transition-colors">Instagram</a>
                    <a href="#" className="text-white text-xs uppercase tracking-widest hover:text-primary transition-colors">Facebook</a>
                </div>
            </div>
            <div>
                <h5 className="text-[10px] tracking-[0.3em] uppercase font-bold mb-8 text-white/50">Inquiries</h5>
                <a href="mailto:hello@generalis.com" className="text-white text-xs uppercase tracking-widest hover:text-primary transition-colors">hello@generalis.com</a>
            </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between w-full text-[9px] tracking-[0.3em] uppercase text-white/20">
            <span>© 2025 Generali's Bar & Kitchen</span>
            <div className="flex gap-8 mt-6 md:mt-0">
                <button onClick={onAdminClick} className="hover:text-primary transition-colors">Admin Access</button>
                <span>Built for Kilifi</span>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;