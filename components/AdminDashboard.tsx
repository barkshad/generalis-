import React, { useState, useEffect } from 'react';
import { GoogleGenAI, Type } from "@google/genai";

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

const IconPlus: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
);

const IconSparkles: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
);

const IconBold: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 12H4M13 20H4M13 12a4 4 0 100-8H4v8m9 0a4 4 0 110 8H4v-8" /></svg>
);
const IconItalic: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M11 4h6m-6 16h6M12 4L8 20" /></svg>
);
const IconList: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
);
const IconUnderline: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 3v9a6 6 0 0012 0V3M4 21h16" /></svg>
);

const AdminDashboard = ({ siteData, onSave, onCancel, onLogout }) => {
  const [activeTab, setActiveTab] = useState('general');
  const [localData, setLocalData] = useState(JSON.parse(JSON.stringify(siteData)));
  const [captionState, setCaptionState] = useState<{ loading: number | 'all' | null, suggestions: string[], activeIndex: number | null }>({ loading: null, suggestions: [], activeIndex: null });

  const handleInputChange = (e, section, field = null, index = null, subfield = null) => {
    const { value } = e.target;
    setLocalData(prev => {
        const newData = { ...prev };
        if (index !== null) { // Array update
            const newArray = [...newData[section]];
            if (subfield) {
                 newArray[index] = { ...newArray[index], [subfield]: value };
            } else {
                 newArray[index] = value;
            }
            newData[section] = newArray;
        } else if (field) { // Object update
            newData[section] = { ...newData[section], [field]: value };
        } else { // Top-level property update
            newData[section] = value;
        }
        return newData;
    });
  };
  
  const handleMenuChange = (e, type, catIndex, itemIndex, field) => {
     const { value } = e.target;
     setLocalData(prev => {
         const newMenu = JSON.parse(JSON.stringify(prev.menu));
         newMenu[type][catIndex].items[itemIndex][field] = value;
         return { ...prev, menu: newMenu };
     });
  };
  
  const addListItem = (section, newItem) => {
      setLocalData(prev => ({
          ...prev,
          [section]: [...(prev[section] || []), newItem]
      }));
  };

  const removeListItem = (section, index) => {
      setLocalData(prev => ({
          ...prev,
          [section]: prev[section].filter((_, i) => i !== index)
      }));
  };
  
  const moveListItem = (section, index, direction) => {
    setLocalData(prev => {
        const newArray = [...prev[section]];
        const item = newArray[index];
        const newIndex = direction === 'up' ? index - 1 : index + 1;
        if (newIndex >= 0 && newIndex < newArray.length) {
            newArray.splice(index, 1);
            newArray.splice(newIndex, 0, item);
        }
        return { ...prev, [section]: newArray };
    });
  };
  
  const handleGenericImageUpload = (e: React.ChangeEvent<HTMLInputElement>, section: string, index: number) => {
    const file = e.target.files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (readEvent) => {
            const src = readEvent.target?.result as string;
            setLocalData(prev => {
                const newArray = [...prev[section]];
                newArray[index] = { ...newArray[index], image: src };
                return { ...prev, [section]: newArray };
            });
        };
        reader.readAsDataURL(file);
    }
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

  const generateCaptionSuggestions = async (index: number) => {
      if (!process.env.API_KEY) {
          alert("Gemini API Key is not set.");
          return;
      }
      setCaptionState({ loading: index, suggestions: [], activeIndex: index });
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const image = localData.gallery[index];
        const base64Data = image.src.split(',')[1];
        const mimeType = image.src.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/)[1];

        const imagePart = { inlineData: { data: base64Data, mimeType } };
        const textPart = { text: "Generate 3 diverse, concise, and appealing captions for this image for a restaurant's website gallery. Focus on food, atmosphere, or events." };
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: { parts: [imagePart, textPart] },
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        captions: {
                            type: Type.ARRAY,
                            items: { type: Type.STRING }
                        }
                    }
                }
            }
        });
        
        const result = JSON.parse(response.text);
        setCaptionState(prev => ({ ...prev, loading: null, suggestions: result.captions || [] }));
      } catch(e) {
        console.error("Error generating caption suggestions", e);
        alert("Could not generate suggestions. See console for details.");
        setCaptionState({ loading: null, suggestions: [], activeIndex: null });
      }
  };
  
    const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

    const generateAllMissingCaptions = async () => {
        if (!process.env.API_KEY) {
            alert("Gemini API Key is not set.");
            return;
        }
        setCaptionState(prev => ({ ...prev, loading: 'all' }));

        const imagesToCaption = localData.gallery
            .map((img, index) => ({ ...img, index }))
            .filter(img => !img.caption);
        
        if (imagesToCaption.length === 0) {
            setCaptionState(prev => ({ ...prev, loading: null }));
            return;
        }

        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

        for (const image of imagesToCaption) {
            try {
                const base64Data = image.src.split(',')[1];
                const mimeTypeMatch = image.src.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);
                if (!mimeTypeMatch) {
                    console.error(`Could not determine mime type for image ${image.index}`);
                    continue; // Skip this image
                }
                const mimeType = mimeTypeMatch[1];

                const imagePart = { inlineData: { data: base64Data, mimeType } };
                const textPart = { text: "Describe this image for a restaurant's website gallery. Be concise and appealing. Focus on food, atmosphere, or events." };

                const response = await ai.models.generateContent({
                    model: 'gemini-2.5-flash',
                    contents: { parts: [imagePart, textPart] }
                });
                
                const caption = response.text.trim();

                setLocalData(prev => {
                    const newGallery = [...prev.gallery];
                    if (newGallery[image.index]) {
                        newGallery[image.index].caption = caption;
                    }
                    return { ...prev, gallery: newGallery };
                });

                await delay(1200); // Wait 1.2 seconds to avoid hitting rate limits

            } catch (err) {
                console.error(`Failed to generate caption for image ${image.index}`, err);
                const errorString = err.toString();
                if (errorString.includes('429') || errorString.includes('RESOURCE_EXHAUSTED')) {
                    alert("Rate limit reached. The captioning process has been stopped. Please wait a minute before trying again.");
                    break; 
                }
            }
        }

        setCaptionState(prev => ({ ...prev, loading: null }));
    };


  const selectCaption = (caption) => {
      setLocalData(prev => {
          const newGallery = [...prev.gallery];
          newGallery[captionState.activeIndex].caption = caption;
          return { ...prev, gallery: newGallery };
      });
      setCaptionState({ loading: null, suggestions: [], activeIndex: null });
  };


  const tabs = [
      { id: 'general', label: 'General' },
      { id: 'specials', label: 'Specials' },
      { id: 'menu', label: 'Menu' },
      { id: 'events', label: 'Events' },
      { id: 'gallery', label: 'Gallery' },
      { id: 'testimonials', label: 'Testimonials' },
      { id: 'team', label: 'Team' },
  ];

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40 animate-fade-in" onClick={onCancel}></div>
      <div className="fixed top-0 right-0 h-full w-full max-w-2xl bg-white shadow-2xl z-50 flex flex-col animate-slide-in">
        <header className="p-6 border-b flex justify-between items-center flex-shrink-0">
          <h2 className="font-heading text-2xl">Live Editor</h2>
          <div className="flex items-center gap-4">
             <button onClick={onLogout} className="text-sm text-gray-600 hover:text-red-500">Logout</button>
             <button onClick={onCancel} className="text-3xl text-gray-500 hover:text-gray-800">&times;</button>
          </div>
        </header>

        <main className="flex-grow p-6 overflow-y-auto">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-6 overflow-x-auto" aria-label="Tabs">
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
                            <input type="text" value={rule} onChange={(e) => handleInputChange(e, 'rules', null, index)} className="flex-grow border border-gray-300 rounded-md py-1 px-2 text-sm" />
                            <button onClick={() => removeListItem('rules', index)} className="text-gray-500 hover:text-red-500 p-1"><IconTrash /></button>
                        </div>
                    ))}
                    <button onClick={() => addListItem('rules', 'New rule.')} className="mt-2 text-sm text-primary hover:underline flex items-center gap-1"><IconPlus /> Add Rule</button>
                </div>
              </div>
            )}
            
            {activeTab === 'specials' && (
                <div>
                    <label className="block text-sm font-medium text-gray-700">Today's Specials</label>
                    <div className="mt-1 border border-gray-300 rounded-md shadow-sm focus-within:ring-1 focus-within:ring-primary focus-within:border-primary">
                        <div className="flex items-center gap-1 p-2 border-b bg-gray-50 rounded-t-md">
                            <button type="button" onClick={() => document.execCommand('bold')} className="p-2 rounded hover:bg-gray-200" title="Bold"><IconBold /></button>
                            <button type="button" onClick={() => document.execCommand('italic')} className="p-2 rounded hover:bg-gray-200" title="Italic"><IconItalic /></button>
                            <button type="button" onClick={() => document.execCommand('underline')} className="p-2 rounded hover:bg-gray-200" title="Underline"><IconUnderline /></button>
                            <button type="button" onClick={() => document.execCommand('insertUnorderedList')} className="p-2 rounded hover:bg-gray-200" title="Bullet List"><IconList /></button>
                        </div>
                        <div
                            contentEditable
                            suppressContentEditableWarning={true}
                            onInput={(e) => setLocalData(prev => ({ ...prev, specials: e.currentTarget.innerHTML }))}
                            dangerouslySetInnerHTML={{ __html: localData.specials }}
                            className="min-h-[250px] p-3 focus:outline-none"
                        />
                    </div>
                    <p className="mt-2 text-xs text-gray-500">Use the toolbar to format your text. Leave blank to hide the section.</p>
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
                             <button onClick={() => removeListItem('menu.overview['+catIndex+'].items', itemIndex)} className="text-gray-500 hover:text-red-500"><IconTrash /></button>
                           </div>
                        ))}
                         <button onClick={() => addListItem('menu.overview['+catIndex+'].items', { name: 'New Item', price: 'KSh 0' })} className="mt-2 text-sm text-primary hover:underline flex items-center gap-1"><IconPlus /> Add Item</button>
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
                             <button onClick={() => removeListItem('menu.fullMenu['+catIndex+'].items', itemIndex)} className="text-gray-500 hover:text-red-500"><IconTrash /></button>
                           </div>
                        ))}
                        <button onClick={() => addListItem('menu.fullMenu['+catIndex+'].items', { name: 'New Item', price: 'KSh 0' })} className="mt-2 text-sm text-primary hover:underline flex items-center gap-1"><IconPlus /> Add Item</button>
                      </div>
                    ))}
                 </div>
               </div>
            )}

            {activeTab === 'events' && (
              <div className="space-y-4">
                {localData.events.map((event, index) => (
                  <div key={index} className="p-3 border rounded-md space-y-2 relative">
                    <div className="flex items-start gap-3">
                        <div className="flex-shrink-0">
                            <img src={event.image} className="w-20 h-20 object-cover rounded" />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleGenericImageUpload(e, 'events', index)}
                                className="mt-2 w-20 block text-xs text-gray-500 file:mr-2 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"
                                aria-label={`Upload image for ${event.title}`}
                            />
                        </div>
                        <div className="flex-grow">
                             <label className="text-xs text-gray-500">Title</label>
                            <input type="text" value={event.title} onChange={(e) => handleInputChange(e, 'events', null, index, 'title')} className="block w-full border border-gray-300 rounded-md py-1 px-2 text-sm" />
                             <label className="text-xs text-gray-500 mt-1">Date</label>
                            <input type="text" value={event.date} onChange={(e) => handleInputChange(e, 'events', null, index, 'date')} className="block w-full border border-gray-300 rounded-md py-1 px-2 text-sm" />
                        </div>
                    </div>
                    <div>
                         <label className="text-xs text-gray-500">Description</label>
                        <textarea rows={2} value={event.description} onChange={(e) => handleInputChange(e, 'events', null, index, 'description')} className="block w-full border border-gray-300 rounded-md py-1 px-2 text-sm" />
                    </div>
                    <div className="absolute top-2 right-2 flex flex-col gap-1">
                        <button onClick={() => removeListItem('events', index)} className="p-1 bg-white/80 rounded-full shadow hover:bg-red-500 hover:text-white"><IconTrash /></button>
                        <button onClick={() => moveListItem('events', index, 'up')} disabled={index === 0} className="p-1 bg-white/80 rounded-full shadow hover:bg-white disabled:opacity-50"><IconArrowUp /></button>
                        <button onClick={() => moveListItem('events', index, 'down')} disabled={index === localData.events.length - 1} className="p-1 bg-white/80 rounded-full shadow hover:bg-white disabled:opacity-50"><IconArrowDown /></button>
                    </div>
                  </div>
                ))}
                <button onClick={() => addListItem('events', { image: 'https://via.placeholder.com/300x200', title: 'New Event', date: 'Date', description: 'Description' })} className="mt-2 text-sm text-primary hover:underline flex items-center gap-1"><IconPlus /> Add Event</button>
              </div>
            )}
            
            {activeTab === 'gallery' && (
              <div>
                <div className="flex justify-end mb-4">
                    <button 
                        onClick={generateAllMissingCaptions} 
                        disabled={captionState.loading === 'all'}
                        className="flex items-center gap-2 px-3 py-1 text-sm text-primary border border-primary/50 rounded-full hover:bg-primary/10 disabled:opacity-50"
                    >
                        {captionState.loading === 'all' ? <div className="w-4 h-4 border-2 border-primary/50 border-t-primary rounded-full animate-spin"></div> : <IconSparkles />}
                        Generate All Missing Captions
                    </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {localData.gallery.map((image, index) => (
                    <div key={index} className="group relative border rounded-lg p-2 space-y-2">
                      <img src={image.src} alt="" className="w-full h-28 object-cover rounded-md" />
                      <div className="flex items-center">
                        <input type="text" value={image.caption} onChange={(e) => handleInputChange(e, 'gallery', null, index, 'caption')} placeholder="Add a caption..." className="flex-grow text-xs border-gray-300 rounded-md py-1 px-2"/>
                         <button onClick={() => generateCaptionSuggestions(index)} disabled={!!captionState.loading} className="ml-1 p-1 text-primary/80 hover:text-primary disabled:opacity-50" title="Generate caption with AI">
                            {captionState.loading === index ? <div className="w-4 h-4 border-2 border-primary/50 border-t-primary rounded-full animate-spin"></div> : <IconSparkles />}
                        </button>
                      </div>
                      <div className="absolute top-1 right-1 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                         <button onClick={() => moveListItem('gallery', index, 'up')} disabled={index === 0} className="p-1 bg-white/80 rounded-full shadow hover:bg-white disabled:opacity-50"><IconArrowUp /></button>
                         <button onClick={() => moveListItem('gallery', index, 'down')} disabled={index === localData.gallery.length - 1} className="p-1 bg-white/80 rounded-full shadow hover:bg-white disabled:opacity-50"><IconArrowDown /></button>
                         <button onClick={() => removeListItem('gallery', index)} className="p-1 bg-white/80 rounded-full shadow hover:bg-red-500 hover:text-white"><IconTrash /></button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-4 border-t">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Upload New Image(s)</label>
                    <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20" aria-label="Upload new images to the gallery"/>
                </div>
              </div>
            )}

            {activeTab === 'testimonials' && (
              <div className="space-y-4">
                {localData.testimonials.map((item, index) => (
                  <div key={index} className="p-3 border rounded-md space-y-2 relative">
                    <div>
                      <label className="text-xs text-gray-500">Quote</label>
                      <textarea rows={3} value={item.quote} onChange={(e) => handleInputChange(e, 'testimonials', null, index, 'quote')} className="block w-full border border-gray-300 rounded-md py-1 px-2 text-sm" />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <label className="text-xs text-gray-500">Author</label>
                            <input type="text" value={item.author} onChange={(e) => handleInputChange(e, 'testimonials', null, index, 'author')} className="block w-full border border-gray-300 rounded-md py-1 px-2 text-sm" />
                        </div>
                        <div>
                            <label className="text-xs text-gray-500">Location / Note</label>
                            <input type="text" value={item.location} onChange={(e) => handleInputChange(e, 'testimonials', null, index, 'location')} className="block w-full border border-gray-300 rounded-md py-1 px-2 text-sm" />
                        </div>
                    </div>
                     <div className="absolute top-2 right-2 flex flex-col gap-1">
                        <button onClick={() => removeListItem('testimonials', index)} className="p-1 bg-white/80 rounded-full shadow hover:bg-red-500 hover:text-white"><IconTrash /></button>
                     </div>
                  </div>
                ))}
                 <button onClick={() => addListItem('testimonials', { quote: 'Amazing experience!', author: 'New Customer', location: 'Kilifi' })} className="mt-2 text-sm text-primary hover:underline flex items-center gap-1"><IconPlus /> Add Testimonial</button>
              </div>
            )}
            
            {activeTab === 'team' && (
              <div className="space-y-4">
                {localData.team.map((member, index) => (
                   <div key={index} className="p-3 border rounded-md relative flex items-start gap-4">
                     <div>
                        <img src={member.image} className="w-24 h-24 object-cover rounded-full" />
                        <input type="file" accept="image/*" onChange={(e) => handleGenericImageUpload(e, 'team', index)} className="mt-2 w-24 block text-xs text-gray-500 file:mr-2 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"/>
                     </div>
                     <div className="flex-grow space-y-2">
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <label className="text-xs text-gray-500">Name</label>
                                <input type="text" value={member.name} onChange={(e) => handleInputChange(e, 'team', null, index, 'name')} className="block w-full border border-gray-300 rounded-md py-1 px-2 text-sm" />
                            </div>
                             <div>
                                <label className="text-xs text-gray-500">Role</label>
                                <input type="text" value={member.role} onChange={(e) => handleInputChange(e, 'team', null, index, 'role')} className="block w-full border border-gray-300 rounded-md py-1 px-2 text-sm" />
                            </div>
                        </div>
                        <div>
                            <label className="text-xs text-gray-500">Bio</label>
                            <textarea rows={2} value={member.bio} onChange={(e) => handleInputChange(e, 'team', null, index, 'bio')} className="block w-full border border-gray-300 rounded-md py-1 px-2 text-sm" />
                        </div>
                     </div>
                      <div className="absolute top-2 right-2 flex flex-col gap-1">
                        <button onClick={() => removeListItem('team', index)} className="p-1 bg-white/80 rounded-full shadow hover:bg-red-500 hover:text-white"><IconTrash /></button>
                      </div>
                   </div>
                ))}
                <button onClick={() => addListItem('team', { image: 'https://via.placeholder.com/150', name: 'New Member', role: 'Role', bio: 'Bio' })} className="mt-2 text-sm text-primary hover:underline flex items-center gap-1"><IconPlus /> Add Team Member</button>
              </div>
            )}


          </div>
        </main>

        <footer className="p-4 bg-gray-50 border-t flex justify-end gap-3 flex-shrink-0">
          <button onClick={onCancel} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">Discard Changes</button>
          <button onClick={() => onSave(localData)} className="px-6 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90">Save & Close</button>
        </footer>
      </div>

       {captionState.activeIndex !== null && captionState.suggestions.length > 0 && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center" onClick={() => setCaptionState({ loading: null, suggestions: [], activeIndex: null })}>
                <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
                    <h3 className="font-heading text-lg">Choose a Caption</h3>
                    <ul className="mt-4 space-y-2">
                        {captionState.suggestions.map((caption, i) => (
                            <li key={i} onClick={() => selectCaption(caption)} className="p-3 border rounded-md hover:bg-gray-100 cursor-pointer text-sm">
                                {caption}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )}
    </>
  );
};

export default AdminDashboard;