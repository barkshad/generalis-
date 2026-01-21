import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";

const IconTrash: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
);

const IconPlus: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
);

const IconSparkles: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
);

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

interface AdminDashboardProps {
    siteData: any;
    onSave: (data: any) => void;
    onCancel: () => void;
    onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ siteData, onSave, onCancel, onLogout }) => {
    const [activeTab, setActiveTab] = useState('general');
    const [localData, setLocalData] = useState(JSON.parse(JSON.stringify(siteData)));
    const [captionState, setCaptionState] = useState<{ loading: 'all' | null }>({ loading: null });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, section: string, field: string | null = null, index: number | null = null, subfield: string | null = null) => {
        const { value } = e.target;
        setLocalData((prev: any) => {
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

    const handleMenuChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'overview' | 'fullMenu', catIndex: number, itemIndex: number, field: string) => {
        const { value } = e.target;
        setLocalData((prev: any) => {
            const newData = JSON.parse(JSON.stringify(prev));
            newData.menu[type][catIndex].items[itemIndex][field] = value;
            return newData;
        });
    };

    const generateAllMissingCaptions = async () => {
        const apiKey = process.env.API_KEY;
        if (!apiKey) {
            alert("Please set your Gemini API Key in the environment variables.");
            return;
        }
        setCaptionState({ loading: 'all' });
        try {
            const ai = new GoogleGenAI({ apiKey });
            const galleryCopy = [...localData.gallery];
            
            for (let i = 0; i < galleryCopy.length; i++) {
                if (!galleryCopy[i].caption && galleryCopy[i].src.includes('base64')) {
                    const src = galleryCopy[i].src;
                    const base64Data = src.split(',')[1];
                    const mimeType = src.match(/data:([^;]+);/)?.[1] || 'image/jpeg';
                    
                    const response = await ai.models.generateContent({
                        model: 'gemini-2.5-flash',
                        contents: {
                            parts: [
                                { inlineData: { data: base64Data, mimeType: mimeType } } as any,
                                { text: "Provide a very short, catchy 5-word caption for this restaurant photo." }
                            ]
                        }
                    });
                    
                    if (response.text) {
                        galleryCopy[i].caption = response.text.trim();
                    }
                }
            }
            setLocalData((prev: any) => ({ ...prev, gallery: galleryCopy }));
        } catch (e) {
            console.error("Caption generation error:", e);
        } finally {
            setCaptionState({ loading: null });
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-100 z-[60] flex flex-col">
            <header className="bg-charcoal text-white px-6 py-4 flex justify-between items-center shrink-0">
                <h2 className="font-heading text-xl">Dashboard</h2>
                <div className="flex gap-3">
                    <button onClick={onLogout} className="px-4 py-2 text-sm text-white/70 hover:text-white">Logout</button>
                    <button onClick={onCancel} className="px-4 py-2 text-sm bg-white/10 rounded-md">Cancel</button>
                    <button onClick={() => onSave(localData)} className="px-6 py-2 text-sm bg-primary rounded-md">Save</button>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden">
                <nav className="w-56 bg-white border-r overflow-y-auto">
                    {['general', 'menu', 'gallery', 'events'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`w-full text-left px-6 py-4 capitalize ${activeTab === tab ? 'bg-primary/10 text-primary border-l-4 border-primary' : 'text-gray-600'}`}
                        >
                            {tab}
                        </button>
                    ))}
                </nav>

                <main className="flex-1 overflow-y-auto p-8">
                    {activeTab === 'general' && (
                        <div className="max-w-3xl space-y-6">
                            <Section title="Hero">
                                <Input label="Title" value={localData.hero.title} onChange={e => handleInputChange(e, 'hero', 'title')} />
                                <Input label="Subtitle" value={localData.hero.subtitle} onChange={e => handleInputChange(e, 'hero', 'subtitle')} />
                            </Section>
                            <Section title="About">
                                <Textarea label="Content" value={localData.about} onChange={e => handleInputChange(e, 'about')} />
                            </Section>
                        </div>
                    )}

                    {activeTab === 'menu' && (
                        <div className="max-w-3xl space-y-6">
                            {localData.menu.overview.map((cat: any, catIdx: number) => (
                                <Section key={catIdx} title={cat.title}>
                                    {cat.items.map((item: any, itemIdx: number) => (
                                        <div key={itemIdx} className="flex gap-4 mb-2">
                                            <Input value={item.name} onChange={e => handleMenuChange(e, 'overview', catIdx, itemIdx, 'name')} />
                                            <Input value={item.price} onChange={e => handleMenuChange(e, 'overview', catIdx, itemIdx, 'price')} />
                                        </div>
                                    ))}
                                </Section>
                            ))}
                        </div>
                    )}

                    {activeTab === 'gallery' && (
                        <div className="max-w-4xl space-y-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-heading">Gallery</h3>
                                <button 
                                    onClick={generateAllMissingCaptions}
                                    disabled={captionState.loading === 'all'}
                                    className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md disabled:opacity-50"
                                >
                                    <IconSparkles /> {captionState.loading ? 'Processing...' : 'Auto-caption'}
                                </button>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                {localData.gallery.map((img: any, idx: number) => (
                                    <div key={idx} className="bg-white border p-2 rounded relative group">
                                        <img src={img.src} className="w-full h-32 object-cover rounded mb-2" />
                                        <textarea 
                                            value={img.caption} 
                                            onChange={e => handleInputChange(e as any, 'gallery', null, idx, 'caption')}
                                            className="w-full text-xs p-1 border rounded"
                                            rows={2}
                                        />
                                        <button 
                                            onClick={() => setLocalData((p: any) => ({...p, gallery: p.gallery.filter((_: any, i: number) => i !== idx)}))}
                                            className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100"
                                        >
                                            <IconTrash />
                                        </button>
                                    </div>
                                ))}
                                <label className="border-2 border-dashed rounded flex flex-col items-center justify-center h-48 cursor-pointer hover:bg-gray-50">
                                    <IconPlus />
                                    <span className="text-xs mt-2">Add Image</span>
                                    <input type="file" className="hidden" onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            const reader = new FileReader();
                                            reader.onload = (re) => {
                                                setLocalData((p: any) => ({...p, gallery: [...p.gallery, { src: re.target?.result, caption: '' }]}));
                                            };
                                            reader.readAsDataURL(file);
                                        }
                                    }} />
                                </label>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;