import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

// A simple icon component for the UI
const IconTrash: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
);

const IconArrowUp: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" /></svg>
);

const IconArrowDown: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
);

const IconCopy: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
);

const IconSparkles: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
);


const AdminDashboard = ({ siteData, onSave, onCancel, onLogout }) => {
  const [activeTab, setActiveTab] = useState('general');
  const [localData, setLocalData] = useState(siteData);
  const [captionLoading, setCaptionLoading] = useState<number | null>(null);

  useEffect(() => {
    // Fallback migration for gallery format from string[] to {src, caption}[]
    if (localData.gallery && localData.gallery.length > 0 && typeof localData.gallery[0] === 'string') {
        setLocalData(prev => ({
            ...prev,
            gallery: prev.gallery.map((src: string) => ({ src, caption: '' }))
        }));
    }
  }, [localData.gallery]);

  const handleInputChange = (e, section, field = null) => {
    const { value } = e.target;
    if (field) {
        setLocalData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
    } else {
        setLocalData(prev => ({ ...prev, [section]: value }));
    }
  };
  
  const handleSpecialsChange = (e) => {
    const { value } = e.target;
    setLocalData(prev => ({
        ...prev,
        specials: value
    }));
  }

  const handleMenuChange = (e, type, catIndex, itemIndex, field) => {
     const { value } = e.target;
     setLocalData(prev => {
         const newMenu = JSON.parse(JSON.stringify(prev.menu));
         newMenu[type][catIndex].items[itemIndex][field] = value;
         return { ...prev, menu: newMenu };
     });
  };

  const addMenuItem = (type, catIndex) => {
      setLocalData(prev => {
          const newMenu = JSON.parse(JSON.stringify(prev.menu));
          newMenu[type][catIndex].items.push({ name: 'New Item', price: 'KSh 0' });
          return { ...prev, menu: newMenu };
      });
  };

  const removeMenuItem = (type, catIndex, itemIndex) => {
      setLocalData(prev => {
          const newMenu = JSON.parse(JSON.stringify(prev.menu));
          newMenu[type][catIndex].items.splice(itemIndex, 1);
          return { ...prev, menu: newMenu };
      });
  };

  const handleRuleChange = (e, index) => {
    const { value } = e.target;
    setLocalData(prev => {
        const newRules = [...prev.rules];
        newRules[index] = value;
        return { ...prev, rules: newRules };
    });
  };

  const addRule = () => {
      setLocalData(prev => ({
          ...prev,
          rules: [...prev.rules, 'New rule.']
      }));
  };

  const removeRule = (index) => {
      setLocalData(prev => {
          const newRules = [...prev.rules];
          newRules.splice(index, 1);
          return { ...prev, rules: newRules };
      });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const filePromises = Array.from(files).map(file => {
        return new Promise<{ src: string, caption: string }>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (readEvent) => {
            if (readEvent.target && typeof readEvent.target.result === 'string') {
              resolve({ src: readEvent.target.result, caption: '' });
            } else {
              reject(new Error("Could not read file."));
            }
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      });

      Promise.all(filePromises).then(newImages => {
        setLocalData(prev => ({
          ...prev,
          gallery: [...prev.gallery, ...newImages]
        }));
      }).catch(error => console.error("Error reading files:", error));
    }
  };

  const handleImageCaptionChange = (e, index) => {
      const { value } = e.target;
      setLocalData(prev => {
          const newGallery = [...prev.gallery];
          newGallery[index].caption = value;
          return { ...prev, gallery: newGallery };
      });
  };

  const handleImageDelete = (index) => {
      setLocalData(prev => {
          const newGallery = [...prev.gallery];
          newGallery.splice(index, 1);
          return { ...prev, gallery: newGallery };
      });
  };

  const moveImage = (index, direction) => {
    setLocalData(prev => {
        const newGallery = [...prev.gallery];
        const item = newGallery[index];
        const newIndex = direction === 'up' ? index - 1 : index + 1;
        if (newIndex >= 0 && newIndex < newGallery.length) {
            newGallery.splice(index, 1);
            newGallery.splice(newIndex, 0, item);
        }
        return { ...prev, gallery: newGallery };
    });
  };
  
  const generateCaption = async (index: number) => {
      if (!process.env.API_KEY) {
          alert("Gemini API Key is not set. Cannot generate caption.");
          return;
      }

      setCaptionLoading(index);
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const image = localData.gallery[index];
        const base64Data = image.src.split(',')[1];
        const mimeType = image.src.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/)[1];

        const imagePart = {
            inlineData: {
                data: base64Data,
                mimeType,
            },
        };
        const textPart = { text: "Describe this image for a restaurant's website gallery. Be concise and appealing. Focus on food, atmosphere, or events. Example: 'Vibrant cocktails lined up on the bar.'" };
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: { parts: [imagePart, textPart] }
        });
        
        const caption = response.text.trim();

        setLocalData(prev => {
            const newGallery = [...prev.gallery];
            newGallery[index].caption = caption;
            return { ...prev, gallery: newGallery };
        });

      } catch(e) {
        console.error("Error generating caption", e);
        alert("Could not generate caption. See console for details.");
      } finally {
        setCaptionLoading(null);
      }
  };

  const tabs = [
      { id: 'general', label: 'General' },
      { id: 'specials', label: 'Specials' },
      { id: 'menu', label: 'Menu' },
      { id: 'gallery', label: 'Gallery' },
  ];

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40 animate-fade-in" onClick={onCancel}></div>
      <div className="fixed top-0 right-0 h-full w-full max-w-xl bg-white shadow-2xl z-50 flex flex-col animate-slide-in">
        <header className="p-6 border-b flex justify-between items-center flex-shrink-0">
          <h2 className="font-heading text-2xl">Live Editor</h2>
          <div className="flex items-center gap-4">
             <button onClick={onLogout} className="text-sm text-gray-600 hover:text-red-500">Logout</button>
             <button onClick={onCancel} className="text-3xl text-gray-500 hover:text-gray-800">&times;</button>
          </div>
        </header>

        <main className="flex-grow p-6 overflow-y-auto">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-6" aria-label="Tabs">
              {tabs.map(tab => (
                 <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`${activeTab === tab.id ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm`}>
                     {tab.label}
                 </button>
              ))}
            </nav>
          </div>

          <div className="mt-6">
            {activeTab === 'general' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Hero Title</label>
                  <input type="text" value={localData.hero.title} onChange={(e) => handleInputChange(e, 'hero', 'title')} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary" />
                  <p className="mt-1 text-xs text-gray-500">Use `&lt;span class="text-primary"&gt;...&lt;/span&gt;` to highlight text.</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Hero Subtitle</label>
                  <textarea rows={2} value={localData.hero.subtitle} onChange={(e) => handleInputChange(e, 'hero', 'subtitle')} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"></textarea>
                </div>
                 <div>
                  <label className="block text-sm font-medium text-gray-700">About Section</label>
                  <textarea rows={4} value={localData.about} onChange={(e) => handleInputChange(e, 'about')} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"></textarea>
                </div>
                 <div>
                  <label className="block text-sm font-medium text-gray-700">Contact Address</label>
                  <input type="text" value={localData.contact.address} onChange={(e) => handleInputChange(e, 'contact', 'address')} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary" />
                </div>
                 <div>
                  <label className="block text-sm font-medium text-gray-700">Contact Phone</label>
                  <input type="text" value={localData.contact.phone} onChange={(e) => handleInputChange(e, 'contact', 'phone')} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary" />
                </div>
                <div className="pt-2">
                    <label className="block text-sm font-medium text-gray-700">House Rules</label>
                    {localData.rules.map((rule, index) => (
                        <div key={index} className="flex items-center gap-2 mt-1">
                            <input type="text" value={rule} onChange={(e) => handleRuleChange(e, index)} className="flex-grow border border-gray-300 rounded-md py-1 px-2 text-sm" />
                            <button onClick={() => removeRule(index)} className="text-gray-500 hover:text-red-500"><IconTrash /></button>
                        </div>
                    ))}
                    <button onClick={addRule} className="mt-2 text-sm text-primary hover:underline">+ Add Rule</button>
                </div>
              </div>
            )}
            
            {activeTab === 'specials' && (
                <div>
                    <label className="block text-sm font-medium text-gray-700">Today's Specials</label>
                    <textarea rows={15} value={localData.specials} onChange={handleSpecialsChange} className="mt-1 font-mono text-sm block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"></textarea>
                    <p className="mt-1 text-xs text-gray-500">Use Markdown for formatting, e.g., `**Bold Text**`. Leave blank to hide the section.</p>
                </div>
            )}

            {activeTab === 'menu' && (
               <div className="grid md:grid-cols-2 gap-6">
                 <div>
                    <h3 className="font-heading text-lg">Menu Overview</h3>
                    {localData.menu.overview.map((cat, catIndex) => (
                      <div key={catIndex} className="mt-2 p-3 border rounded-md">
                        <h4 className="font-semibold">{cat.title}</h4>
                        {cat.items.map((item, itemIndex) => (
                           <div key={itemIndex} className="flex items-center gap-2 mt-1">
                             <input type="text" value={item.name} onChange={(e) => handleMenuChange(e, 'overview', catIndex, itemIndex, 'name')} className="flex-grow border border-gray-300 rounded-md py-1 px-2 text-sm" />
                             <input type="text" value={item.price} onChange={(e) => handleMenuChange(e, 'overview', catIndex, itemIndex, 'price')} className="w-28 border border-gray-300 rounded-md py-1 px-2 text-sm" />
                             <button onClick={() => removeMenuItem('overview', catIndex, itemIndex)} className="text-gray-500 hover:text-red-500"><IconTrash /></button>
                           </div>
                        ))}
                         <button onClick={() => addMenuItem('overview', catIndex)} className="mt-2 text-sm text-primary hover:underline">+ Add Item</button>
                      </div>
                    ))}
                 </div>
                  <div>
                    <h3 className="font-heading text-lg">Full Menu</h3>
                     {localData.menu.fullMenu.map((cat, catIndex) => (
                      <div key={catIndex} className="mt-2 p-3 border rounded-md">
                        <h4 className="font-semibold">{cat.title}</h4>
                        {cat.items.map((item, itemIndex) => (
                           <div key={itemIndex} className="flex items-center gap-2 mt-1">
                             <input type="text" value={item.name} onChange={(e) => handleMenuChange(e, 'fullMenu', catIndex, itemIndex, 'name')} className="flex-grow border border-gray-300 rounded-md py-1 px-2 text-sm" />
                             <input type="text" value={item.price} onChange={(e) => handleMenuChange(e, 'fullMenu', catIndex, itemIndex, 'price')} className="w-28 border border-gray-300 rounded-md py-1 px-2 text-sm" />
                             <button onClick={() => removeMenuItem('fullMenu', catIndex, itemIndex)} className="text-gray-500 hover:text-red-500"><IconTrash /></button>
                           </div>
                        ))}
                        <button onClick={() => addMenuItem('fullMenu', catIndex)} className="mt-2 text-sm text-primary hover:underline">+ Add Item</button>
                      </div>
                    ))}
                 </div>
               </div>
            )}
            
            {activeTab === 'gallery' && (
              <div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {localData.gallery.map((image, index) => (
                    <div key={index} className="group relative border rounded-lg p-2 space-y-2">
                      <img src={image.src} alt="" className="w-full h-28 object-cover rounded-md" />
                      <div className="flex items-center">
                        <input
                           type="text"
                           value={image.caption}
                           onChange={(e) => handleImageCaptionChange(e, index)}
                           placeholder="Add a caption..."
                           className="flex-grow text-xs border-gray-300 rounded-md py-1 px-2"
                        />
                         <button 
                            onClick={() => generateCaption(index)} 
                            disabled={captionLoading === index}
                            className="ml-1 p-1 text-primary/80 hover:text-primary disabled:opacity-50"
                            title="Generate caption with AI"
                        >
                            {captionLoading === index ? <div className="w-4 h-4 border-2 border-primary/50 border-t-primary rounded-full animate-spin"></div> : <IconSparkles />}
                        </button>
                      </div>
                      <div className="absolute top-1 right-1 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                         <button onClick={() => moveImage(index, 'up')} disabled={index === 0} className="p-1 bg-white/80 rounded-full shadow hover:bg-white disabled:opacity-50"><IconArrowUp /></button>
                         <button onClick={() => moveImage(index, 'down')} disabled={index === localData.gallery.length - 1} className="p-1 bg-white/80 rounded-full shadow hover:bg-white disabled:opacity-50"><IconArrowDown /></button>
                         <button onClick={() => handleImageDelete(index)} className="p-1 bg-white/80 rounded-full shadow hover:bg-red-500 hover:text-white"><IconTrash /></button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-4 border-t">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Upload New Image(s)</label>
                    <input 
                        type="file" 
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                        aria-label="Upload new images to the gallery"
                    />
                </div>
              </div>
            )}

          </div>
        </main>

        <footer className="p-4 bg-gray-50 border-t flex justify-end gap-3 flex-shrink-0">
          <button onClick={onCancel} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">Discard Changes</button>
          <button onClick={() => onSave(localData)} className="px-6 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90">Save & Close</button>
        </footer>
      </div>
    </>
  );
};

export default AdminDashboard;
