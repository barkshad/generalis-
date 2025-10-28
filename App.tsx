import React, { useState, useCallback, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Menu from './components/Menu';
import Events from './components/Events';
import Gallery from './components/Gallery';
import Rules from './components/Rules';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Lightbox from './components/Lightbox';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';

const initialData = {
  hero: {
    title: 'Where Kilifi Comes Alive — <span class="text-primary">Eat. Sip. Vibe.</span>',
    subtitle: "Discover coastal flavours, vibrant nights & local energy at Generali's Bar & Kitchen, Kilifi. Fresh seafood, wood-fired BBQ and crafted cocktails — made for good company."
  },
  menu: {
    overview: [
      { title: 'BBQ', items: [{ name: 'BBQ Platter', price: 'KSh 1,950' }, { name: 'Grilled Lamb Chops', price: 'KSh 1,250' }, { name: 'Charred Corn', price: 'KSh 250' }] },
      { title: 'Pizza', items: [{ name: 'Margherita', price: 'KSh 850' }, { name: 'Pepperoni', price: 'KSh 1,050' }, { name: 'Seafood Delight', price: 'KSh 1,250' }] },
      { title: 'Seafood', items: [{ name: 'Seafood Tapas', price: 'KSh 1,450' }, { name: 'Grilled Prawns', price: 'KSh 1,350' }] },
      { title: 'Cocktails', items: [{ name: 'Generali Mule', price: 'KSh 650' }, { name: 'Mango Rum Punch', price: 'KSh 700' }] },
    ],
    fullMenu: [
        { title: 'Starters', items: [{ name: 'Ceviche', price: 'KSh 650' }, {name: 'Calamari Rings', price: 'KSh 550'}] },
        { title: 'Mains', items: [{ name: 'Charcoal-Grilled Fish', price: 'KSh 1,350' }, {name: 'BBQ Platter', price: 'KSh 1,950'}] },
        { title: 'Desserts', items: [{ name: 'Coconut Tart', price: 'KSh 450' }, {name: 'Mango Sorbet', price: 'KSh 400'}] },
    ]
  },
  gallery: [
    'https://images.unsplash.com/photo-1543352634-1b5e4d3edb9d?auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1541542684-4b3b36f9a9b9?auto=format&fit=crop&w=800&q=60'
  ],
  contact: {
    address: 'Kwa Mwango, Kilifi Town — opposite the new Fire Station.',
    phone: '+254 723 836 288',
  }
};

const App: React.FC = () => {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [siteData, setSiteData] = useState(() => {
      try {
        const savedData = window.localStorage.getItem('generalis-site-data');
        return savedData ? JSON.parse(savedData) : initialData;
      } catch (error) {
        console.error("Could not parse saved site data", error);
        return initialData;
      }
  });

  const [isAdmin, setIsAdmin] = useState(!!window.sessionStorage.getItem('isAdmin'));
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);

  useEffect(() => {
    try {
        window.localStorage.setItem('generalis-site-data', JSON.stringify(siteData));
    } catch (error) {
        console.error("Could not save site data", error);
    }
  }, [siteData]);
  
  const openLightbox = useCallback((src: string) => setLightboxImage(src), []);
  const closeLightbox = useCallback(() => setLightboxImage(null), []);

  const handleAdminLogin = () => {
      setIsAdmin(true);
      window.sessionStorage.setItem('isAdmin', 'true');
      setShowAdminLogin(false);
      setShowAdminDashboard(true);
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    window.sessionStorage.removeItem('isAdmin');
    setShowAdminDashboard(false);
  }

  return (
    <>
      <Header />
      <main>
        <Hero content={siteData.hero} />
        <Menu content={siteData.menu} />
        <Events />
        <Gallery images={siteData.gallery} onImageClick={openLightbox} />
        <Rules />
        <Contact content={siteData.contact} />
      </main>
      <Footer onAdminClick={() => isAdmin ? setShowAdminDashboard(true) : setShowAdminLogin(true)} />
      {lightboxImage && <Lightbox src={lightboxImage} onClose={closeLightbox} />}
      {showAdminLogin && <AdminLogin onLogin={handleAdminLogin} onClose={() => setShowAdminLogin(false)} />}
      {isAdmin && showAdminDashboard && <AdminDashboard siteData={siteData} onUpdate={setSiteData} onClose={() => setShowAdminDashboard(false)} onLogout={handleAdminLogout} />}
    </>
  );
};

export default App;
