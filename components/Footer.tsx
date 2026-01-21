import React, { useState } from 'react';

const Footer: React.FC<{onAdminClick: () => void}> = ({ onAdminClick }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
      e.preventDefault();
      if (email) {
          console.log(`Subscribed with email: ${email}`);
          setSubscribed(true);
          setEmail('');
          setTimeout(() => setSubscribed(false), 3000);
      }
  }

  return (
    <footer className="bg-charcoal text-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8">
            <div>
                <h4 className="font-heading text-lg">About Us</h4>
                <p className="mt-2 text-sm text-white/70">Generali's is where Kilifi comes alive. We serve fresh coastal flavours, wood-fired BBQ, and crafted cocktails in a vibrant, welcoming space.</p>
            </div>
            <div>
                <h4 className="font-heading text-lg">Newsletter</h4>
                <p className="mt-2 text-sm text-white/70">Stay updated on our latest events, specials, and offers.</p>
                <form onSubmit={handleSubscribe} className="mt-4 flex">
                    <input 
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Your email address"
                        className="w-full px-3 py-2 text-sm text-charcoal bg-white rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                        aria-label="Email for newsletter"
                    />
                    <button type="submit" className="px-4 py-2 text-sm font-semibold bg-primary text-white rounded-r-md hover:bg-primary/90 transition-colors">Subscribe</button>
                </form>
                {subscribed && <p className="text-sm text-primary mt-2">Thank you for subscribing!</p>}
            </div>
            <div>
                 <h4 className="font-heading text-lg">Connect</h4>
                 <div className="flex gap-4 mt-4 items-center">
                  <a href="#" className="text-sm uppercase hover:text-primary transition-colors">Instagram</a>
                  <a href="#" className="text-sm uppercase hover:text-primary transition-colors">Facebook</a>
                </div>
            </div>
        </div>
      </div>
      <div className="bg-black/20">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between">
            <div className="text-sm text-center md:text-left text-white/60">© 2025 Generali's Bar & Kitchen. All Rights Reserved.</div>
            <button onClick={onAdminClick} className="mt-2 md:mt-0 text-sm uppercase text-white/40 hover:text-primary transition-colors">Admin Panel</button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;