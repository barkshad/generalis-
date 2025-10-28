import React, { useState } from 'react';

// A simple icon component for the UI
const IconTrash: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
);

const AdminDashboard = ({ siteData, onUpdate, onClose, onLogout }) => {
  const [activeTab, setActiveTab] = useState('general');
  const [formData, setFormData] = useState(siteData);
  const [newImageUrl, setNewImageUrl] = useState('');

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

    return (
        <div className="space-y-8">
            {Object.keys(formData.menu).map(sectionKey => (
                 <div key={sectionKey}>
                    <h3 className="text-xl font-heading mb-3 capitalize border-b pb-2">{sectionKey.replace('fullMenu', 'Full Menu')}</h3>
                    {formData.menu[sectionKey].map((category, catIndex) => (
                        <div key={catIndex} className="p-4 border rounded-md mb-4 bg-gray-50/50">
                            <div className="flex justify-between items-center mb-3">
                                <input type="text" name="title" value={category.title} onChange={e => handleMenuChange(e, sectionKey, catIndex, null)} className="font-semibold text-lg border-b-2 border-transparent focus:border-primary outline-none bg-transparent flex-grow w-full"/>
                                <button onClick={() => deleteCategory(sectionKey, catIndex)} title="Delete Category" className="p-2 text-red-500 hover:bg-red-100 rounded-full shrink-0"><IconTrash /></button>
                            </div>
                            <div className="space-y-2">
                                {category.items.map((item, itemIndex) => (
                                    <div key={itemIndex} className="flex items-center gap-2">
                                        <input type="text" name="name" value={item.name} onChange={e => handleMenuChange(e, sectionKey, catIndex, itemIndex)} className="flex-grow rounded-md border-gray-300 shadow-sm sm:text-sm focus:ring-primary focus:border-primary"/>
                                        <input type="text" name="price" value={item.price} onChange={e => handleMenuChange(e, sectionKey, catIndex, itemIndex)} className="w-32 rounded-md border-gray-300 shadow-sm sm:text-sm focus:ring-primary focus:border-primary"/>
                                        <button onClick={() => deleteMenuItem(sectionKey, catIndex, itemIndex)} title="Delete Item" className="p-2 text-red-600 hover:bg-red-100 rounded-full shrink-0"><IconTrash /></button>
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
    const addImage = () => {
        if (newImageUrl.trim() === '') return;
        const newGallery = [...formData.gallery, newImageUrl];
        setFormData(prev => ({...prev, gallery: newGallery}));
        setNewImageUrl('');
    };

    const deleteImage = (index) => {
        const newGallery = formData.gallery.filter((_, i) => i !== index);
        setFormData(prev => ({...prev, gallery: newGallery}));
    };

    return (
        <div className="space-y-6">
            <h3 className="text-lg font-heading mb-2">Manage Gallery</h3>
            <div className="flex gap-2">
                <input type="text" value={newImageUrl} onChange={e => setNewImageUrl(e.target.value)} placeholder="https://... Paste new image URL" className="flex-grow rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm" />
                <button onClick={addImage} className="px-4 py-2 bg-primary text-white font-semibold rounded-md hover:bg-primary/90">Add</button>
            </div>
            <div className="grid grid-cols-4 gap-4 mt-4">
                {formData.gallery.map((src, index) => (
                    <div key={index} className="relative group">
                        <img src={src} className="w-full h-24 object-cover rounded-md" alt={`Gallery item ${index+1}`} />
                        <button onClick={() => deleteImage(index)} className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                            <IconTrash />
                        </button>
                    </div>
                ))}
            </div>
            <button onClick={handleSave} className="mt-4 px-4 py-2 bg-primary text-white font-semibold rounded-md hover:bg-primary/90">Save Gallery Changes</button>
        </div>
    )
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
              <button onClick={() => setActiveTab('menu')} className={`p-2 rounded text-left ${activeTab === 'menu' ? 'bg-primary/20 text-primary' : 'hover:bg-gray-200'}`}>Menu</button>
              <button onClick={() => setActiveTab('gallery')} className={`p-2 rounded text-left ${activeTab === 'gallery' ? 'bg-primary/20 text-primary' : 'hover:bg-gray-200'}`}>Gallery</button>
            </nav>
          </div>
          <div className="w-3/4 p-6 overflow-y-auto">
            {activeTab === 'general' && renderGeneralTab()}
            {activeTab === 'menu' && renderMenuTab()}
            {activeTab === 'gallery' && renderGalleryTab()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;