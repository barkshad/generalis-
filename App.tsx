import React, { useState, useCallback, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Menu from './components/Menu';
import Events from './components/Events';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Lightbox from './components/Lightbox';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import Specials from './components/Specials';

const initialData = {
  hero: {
    title: 'Where Kilifi Comes Alive — <span class="text-primary">Eat. Sip. Vibe.</span>',
    subtitle: "Fresh seafood, wood-fired BBQ and crafted cocktails."
  },
  about: "Discover coastal flavours, vibrant nights & local energy at Generali's Bar & Kitchen, Kilifi. We believe in good food made for good company, served in a space that feels like home. From our kitchen to your table, it's all about the vibe.",
  specials: `🍴 **Say Goodbye to Monday Blues!**
**Fresh, Flavorful & Fast Deliveries within Kilifi and its Environs 🌴🚗**

**🥘 Our Specials:**

1. 🍗 Chips with Pan-Fried Chicken — **KSh 450**
2. 🍟 Chips Masala with Crispy Chicken — **KSh 600**
3. 🥩 ¼ Beef Pan-Fry with Ugali & Kachumbari — **KSh 400**
4. 🍛 ¼ Mbuzi Wet Fry with Ugali & Greens — **KSh 500**
5. 😋 ¼ Beef Wet Fry with Chips — **KSh 450**
6. 🥔 Sautéed Potatoes with 2 Sausages — **KSh 300**
7. 🥘 ¼ Beef Wet Fry with Ugali — **KSh 350**
8. 🐓 Ask for our Special **Kuku Kienyeji** — Price on Request

---

📞 **To place your order:**
Call or WhatsApp **0723 836 288**
Fast delivery, hot meals, happy vibes 🎉`,
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
    { src: 'https://images.unsplash.com/photo-1543352634-1b5e4d3edb9d?auto=format&fit=crop&w=800&q=60', caption: 'Vibrant cocktails lined up on the bar.' },
    { src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=60', caption: 'A delicious and healthy meal served fresh.' },
    { src: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=60', caption: 'Our chefs preparing a masterpiece in the kitchen.' },
    { src: 'https://images.unsplash.com/photo-1541542684-4b3b36f9a9b9?auto=format&fit=crop&w=800&q=60', caption: 'Cozy and inviting atmosphere for a perfect night out.' }
  ],
  rules: [
      'Smart casual recommended. No swimwear or flip-flops after 6pm.',
      'We reserve the right of admission.',
      'Please respect staff and other guests — loud or abusive behaviour will not be tolerated.'
  ],
  contact: {
    address: 'Kwa Mwango, Kilifi Town — opposite the new Fire Station.',
    phone: '+254 723 836 288',
  }
};

// --- IndexedDB Helpers for robust storage ---
const DB_NAME = 'generalis-db';
const STORE_NAME = 'site-data';
const GALLERY_KEY = 'gallery';
const DB_VERSION = 1;

const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

const dbGet = async (key: string): Promise<unknown> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get(key);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

const dbSet = async (key: string, value: unknown): Promise<void> => {
  const db = await openDB();
  return new Promise<void>((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.put(value, key);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};
// --- End IndexedDB Helpers ---


const App: React.FC = () => {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [siteData, setSiteData] = useState(initialData);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [isAdmin, setIsAdmin] = useState(!!window.sessionStorage.getItem('isAdmin'));
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const savedTextDataString = window.localStorage.getItem('generalis-site-data-text');
        const gallery = (await dbGet(GALLERY_KEY) as { src: string, caption: string }[]) || [];

        let data;

        if (savedTextDataString || gallery.length > 0) {
           const savedTextData = savedTextDataString ? JSON.parse(savedTextDataString) : {};
           const textData = {
               ...(({ gallery, ...rest }) => rest)(initialData), // default text data
               ...savedTextData // override with saved data
           };
           data = { ...textData, gallery: gallery.length > 0 ? gallery : initialData.gallery };
        } else {
          // One-time migration from old single localStorage key
          const oldDataString = window.localStorage.getItem('generalis-site-data');
          if (oldDataString) {
            console.log("Migrating data from old format...");
            const oldData = JSON.parse(oldDataString);
            const { gallery: oldGallery, ...oldTextData } = oldData;
            
            window.localStorage.setItem('generalis-site-data-text', JSON.stringify(oldTextData));
            await dbSet(GALLERY_KEY, oldGallery);
            window.localStorage.removeItem('generalis-site-data'); // Clean up old key
            
            data = oldData;
          } else {
            data = initialData;
          }
        }

        // Migration for gallery format from string[] to {src, caption}[]
        if (data.gallery && data.gallery.length > 0 && typeof data.gallery[0] === 'string') {
            data.gallery = data.gallery.map((src: string) => ({ src, caption: '' }));
        }

        setSiteData(data);
      } catch (error) {
        console.error("Could not load or parse saved site data", error);
        setSiteData(initialData);
      } finally {
        setIsDataLoaded(true);
      }
    };
    loadData();
  }, []);

  const saveData = useCallback(async (dataToSave: typeof initialData) => {
    try {
      const { gallery, ...textData } = dataToSave;
      window.localStorage.setItem('generalis-site-data-text', JSON.stringify(textData));
      await dbSet(GALLERY_KEY, gallery);
    } catch (error) {
      if (error instanceof DOMException && error.name === 'QuotaExceededError') {
           console.error("Could not save site data: Quota exceeded. The gallery is too large to be stored.", error);
           alert("Error: Could not save changes. The gallery has too many high-resolution images. Please remove some images and try again.");
      } else {
           console.error("Could not save site data", error);
      }
    }
  }, []);
  
  const openLightbox = useCallback((src: string) => setLightboxImage(src), []);
  const closeLightbox = useCallback(() => setLightboxImage(null), []);

  const openAdminDashboard = () => {
    setShowAdminDashboard(true);
  };

  const handleAdminLogin = () => {
      setIsAdmin(true);
      window.sessionStorage.setItem('isAdmin', 'true');
      setShowAdminLogin(false);
      openAdminDashboard();
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    window.sessionStorage.removeItem('isAdmin');
    setShowAdminDashboard(false);
  }

  const handleAdminSave = (newData: typeof initialData) => {
    setSiteData(newData);
    saveData(newData);
    setShowAdminDashboard(false);
  };

  const handleAdminCancel = () => {
    setShowAdminDashboard(false);
  };

  return (
    <>
      <Header />
      <main>
        <Hero content={siteData.hero} />
        <About content={siteData.about} />
        <Specials content={siteData.specials} />
        <Menu content={siteData.menu} />
        <Events />
        <Gallery images={siteData.gallery} onImageClick={openLightbox} />
        <Contact content={siteData.contact} rules={siteData.rules} />
      </main>
      <Footer onAdminClick={() => isAdmin ? openAdminDashboard() : setShowAdminLogin(true)} />
      {lightboxImage && <Lightbox src={lightboxImage} onClose={closeLightbox} />}
      {showAdminLogin && <AdminLogin onLogin={handleAdminLogin} onClose={() => setShowAdminLogin(false)} />}
      {isAdmin && showAdminDashboard && <AdminDashboard siteData={siteData} onSave={handleAdminSave} onCancel={handleAdminCancel} onLogout={handleAdminLogout} />}
    </>
  );
};

export default App;
