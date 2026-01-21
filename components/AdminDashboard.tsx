import React, { useState } from 'react';
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

// UI Helper components
const Section: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h3 className="font-heading text-xl mb-4 border-b pb-2">{title}</h3>
        <div className="space-y-4">{children}</div>
    </div>
);

const Input: React.FC<{ label?: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, placeholder?: string, type?: string }> = ({ label, value, onChange, placeholder, type = "text" }) => (
    <div className="w-full">
        {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
        <input 
            type={type} 
            value={value} 
            onChange={onChange} 
            placeholder={placeholder}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" 
        />
    </div>
);

const Textarea: React.FC<{ label?: string, value: string, onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void, placeholder?: string }> = ({ label, value, onChange, placeholder }) => (
    <div className="w-full">
        {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
        <textarea 
            value={value} 
            onChange={onChange} 
            placeholder={placeholder}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" 
        />
    </div>
);

const RichTextEditor: React.FC<{ label: string, value: string, onChange: (value: string) => void }> = ({ label, value, onChange }) => {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <Textarea value={value} onChange={(e) => onChange(e.target.value)} />
            <p className="text-xs text-gray-500 mt-1">HTML tags like &lt;strong&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;li&gt; are supported.</p>
        </div>
    );
};

interface AdminDashboardProps {
    siteData: any;
    onSave: (data: any) => void;
    onCancel: () => void;
    onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ siteData, onSave, onCancel, onLogout }) => {
    const [activeTab, setActiveTab] = useState('general');
    const [localData, setLocalData] = useState(JSON.parse(JSON.stringify(siteData)));
    const [captionState, setCaptionState] = useState<{ loading: number | 'all' | null, suggestions: string[], activeIndex: number | null }>({ loading: null, suggestions: [], activeIndex: null });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, section: string, field: string | null = null, index: number | null = null, subfield: string | null = null) => {
        const { value } = e.target;
        setLocalData(prev => {
            const newData = JSON.parse(JSON.stringify(prev));
            if (index !== null) {
                const newArray = newData[section];
                if (subfield) {
                    newArray[index][subfield] = value;
                } else {
                    newArray[index] = value;
                }
            } else if (field) {
                newData[section][field] = value;
            } else {
                newData[section] = value;
            }
            return newData;
        });
    };

    const handleMenuCategoryTitleChange = (e: React.ChangeEvent<HTMLInputElement>, menuType: string, catIndex: number) => {
        const { value } = e.target;
        setLocalData(prev => {
            const newData = JSON.parse(JSON.stringify(prev));
            newData.menu[menuType][catIndex].title = value;
            return newData;
        });
    };

    const addMenuItem = (menuType: string, catIndex: number) => {
        setLocalData(prev => {
            const newData = JSON.parse(JSON.stringify(prev));
            newData.menu[menuType][catIndex].items.push({ name: 'New Item', price: 'KSh 0' });
            return newData;
        });
    };

    const removeMenuItem = (menuType: string, catIndex: number, itemIndex: number) => {
        setLocalData(prev => {
            const newData = JSON.parse(JSON.stringify(prev));
            newData.menu[menuType][catIndex].items.splice(itemIndex, 1);
            return newData;
        });
    };

    const handleMenuChange = (e: React.ChangeEvent<HTMLInputElement>, type: string, catIndex: number, itemIndex: number, field: string) => {
        const { value } = e.target;
        setLocalData(prev => {
            const newData = JSON.parse(JSON.stringify(prev));
            newData.menu[type][catIndex].items[itemIndex][field] = value;
            return newData;
        });
    };

    const addMenuCategory = (menuType: string) => {
        setLocalData(prev => {
            const newData = JSON.parse(JSON.stringify(prev));
            newData.menu[menuType].push({ title: 'New Category', items: [] });
            return newData;
        });
    };

    const removeMenuCategory = (menuType: string, catIndex: number) => {
        setLocalData(prev => {
            const newData = JSON.parse(JSON.stringify(prev));
            newData.menu[menuType].splice(catIndex, 1);
            return newData;
        });
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            Array.from(files).forEach(file => {
                const reader = new FileReader();
                reader.onload = (readEvent) => {
                    const src = readEvent.target?.result as string;
                    setLocalData(prev => ({
                        ...prev,
                        gallery: [...prev.gallery, { src, caption: '' }]
                    }));
                };
                reader.readAsDataURL(file);
            });
        }
    };

    const generateAllMissingCaptions = async () => {
        const apiKey = process.env.API_KEY;
        if (!apiKey) {
            alert("Gemini API Key is not set.");
            return;
        }
        setCaptionState({ loading: 'all', suggestions: [], activeIndex: null });
        try {
            // FIX: Initialize with explicit apiKey string to avoid unknown type issues.
            const ai = new GoogleGenAI({ apiKey: apiKey as string });
            // FIX: Explicitly cast the parsed gallery data to avoid unknown/empty object issues and provide structure.
            const galleryCopy = JSON.parse(JSON.stringify(localData.gallery)) as Array<{src: string, caption: string}>;
            
            for (let i = 0; i < galleryCopy.length; i++) {
                if (!galleryCopy[i].caption) {
                    const base64Data = galleryCopy[i].src.split(',')[1];
                    const mimeType = galleryCopy[i].src.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/)?.[1] || 'image/jpeg';
                    
                    const response = await ai.models.generateContent({
                        model: 'gemini-2.5-flash',
                        contents: [{ 
                            parts: [
                                // FIX: Cast inlineData object as any to resolve conflict between global Blob and @google/genai's internal Blob type.
                                { inlineData: { data: base64Data, mimeType } as any },
                                { text: "Provide a 5-word catchy caption for this restaurant image." }
                            ] 
                        }]
                    });
                    galleryCopy[i].caption = response.text || "Fresh from our kitchen";
                }
            }
            setLocalData(prev => ({ ...prev, gallery: galleryCopy }));
        } catch (e) {
            console.error(e);
        } finally {
            setCaptionState({ loading: null, suggestions: [], activeIndex: null });
        }
    };

    const tabs = [
        { id: 'general', label: 'General' },
        { id: 'menu', label: 'Menu' },
        { id: 'events', label: 'Events' },
        { id: 'gallery', label: 'Gallery' },
        { id: 'team', label: 'Team' },
        { id: 'contact', label: 'Contact' }
    ];

    return (
        <div className="fixed inset-0 bg-gray-100 z-[60] flex flex-col">
            <header className="bg-charcoal text-white px-6 py-4 flex justify-between items-center shrink-0">
                <h2 className="font-heading text-xl">Admin Dashboard</h2>
                <div className="flex gap-3">
                    <button onClick={onLogout} className="px-4 py-2 text-sm font-semibold text-white/70 hover:text-white transition-colors">Logout</button>
                    <button onClick={onCancel} className="px-4 py-2 text-sm font-semibold bg-white/10 hover:bg-white/20 rounded-md transition-colors">Cancel</button>
                    <button onClick={() => onSave(localData)} className="px-6 py-2 text-sm font-semibold bg-primary rounded-md shadow-lg hover:bg-primary/90 transition-colors">Save Changes</button>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden">
                <nav className="w-64 bg-white border-r border-gray-200 overflow-y-auto shrink-0">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full text-left px-6 py-4 font-medium transition-colors border-l-4 ${activeTab === tab.id ? 'bg-primary/5 text-primary border-primary' : 'text-gray-600 border-transparent hover:bg-gray-50'}`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </nav>

                <main className="flex-1 overflow-y-auto p-8">
                    {activeTab === 'general' && (
                        <div className="max-w-4xl mx-auto space-y-6">
                            <Section title="Hero Section">
                                <Input label="Hero Title (HTML supported)" value={localData.hero.title} onChange={e => handleInputChange(e, 'hero', 'title')} />
                                <Input label="Hero Subtitle" value={localData.hero.subtitle} onChange={e => handleInputChange(e, 'hero', 'subtitle')} />
                            </Section>
                            <Section title="About Section">
                                <Textarea label="Welcome Message" value={localData.about} onChange={e => handleInputChange(e, 'about')} />
                            </Section>
                            <Section title="Today's Specials">
                                <RichTextEditor label="Specials Content (HTML)" value={localData.specials} onChange={val => setLocalData(p => ({...p, specials: val}))} />
                            </Section>
                        </div>
                    )}

                    {activeTab === 'menu' && (
                        <div className="max-w-4xl mx-auto space-y-8">
                            <Section title="Menu Categories (Overview)">
                                {localData.menu.overview.map((cat, catIdx) => (
                                    <div key={catIdx} className="p-4 border border-gray-200 rounded-lg mb-4 bg-gray-50">
                                        <div className="flex justify-between items-center mb-4">
                                            <Input value={cat.title} onChange={e => handleMenuCategoryTitleChange(e, 'overview', catIdx)} placeholder="Category Title" />
                                            <button onClick={() => removeMenuCategory('overview', catIdx)} className="ml-2 text-red-500 p-2"><IconTrash /></button>
                                        </div>
                                        <div className="space-y-2">
                                            {cat.items.map((item, itemIdx) => (
                                                <div key={itemIdx} className="flex gap-2">
                                                    <Input value={item.name} onChange={e => handleMenuChange(e, 'overview', catIdx, itemIdx, 'name')} placeholder="Item Name" />
                                                    <Input value={item.price} onChange={e => handleMenuChange(e, 'overview', catIdx, itemIdx, 'price')} placeholder="Price" />
                                                    <button onClick={() => removeMenuItem('overview', catIdx, itemIdx)} className="text-gray-400 p-2"><IconTrash /></button>
                                                </div>
                                            ))}
                                            <button onClick={() => addMenuItem('overview', catIdx)} className="mt-2 text-primary text-sm font-semibold flex items-center gap-1"><IconPlus /> Add Item</button>
                                        </div>
                                    </div>
                                ))}
                                <button onClick={() => addMenuCategory('overview')} className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-primary hover:text-primary transition-colors">Add New Category</button>
                            </Section>
                        </div>
                    )}

                    {activeTab === 'gallery' && (
                        <div className="max-w-4xl mx-auto space-y-6">
                            <div className="flex justify-between items-center">
                                <h3 className="font-heading text-xl">Manage Gallery</h3>
                                <button 
                                    onClick={generateAllMissingCaptions}
                                    disabled={captionState.loading === 'all'}
                                    className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 disabled:opacity-50"
                                >
                                    <IconSparkles /> {captionState.loading === 'all' ? 'Generating...' : 'Auto-caption Missing'}
                                </button>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {localData.gallery.map((img, idx) => (
                                    <div key={idx} className="relative group bg-white border rounded-lg overflow-hidden shadow-sm">
                                        <img src={img.src} alt="Gallery item" className="w-full h-40 object-cover" />
                                        <div className="p-3">
                                            <textarea 
                                                value={img.caption} 
                                                onChange={e => handleInputChange(e as any, 'gallery', null, idx, 'caption')}
                                                className="w-full text-xs border-none focus:ring-0 p-0 resize-none"
                                                placeholder="Add a caption..."
                                            />
                                        </div>
                                        <button 
                                            onClick={() => setLocalData(p => ({...p, gallery: p.gallery.filter((_, i) => i !== idx)}))}
                                            className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <IconTrash />
                                        </button>
                                    </div>
                                ))}
                                <label className="border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center p-6 cursor-pointer hover:border-primary hover:bg-primary/5 transition-all h-full min-h-[12rem]">
                                    <IconPlus />
                                    <span className="mt-2 text-sm text-gray-500">Upload Photos</span>
                                    <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" />
                                </label>
                            </div>
                        </div>
                    )}

                    {/* Additional tabs like Events, Team, and Contact follow a similar pattern */}
                    {activeTab === 'events' && (
                         <div className="max-w-4xl mx-auto space-y-6">
                             <Section title="Events Management">
                                 {localData.events.map((event, idx) => (
                                     <div key={idx} className="p-4 border rounded-lg mb-4 space-y-3 bg-gray-50 relative">
                                         <Input label="Event Title" value={event.title} onChange={e => handleInputChange(e, 'events', null, idx, 'title')} />
                                         <Input label="Event Date" value={event.date} onChange={e => handleInputChange(e, 'events', null, idx, 'date')} />
                                         <Textarea label="Description" value={event.description} onChange={e => handleInputChange(e, 'events', null, idx, 'description')} />
                                         <button onClick={() => setLocalData(p => ({...p, events: p.events.filter((_, i) => i !== idx)}))} className="absolute top-2 right-2 text-red-500"><IconTrash /></button>
                                     </div>
                                 ))}
                                 <button onClick={() => setLocalData(p => ({...p, events: [...p.events, { title: 'New Event', date: 'Upcoming', description: '', image: 'https://picsum.photos/800/600' }]}))} className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-primary hover:text-primary transition-colors">Add Event</button>
                             </Section>
                         </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;