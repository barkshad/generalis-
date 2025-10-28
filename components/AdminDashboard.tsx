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


const AdminDashboard = ({ siteData, onUpdate, onClose, onLogout }) => {
  const [activeTab, setActiveTab] = useState('general');
  const [formData, setFormData] = useState(siteData);
  const [captionLoading, setCaptionLoading] = useState<number | null>(null);

  useEffect(() => {
    // Fallback migration for gallery format
    if (formData.gallery && formData.gallery.length > 0 && typeof formData.gallery[0] === 'string') {
        setFormData(prev => ({
            ...prev,
            gallery: prev.gallery.map(src => ({ src, caption: '' }))
        }));
    }
  }, []);

  const handleGeneralChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, hero: { ...prev.hero, [name]: value } }));
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, contact: { ...prev.contact, [name]: value } }));
  };
  
  const handleSave = () => {
      onUpdate(formData);
      alert('Changes saved successfully!');
  };

  const renderGeneralTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-heading mb-2">Hero Section</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Hero Title (HTML supported)</label>
            <textarea name="title" value={formData.hero.title} onChange={handleGeneralChange} rows={3} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Hero Subtitle</label>
            <textarea name="subtitle" value={formData.hero.subtitle} onChange={handleGeneralChange} rows={4} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"></textarea>
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-heading mb-2">Contact Info</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <input type="text" name="address" value={formData.contact.address} onChange={handleContactChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input type="text" name="phone" value={formData.contact.phone} onChange={handleContactChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm" />
          </div>
        </div>
      </div>
      <button onClick={handleSave} className="px-4 py-2 bg-primary text-white font-semibold rounded-md hover:bg-primary/90">Save General Info</button>
    </div>
  );

  const renderSpecialsTab = () => {
    const handleSpecialsChange = (e) => {
        setFormData(prev => ({ ...prev, specials: e.target.value }));
    };

    return (
        <div className="space-y-6">
            <h3 className="text-lg font-heading mb-2">Today's Specials</h3>
            <p className="text-sm text-gray-600 mb-4">Enter the text for the specials board. Use **text** for bolding. Leave empty to hide the section.</p>
            <div>
                <label className="block text-sm font-medium text-gray-700">Specials Content</label>
                <textarea 
                    name="specials" 
                    value={formData.specials} 
                    onChange={handleSpecialsChange} 
                    rows={15} 
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm font-mono"
                    placeholder="Enter today's specials here..."
                ></textarea>
            </div>
            <button onClick={handleSave} className="px-4 py-2 bg-primary text-white font-semibold rounded-md hover:bg-primary/90">Save Specials</button>
        </div>
    );
  };

  const renderMenuTab = () => {
    const handleMenuChange = (e, section, catIndex, itemIndex) => {
        const {name, value} = e.target;
        const newMenuData = JSON.parse(JSON.stringify(formData.menu));
        if (itemIndex === null) { // Editing category title
             newMenuData[section][catIndex][name] = value;
        } else {
            newMenuData[section][catIndex].items[itemIndex][name] = value;
        }
        setFormData(prev => ({...prev, menu: newMenuData}));
    };
    
    const addMenuItem = (section, catIndex) => {
        const newMenuData = JSON.parse(JSON.stringify(formData.menu));
        newMenuData[section][catIndex].items.push({name: 'New Item', price: 'KSh 0'});
        setFormData(prev => ({...prev, menu: newMenuData}));
    };

    const deleteMenuItem = (section, catIndex, itemIndex) => {
         const newMenuData = JSON.parse(JSON.stringify(formData.menu));
         newMenuData[section][catIndex].items.splice(itemIndex, 1);
         setFormData(prev => ({...prev, menu: newMenuData}));
    };

    const addCategory = (section) => {
      const newMenuData = JSON.parse(JSON.stringify(formData.menu));
      newMenuData[section].push({ title: 'New Category', items: [] });
      setFormData(prev => ({ ...prev, menu: newMenuData }));
    };

    const deleteCategory = (section, catIndex) => {
        const newMenuData = JSON.parse(JSON.stringify(formData.menu));
        newMenuData[section].splice(catIndex, 1);
        setFormData(prev => ({ ...prev, menu: newMenuData }));
    };
    
    const reorderArrayItem = (list, index, direction) => {
        const newList = [...list];
        const newIndex = direction === 'up' ? index - 1 : index + 1;
        [newList[index], newList[newIndex]] = [newList[newIndex], newList[index]];
        return newList;
    };

    const handleReorderCategory = (sectionKey, catIndex, direction) => {
        const newMenuData = JSON.parse(JSON.stringify(formData.menu));
        newMenuData[sectionKey] = reorderArrayItem(newMenuData[sectionKey], catIndex, direction);
        setFormData(prev => ({ ...prev, menu: newMenuData }));
    };

    const handleReorderItem = (sectionKey, catIndex, itemIndex, direction) => {
        const newMenuData = JSON.parse(JSON.stringify(formData.menu));
        const items = newMenuData[sectionKey][catIndex].items;
        newMenuData[sectionKey][catIndex].items = reorderArrayItem(items, itemIndex, direction);
        setFormData(prev => ({ ...prev, menu: newMenuData }));
    };

    const handleDuplicateCategory = (sectionKey, catIndex) => {
        const newMenuData = JSON.parse(JSON.stringify(formData.menu));
        const originalCategory = newMenuData[sectionKey][catIndex];
        const duplicatedCategory = JSON.parse(JSON.stringify(originalCategory));
        duplicatedCategory.title = `Copy of ${originalCategory.title}`;
        newMenuData[sectionKey].splice(catIndex + 1, 0, duplicatedCategory);
        setFormData(prev => ({ ...prev, menu: newMenuData }));
    };

    const handleDuplicateItem = (sectionKey, catIndex, itemIndex) => {
        const newMenuData = JSON.parse(JSON.stringify(formData.menu));
        const originalItem = newMenuData[sectionKey][catIndex].items[itemIndex];
        const duplicatedItem = JSON.parse(JSON.stringify(originalItem));
        newMenuData[sectionKey][catIndex].items.splice(itemIndex + 1, 0, duplicatedItem);
        setFormData(prev => ({ ...prev, menu: newMenuData }));
    };

    return (
        <div className="space-y-8">
            {Object.keys(formData.menu).map(sectionKey => (
                 <div key={sectionKey}>
                    <h3 className="text-xl font-heading mb-3 capitalize border-b pb-2">{sectionKey.replace('fullMenu', 'Full Menu')}</h3>
                    {formData.menu[sectionKey].map((category, catIndex) => (
                        <div key={catIndex} className="p-4 border rounded-md mb-4 bg-gray-50/50">
                            <div className="flex justify-between items-center mb-3">
                                <input type="text" name="title" value={category.title} onChange={e => handleMenuChange(e, sectionKey, catIndex, null)} className="font-semibold text-lg border-b-2 border-transparent focus:border-primary outline-none bg-transparent flex-grow w-full"/>
                                <div className="flex items-center gap-1">
                                    <button onClick={() => handleReorderCategory(sectionKey, catIndex, 'up')} disabled={catIndex === 0} title="Move Up" className="p-2 text-gray-500 hover:bg-gray-200 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"><IconArrowUp /></button>
                                    <button onClick={() => handleReorderCategory(sectionKey, catIndex, 'down')} disabled={catIndex === formData.menu[sectionKey].length - 1} title="Move Down" className="p-2 text-gray-500 hover:bg-gray-200 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"><IconArrowDown /></button>
                                    <button onClick={() => handleDuplicateCategory(sectionKey, catIndex)} title="Duplicate Category" className="p-2 text-blue-500 hover:bg-blue-100 rounded-full"><IconCopy /></button>
                                    <button onClick={() => deleteCategory(sectionKey, catIndex)} title="Delete Category" className="p-2 text-red-500 hover:bg-red-100 rounded-full shrink-0"><IconTrash /></button>
                                </div>
                            </div>
                            <div className="space-y-2">
                                {category.items.map((item, itemIndex) => (
                                    <div key={itemIndex} className="flex items-center gap-2">
                                        <input type="text" name="name" value={item.name} onChange={e => handleMenuChange(e, sectionKey, catIndex, itemIndex)} className="flex-grow rounded-md border-gray-300 shadow-sm sm:text-sm focus:ring-primary focus:border-primary"/>
                                        <input type="text" name="price" value={item.price} onChange={e => handleMenuChange(e, sectionKey, catIndex, itemIndex)} className="w-32 rounded-md border-gray-300 shadow-sm sm:text-sm focus:ring-primary focus:border-primary"/>
                                        <div className="flex items-center">
                                            <button onClick={() => handleReorderItem(sectionKey, catIndex, itemIndex, 'up')} disabled={itemIndex === 0} title="Move Up" className="p-2 text-gray-500 hover:bg-gray-200 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"><IconArrowUp /></button>
                                            <button onClick={() => handleReorderItem(sectionKey, catIndex, itemIndex, 'down')} disabled={itemIndex === category.items.length - 1} title="Move Down" className="p-2 text-gray-500 hover:bg-gray-200 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"><IconArrowDown /></button>
                                            <button onClick={() => handleDuplicateItem(sectionKey, catIndex, itemIndex)} title="Duplicate Item" className="p-2 text-blue-500 hover:bg-blue-100 rounded-full"><IconCopy /></button>
                                            <button onClick={() => deleteMenuItem(sectionKey, catIndex, itemIndex)} title="Delete Item" className="p-2 text-red-600 hover:bg-red-100 rounded-full shrink-0"><IconTrash /></button>
                                        </div>
                                    </div>
                                ))}
                                {category.items.length === 0 && <p className="text-xs text-gray-500 text-center py-2">This category is empty. Add an item below.</p>}
                            </div>
                             <button onClick={() => addMenuItem(sectionKey, catIndex)} className="mt-3 text-sm text-primary font-semibold hover:underline">+ Add Item</button>
                        </div>
                    ))}
                    <button onClick={() => addCategory(sectionKey)} className="mt-2 text-sm text-primary font-semibold border border-dashed border-primary/50 rounded-md p-2 w-full hover:bg-primary/10 transition-colors">+ Add Category to {sectionKey.replace('fullMenu', 'Full Menu')}</button>
                 </div>
            ))}
            <button onClick={handleSave} className="mt-4 px-6 py-2 bg-primary text-white font-semibold rounded-md hover:bg-primary/90">Save Menu Changes</button>
        </div>
    );
  };

  const renderGalleryTab = () => {
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const newImage = { src: event.target?.result as string, caption: '' };
                setFormData(prev => ({
                    ...prev,
                    gallery: [...prev.gallery, newImage]
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCaptionChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newGallery = [...formData.gallery];
        newGallery[index].caption = e.target.value;
        setFormData(prev => ({ ...prev, gallery: newGallery }));
    };

    const generateCaption = async (index: number) => {
        const image = formData.gallery[index];
        if (!image || !image.src) return;

        setCaptionLoading(index);
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            
            const base64Data = image.src.split(',')[1];
            const mimeType = image.src.match(/data:(.*);base64/)?.[1] || 'image/jpeg';

            const imagePart = {
                inlineData: { data: base64Data, mimeType },
            };
            const textPart = {
                text: "Write a short, engaging caption for this image. The image is for a bar and kitchen's website gallery. Focus on the vibe, the food, or the atmosphere.",
            };
            
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: { parts: [imagePart, textPart] },
            });

            const caption = response.text.trim();
            const newGallery = [...formData.gallery];
            newGallery[index].caption = caption;
            setFormData(prev => ({ ...prev, gallery: newGallery }));

        } catch (error) {
            console.error("Error generating caption:", error);
            alert("Failed to generate caption. Please check the console for details.");
        } finally {
            setCaptionLoading(null);
        }
    };

    const deleteImage = (index) => {
        const newGallery = formData.gallery.filter((_, i) => i !== index);
        setFormData(prev => ({...prev, gallery: newGallery}));
    };

    return (
        <div className="space-y-6">
            <h3 className="text-lg font-heading mb-2">Manage Gallery</h3>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload New Image</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                         <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" /></svg>
                        <div className="flex text-sm text-gray-600">
                            <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary/80 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary">
                                <span>Upload a file</span>
                                <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={handleImageUpload} />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                </div>
            </div>

            <div className="space-y-4 mt-4 max-h-96 overflow-y-auto pr-2">
                {formData.gallery.map((image, index) => (
                    <div key={index} className="flex items-start gap-4 p-3 border rounded-md bg-white">
                        <img src={image.src} className="w-24 h-24 object-cover rounded-md flex-shrink-0" alt={`Gallery item ${index+1}`} />
                        <div className="flex-grow space-y-2">
                            <label className="block text-xs font-medium text-gray-500">Caption</label>
                            <input 
                                type="text" 
                                value={image.caption} 
                                onChange={(e) => handleCaptionChange(e, index)} 
                                placeholder="Enter a caption..." 
                                className="w-full rounded-md border-gray-300 shadow-sm sm:text-sm focus:ring-primary focus:border-primary" 
                            />
                            <div className="flex items-center justify-between pt-1">
                                 <button 
                                    onClick={() => generateCaption(index)}
                                    disabled={captionLoading === index}
                                    className="flex items-center gap-1.5 text-sm text-primary font-semibold hover:underline disabled:opacity-50 disabled:cursor-wait"
                                >
                                    {captionLoading === index ? (
                                        <>
                                         <svg className="animate-spin h-4 w-4 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                         Generating...
                                        </>
                                    ) : (
                                        <>
                                            <IconSparkles />
                                            Generate with AI
                                        </>
                                    )}
                                </button>
                                <button onClick={() => deleteImage(index)} title="Delete Image" className="text-red-600 hover:text-red-800 p-1 rounded-full shrink-0">
                                    <IconTrash />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <button onClick={handleSave} className="mt-4 px-4 py-2 bg-primary text-white font-semibold rounded-md hover:bg-primary/90">Save Gallery Changes</button>
        </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full h-[90vh] flex flex-col">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="font-heading text-2xl">Admin Dashboard</h2>
          <div>
            <button onClick={onLogout} className="text-sm font-semibold uppercase hover:text-primary mr-4">Logout</button>
            <button onClick={onClose} className="text-2xl hover:text-primary">&times;</button>
          </div>
        </div>
        <div className="flex flex-grow overflow-hidden">
          <div className="w-1/4 border-r bg-gray-50 p-4">
            <nav className="flex flex-col gap-2">
              <button onClick={() => setActiveTab('general')} className={`p-2 rounded text-left ${activeTab === 'general' ? 'bg-primary/20 text-primary' : 'hover:bg-gray-200'}`}>General Info</button>
              <button onClick={() => setActiveTab('specials')} className={`p-2 rounded text-left ${activeTab === 'specials' ? 'bg-primary/20 text-primary' : 'hover:bg-gray-200'}`}>Specials</button>
              <button onClick={() => setActiveTab('menu')} className={`p-2 rounded text-left ${activeTab === 'menu' ? 'bg-primary/20 text-primary' : 'hover:bg-gray-200'}`}>Menu</button>
              <button onClick={() => setActiveTab('gallery')} className={`p-2 rounded text-left ${activeTab === 'gallery' ? 'bg-primary/20 text-primary' : 'hover:bg-gray-200'}`}>Gallery</button>
            </nav>
          </div>
          <div className="w-3/4 p-6 overflow-y-auto bg-gray-50/50">
            {activeTab === 'general' && renderGeneralTab()}
            {activeTab === 'specials' && renderSpecialsTab()}
            {activeTab === 'menu' && renderMenuTab()}
            {activeTab === 'gallery' && renderGalleryTab()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
